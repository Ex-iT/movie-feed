import React from 'react';
import { ProgDetails } from '../../types/sharedTypes';
import Channel from './Channel';

interface CardsProps {
  programData: Array<Array<ProgDetails>>;
}

const Cards = ({ programData }: CardsProps) => {
  return (
    <ol>
      {programData.map((channelPrograms, index) => (
        <Channel key={index} channelPrograms={channelPrograms} />
      ))}
    </ol>
  );
};

export default Cards;
