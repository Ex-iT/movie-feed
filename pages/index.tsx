import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { CACHING_DEFAULT } from '../config';
import DefaultLayout from '../Layout/DefaultLayout';
import fetchData from '../lib/fetchData';
import HomePage from '../pageComponents/HomePage';

interface HomeProps {
  placeHolder: [];
}

const Home = ({ placeHolder }: HomeProps) => {
  const [programsToday, setProgramsToday] = useState(placeHolder);
  const [programsTomorrow, setProgramsTomorrow] = useState(placeHolder);

  useEffect(() => {
    const fetchProgramsToday = async () => {
      setProgramsToday(await fetchData('/api/v1/movies?day=today'));
    };

    const fetchProgramsTomorrow = async () => {
      setProgramsTomorrow(await fetchData('/api/v1/movies?day=tomorrow'));
    };

    fetchProgramsToday();
    fetchProgramsTomorrow();
  }, []);

  return (
    <DefaultLayout>
      <HomePage
        programsToday={programsToday}
        programsTomorrow={programsTomorrow}
      />
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-Control', CACHING_DEFAULT);

  return {
    props: {
      placeHolder: []
    }
  }
}

export default Home;
