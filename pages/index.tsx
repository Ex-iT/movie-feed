import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

import DefaultLayout from '../Layout/DefaultLayout';
import { CACHING_DEFAULT } from '../config';
import fetchData from '../lib/fetchData';
import HomePage from '../pageComponents/HomePage';
import { EnrichedProg } from '../types/sharedTypes';

interface HomeProps {
  programsToday: Array<EnrichedProg>;
  programsTomorrow: Array<EnrichedProg>;
}

const Home = ({ programsToday, programsTomorrow }: HomeProps) => {
  const [today, setToday] = useState(programsToday);
  const [tomorrow, setTomorrow] = useState(programsTomorrow);

  useEffect(() => {
    const getToday = async () => {
      const json = await fetchData(`api/v1/movies?day=today`);
      if (json.length) {
        setToday(json);
      }
    };

    const getTomorrow = async () => {
      const json = await fetchData(`api/v1/movies?day=tomorrow`);
      if (json.length) {
        setTomorrow(json);
      }
    };

    getToday().catch(() => setToday([]));
    getTomorrow().catch(() => setTomorrow([]));
  }, []);

  return (
    <DefaultLayout>
      <HomePage programsToday={today} programsTomorrow={tomorrow} />
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-Control', CACHING_DEFAULT);

  return {
    props: {
      programsToday: [],
      programsTomorrow: [],
    },
  };
};

export default Home;
