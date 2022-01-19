import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { CACHING_DEFAULT } from '../config';
import DefaultLayout from '../Layout/DefaultLayout';
import HomePage from '../pageComponents/HomePage';
import { Days, EnrichedProg } from '../types/sharedTypes';
import { getMovies } from './api/v1/movies';

interface HomeProps {
  programsToday: Array<EnrichedProg>;
  programsTomorrow: Array<EnrichedProg>;
}

const Home = ({ programsToday, programsTomorrow }: HomeProps) => {
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
      programsToday: await getMovies(Days.today),
      programsTomorrow: await getMovies(Days.tomorrow)
    },
  };
};

export default Home;
