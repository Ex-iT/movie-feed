import React from 'react';
import Cards from '../../components/Cards';
import { EnrichedProg } from '../../types/sharedTypes';

interface HomePageProps {
  programsToday: Array<EnrichedProg>;
  programsTomorrow: Array<EnrichedProg>;
}

const HomePage = ({ programsToday, programsTomorrow }: HomePageProps) => {
  return (
    <>
      <section className="today">
        <h1>Films vandaag op televisie</h1>
        <Cards programData={programsToday} />
      </section>
      <section className="tomorrow">
        <h1>Films morgen op televisie</h1>
        <Cards programData={programsTomorrow} />
      </section>
    </>
  );
};

export default HomePage;
