import type { NextApiRequest, NextApiResponse } from 'next';
import {
  CHANNELS,
  CHANNEL_INFO,
  CHANNEL_LOGO_SRC,
  EMPTY_IMG,
  GENRE_ID,
  PROGRAMS_URI,
} from '../../../config';
import fetchData from '../../../lib/fetchData';
import formatTime from '../../../lib/formatTime';
import getEpoch from '../../../lib/getEpoch';
import getProgress from '../../../lib/getProgress';
import {
  Prog,
  Data,
  Days,
  Error,
  EnrichedProg,
} from '../../../types/sharedTypes';

type Movies = Array<Array<Prog>>;
type EnrichedProgs = Array<Array<EnrichedProg>>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnrichedProgs | Error>,
) {
  if (req.method === 'GET') {
    const day = String(req.query?.day);

    if (day === 'today' || day === 'tomorrow') {
      const movies = await getMovies(Days[day]);

      res.status(200).json(movies);
    } else {
      res.status(400).json({ ok: false, error: 'Missing Or Bad Parameter' });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }
}

export async function getMovies(day = Days.today) {
  const uri = PROGRAMS_URI;

  try {
    const json = await fetchData(`${uri}/?day=${day}`);
    return filterChannels(json?.data || []);
  } catch (error) {
    return { ok: false, error: 'Unable to fetch data' };
  }
}

const filterChannels = (channels: Array<Data>) => {
  const channelData = channels.filter(channel => {
    return CHANNELS.includes(parseInt(channel.ch_id, 10));
  });

  const filteredData = filterGenre(channelData);
  return enrichData(filteredData);
};

const filterGenre = (channelData: Array<Data>) => {
  return channelData
    .map(channel =>
      channel.prog.filter(prog => {
        prog.ch_id = channel.ch_id;
        return parseInt(prog.g_id, 10) === GENRE_ID;
      }),
    )
    .filter(item => item.length);
};

const enrichData = (filteredData: Movies) => {
  return filteredData.map(channels => {
    return channels.map(movie => {
      const { ch_id, s, e } = movie;
      const start = parseInt(s, 10);
      const end = parseInt(e, 10);
      const now = getEpoch();

      return {
        ...movie,
        channel_logo: getChannelLogo(ch_id),
        channel_label: getChannelLabel(ch_id),
        start: formatTime(start),
        end: formatTime(end),
        is_passed: now > end,
        progress: getProgress(now, start, end),
      };
    });
  });
};

const getChannelLogo = (id: string) => {
  return id ? CHANNEL_LOGO_SRC.replace(/%s/g, id) : EMPTY_IMG;
};

const getChannelLabel = (id: string) => {
  return CHANNEL_INFO[id] || '';
};
