import React, { useEffect, useState } from 'react';
import DefaultLayout from '../Layout/DefaultLayout';
import fetchData from '../lib/fetchData';
import HomePage from '../pageComponents/HomePage';

const Home = () => {
  const [programsToday, setProgramsToday] = useState([]);
  const [programsTomorrow, setProgramsTomorrow] = useState([]);

  useEffect(() => {
    const fetchProgramsToday = async () => {
      setProgramsToday(await fetchData('/api/movies?day=today'));
    };

    const fetchProgramsTomorrow = async () => {
      setProgramsTomorrow(await fetchData('/api/movies?day=tomorrow'));
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

export default Home;
