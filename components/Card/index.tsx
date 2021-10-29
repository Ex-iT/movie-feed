import React, { useState } from 'react';
import { ProgDetails } from '../../types/sharedTypes';
import Details from '../Details';
import Sharer from '../Sharer';

interface CardPorps {
  title: string;
  programData: Array<Array<ProgDetails>>;
}

const Card = ({ title, programData }: CardPorps) => {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});

  const onClick = (id: string) => {
    const newState = Object.assign({}, isOpen, { [id]: !isOpen[id] });
    setIsOpen(newState);
  };

  const programCard = (channels: Array<ProgDetails>) =>
    channels.map(progDetails => {
      const { s, title, channel_logo, channel_label, start, end } = progDetails;
      return (
        <li key={s} className="program-card" onClick={onClick.bind(this, s)}>
          <div className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={channel_logo} alt={channel_label} loading="lazy" />
          </div>
          <div className="program-info">
            <div className="details">
              <h3>{title}</h3>
              {start} - {end}
            </div>
            <Details programDetails={progDetails} isOpen={isOpen[s]} />
            <Sharer programDetails={progDetails} />
          </div>
        </li>
      );
    });

  return (
    <>
      <h1>{title}</h1>
      <ol>{programData.map(channels => programCard(channels))}</ol>
    </>
  );
};

export default Card;
