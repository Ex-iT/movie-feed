import type { NextApiRequest, NextApiResponse } from 'next';
import slugify from '@sindresorhus/slugify';
import {
  CACHING_DEFAULT,
  CHANNELS,
  CHANNEL_LOGO_SRC,
  DEEP_LINK,
  EMPTY_IMG,
  MOVIES_URI,
} from '../../../config';
import fetchData from '../../../lib/fetchData';
import formatDate from '../../../lib/formatDate';
import formatTime from '../../../lib/formatTime';
import getEpoch from '../../../lib/getEpoch';
import getProgress from '../../../lib/getProgress';
import { Prog, Days, Error, EnrichedProg } from '../../../types/sharedTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<EnrichedProg> | Error>,
) {
  if (req.method === 'GET') {
    const day = String(req.query?.day);

    if (day === 'today' || day === 'tomorrow') {
      const movies = await getMovies(Days[day]);
      res.status(200).setHeader('Cache-Control', CACHING_DEFAULT).json(movies);
    } else {
      res.status(400).json({ ok: false, error: 'Missing Or Bad Parameter' });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }
}

export async function getMovies(day = Days.today) {
  try {
    const json = await fetchData(`${MOVIES_URI}/?day=${day}`);
    return filterChannels(json?.data || []);
  } catch (error) {
    return { ok: false, error: `Unable to fetch data. ${error}` };
  }
}

const filterChannels = (channels: Array<Prog>) => {
  const channelData = channels.filter(channel => {
    return Object.keys(CHANNELS).includes(channel.ch_id);
  });

  return enrichData(channelData);
};

const enrichData = (channelData: Array<Prog>) => {
  return channelData
    .map(movie => {
      const { ch_id, ps, pe } = movie;
      const now = getEpoch();
      const start = parseInt(ps, 10);
      let end = parseInt(pe, 10);

      // @TODO: end time on the next day (after 12 midnight)
      // is on the same day (date) as start time.
      // This is a crude fix for that until the API is fixed.
      if (start > end) {
        end = end + 24 * 3600; // Add 24 hours
      }

      return {
        ...movie,
        channel_logo: getChannelLogo(ch_id),
        channel_label: getChannelLabel(parseInt(ch_id, 10)),
        start: formatTime(start),
        end: formatTime(end),
        is_passed: now > end,
        progress: getProgress(now, start, end),
        deep_link: getDeepLinkUrl(movie.title),
        day: formatDate(start),
        // @TODO: Remove `pe`.
        // Overwriting the `pe` here to
        // return the 'fixed' end time
        pe: `${end}`,
      };
    })
    .sort((a, z) => parseInt(a.ch_id, 10) - parseInt(z.ch_id, 10));
};

const getChannelLogo = (id: string) => {
  return id ? CHANNEL_LOGO_SRC.replace(/%s/g, id) : EMPTY_IMG;
};

const getChannelLabel = (id: number) => {
  return CHANNELS[id] || '';
};

function getDeepLinkUrl(title: string) {
  return `${DEEP_LINK}/${slugify(title, {
    decamelize: false,
    customReplacements: [['&', '']],
  })}`;
}
