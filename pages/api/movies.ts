import type { NextApiRequest, NextApiResponse } from 'next';
import { CHANNELS, GENRE_ID, PROGRAMS_URI } from '../../config';
import { Data, Days, Error, Prog, ProgDetails } from '../../types/sharedTypes';
import { getDetails } from './details';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Array<ProgDetails>> | Error>,
) {
  if (req.method === 'GET') {
    const day = String(req.query?.day);

    if (day === 'today' || day === 'tomorrow') {
      const aggregatedData = await getAggregatedData(Days[day]);

      res.status(200).json(aggregatedData);
    } else {
      res.status(400).json({ ok: false, error: 'Missing Or Bad Parameter' });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }
}

export async function getAggregatedData(day: Days) {
  const movies = await getMovies(day);
  let aggregatedData: Array<Array<ProgDetails>> = [[]];

  if (Array.isArray(movies)) {
    aggregatedData = await Promise.all(
      movies.map(async movieChannel => {
        return await Promise.all(
          movieChannel.map(async (movie: Prog) => {
            const details = await getDetails(movie.db_id);
            details.descr_short = movie.descr;
            return Object.assign({}, movie, details);
          }),
        );
      }),
    );

    aggregatedData.sort((a, z) => {
      return (
        parseInt(a[0].ch_id, 10) - parseInt(z[0].ch_id, 10) ||
        parseInt(a[0].s, 10) - parseInt(z[0].s, 10)
      );
    });
  }

  return aggregatedData;
}

export async function getMovies(day = Days.today) {
  const uri = PROGRAMS_URI;

  try {
    const response = await fetch(`${uri}/?day=${day}`);
    const json = await response.json();
    const movies = filterChannels(json?.data || []);

    return movies;
  } catch (error) {
    return { ok: false, error: 'Unable to fetch data' };
  }
}

function filterChannels(channels: Array<Data>) {
  const channelData = channels.filter(channel =>
    CHANNELS.includes(parseInt(channel.ch_id, 10)),
  );
  return filterMovies(channelData);
}

function filterMovies(channelData: Array<Data>) {
  return channelData
    .map(channel =>
      channel.prog.filter(prog => parseInt(prog.g_id, 10) === GENRE_ID),
    )
    .filter(item => item.length);
}
