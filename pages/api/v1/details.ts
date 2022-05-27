import { NextApiRequest, NextApiResponse } from 'next';

import { CACHING_DEFAULT, DETAIL_URI } from '../../../config';
import fetchData from '../../../lib/fetchData';
import { Error, MovieDetails } from '../../../types/sharedTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieDetails | Error>,
) {
  if (req.method === 'GET') {
    const id = req.query?.id;

    if (id) {
      const response = await getDetails(String(id));
      res.status(200).setHeader('Cache-Control', CACHING_DEFAULT).json(response);
    } else {
      res.status(400).json({ ok: false, error: 'Missing Or Bad Parameter' });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }
}

async function getDetails(id: string) {
  try {
    const json = await fetchData(`${DETAIL_URI}/${id}`);

    if (json.data) {
      const details = json.data;
      delete details.linear;
      delete details.linearMore;
      delete details.streaming;
      delete details.streamingMore;
      delete details.tags;
      delete details.seasons;
      delete details.viewMore;
      delete details.news;

      return details;
    }

    return { ok: false, error: `Unable to fetch details for ${id}.` };
  } catch (error) {
    return { ok: false, error: `Unable to fetch details for ${id}.` };
  }
}
