import type { NextApiRequest, NextApiResponse } from 'next';
import { CHANNEL_INFO, CHANNEL_LOGO_SRC, DEEP_LINK, EMPTY_IMG, PROGRAM_URI } from '../../config';
import { Error, ProgDetails } from '../../types/sharedTypes';
import slugify from 'slugify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProgDetails | Error>,
) {
  if (req.method === 'GET') {
    const id = req.query?.id;

    if (id) {
      const response = await getDetails(String(id));
      res.status(200).json(response);
    } else {
      res.status(400).json({ ok: false, error: 'Missing Or Bad Parameter' });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }
}

export async function getDetails(id: string) {
  const uri = PROGRAM_URI;
  try {
    const response = await fetch(`${uri}/${id}`);
    const json = await response.json();
    const progDetails = json?.data || {};

    if ('title' in progDetails && 's' in progDetails && 'e' in progDetails) {
      const { title, db_id, ch_id, s, e } = progDetails;
      progDetails.channel_logo = getChannelLogo(ch_id);
      progDetails.channel_label = getChannelLabel(ch_id);
      progDetails.deep_link = getDeepLinkUrl(title, db_id);
      progDetails.start = formatTime(s);
      progDetails.end = formatTime(e);
      progDetails.day = formatDate(s);
    }

    return progDetails;
  } catch (error) {
    return { ok: false, error: 'Unable to fetch data' };
  }
}

function getChannelLogo(id: string) {
  return id ? CHANNEL_LOGO_SRC.replace(/%s/g, id) : EMPTY_IMG;
}

function getChannelLabel(id: string) {
  return CHANNEL_INFO[id];
}

function getDeepLinkUrl(title: string, id: string) {
  const slug = slugify(title, { lower: true, strict: true, locale: 'nl' });
  return `${DEEP_LINK}/${slug}/${id}`;
}

function formatTime(timestamp: number) {
  console.log(timestamp);
  return new Date(timestamp * 1000).toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString('nl-NL', {
    weekday: 'long'
  });
}
