import Head from 'next/head';
import React from 'react';
import Card from '../components/Card';
import { Days, ProgDetails } from '../types/sharedTypes';
import { getAggregatedData, getMovies } from './api/movies';

interface HomeProps {
  programsToday: Array<Array<ProgDetails>>;
  programsTomorrow: Array<Array<ProgDetails>>;
}

const Home = ({ programsToday, programsTomorrow }: HomeProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <title>
          Films vandaag op de Nederlandse Televisie | IsHetAlDonderdag.nl
        </title>
        <meta
          name="description"
          content="Overzicht van de films vandaag op TV"
        />
        <meta
          name="keywords"
          content="Films vandaag op TV, Vandaag op televisie, Films vandaag"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Moviefeed</title>
      </Head>
      <main>
        <section className="today">
          <Card
            title="Films vandaag op televisie"
            programData={programsToday}
          />
        </section>
        <section className="tomorrow">
          <Card
            title="Films morgen op televisie"
            programData={programsTomorrow}
          />
        </section>
      </main>
    </>
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
