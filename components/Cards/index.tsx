import React, { useState } from 'react';
import { ProgDetails } from '../../types/sharedTypes';
import Card from './Card';

interface CardsProps {
  programData: Array<Array<ProgDetails>>;
}

const Cards = ({ programData }: CardsProps) => {
  return (
    <ol>
      {programData.map((programDetails, index) => (
        <Card key={index} programDetails={programDetails} />
      ))}
    </ol>
  );
};

export default Cards;
