import React, { useEffect, useState } from 'react';
import DefaultLayout from '../Layout/DefaultLayout';
import fetchData from '../lib/fetchData';
import HomePage from '../pageComponents/HomePage';

const Home = () => {
  const [programsToday, setProgramsToday] = useState([]);
  const [programsTomorrow, setProgramsTomorrow] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const programsToday = await fetchData('/api/movies?day=today');
      const programsTomorrow = await fetchData('/api/movies?day=tomorrow');
      setProgramsToday(programsToday);
      setProgramsTomorrow(programsTomorrow);
    };
    fetchPrograms();
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

export default Home;
