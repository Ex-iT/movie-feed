import type { NextApiRequest, NextApiResponse } from 'next';
import {
  CHANNEL_INFO,
  CHANNEL_LOGO_SRC,
  DEEP_LINK,
  EMPTY_IMG,
  PROGRAM_URI,
} from '../../config';
import { Error, ProgDetails } from '../../types/sharedTypes';
import slugify from 'slugify';
import formatTime from '../../lib/formatTime';
import formatDate from '../../lib/formatDate';
import fetchData from '../../lib/fetchData';
import getProgress from '../../lib/getProgress';

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
    const json = await fetchData(`${uri}/${id}`);
    const progDetails = json?.data || {};

    if ('title' in progDetails && 's' in progDetails && 'e' in progDetails) {
      const { title, db_id, ch_id, s, e } = progDetails;
      const start = parseInt(s, 10);
      const end = parseInt(e, 10);
      const now = Math.round(new Date().getTime() / 1000);

      progDetails.channel_logo = getChannelLogo(ch_id);
      progDetails.channel_label = getChannelLabel(ch_id);
      progDetails.deep_link = getDeepLinkUrl(title, db_id);
      progDetails.start = formatTime(start);
      progDetails.end = formatTime(end);
      progDetails.day = formatDate(start);
      progDetails.is_passed = now > end;
      progDetails.progress = getProgress(now, start, end);
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
  return CHANNEL_INFO[id] || '';
}

function getDeepLinkUrl(title: string, id: string) {
  const slug = slugify(title, { lower: true, strict: true, locale: 'nl' });
  return `${DEEP_LINK}/${slug}/${id}`;
}
