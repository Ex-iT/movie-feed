import React from 'react';
import DefaultLayout from '../Layout/DefaultLayout';
import HomePage from '../pageComponents/HomePage';
import { Days, ProgDetails } from '../types/sharedTypes';
import { getAggregatedData } from './api/movies';

interface HomeProps {
  programsToday: Array<Array<ProgDetails>>;
  programsTomorrow: Array<Array<ProgDetails>>;
}

const Home = (props: HomeProps) => {
  return (
    <DefaultLayout>
      <HomePage {...props} />
    </DefaultLayout>
  );
};

export async function getServerSideProps() {
  const [programsToday, programsTomorrow] = await Promise.all([
    getAggregatedData(Days.today),
    getAggregatedData(Days.tomorrow),
  ]);

  return {
    props: {
      programsToday,
      programsTomorrow,
    },
  };
}

export default Home;
