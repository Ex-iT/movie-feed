import React from 'react';
import { ProgDetails } from '../../types/sharedTypes';
import Channel from './Channel';

interface CardsProps {
  programData: Array<Array<ProgDetails>>;
}

const Cards = ({ programData }: CardsProps) => {
  const skeleton = (
    <>
      <li className="card loading"></li>
      <li className="card loading"></li>
      <li className="card loading"></li>
    </>
  );

  return (
    <ol>
      {!!programData.length
        ? programData.map((channelPrograms, index) => (
            <Channel key={index} channelPrograms={channelPrograms} />
          ))
        : skeleton}
    </ol>
  );
};

export default Cards;
