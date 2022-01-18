import React from 'react';
import { EnrichedProg } from '../../types/sharedTypes';
import Card from './Card';

interface CardsProps {
  programData: Array<EnrichedProg>;
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
      {programData.length
        ? programData.map((programs, index) => (
            <Card
              key={`${index}-${programs.main_id}`}
              programDetails={programs}
            />
          ))
        : skeleton}
    </ol>
  );
};

export default Cards;
