import React, { useState } from 'react';
import Image from 'next/image';
import { ProgDetails } from '../../types/sharedTypes';
import Details from '../Details';
import Sharer from '../Sharer';

interface CardProps {
  programDetails: Array<ProgDetails>;
}

const Card = ({ programDetails }: CardProps) => {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});

  const onClick = (id: string) => {
    setIsOpen(Object.assign({}, isOpen, { [id]: !isOpen[id] }));
  };

  return (
    <>
      {programDetails.map(progDetails => {
        const {
          db_id,
          title,
          channel_logo,
          channel_label,
          start,
          end,
          is_passed,
        } = progDetails;

        return (
          <li
            key={db_id}
            className={`card${is_passed ? ' passed' : ''}`}
            onClick={onClick.bind(this, db_id)}
          >
            <div className="logo">
              <Image
                src={channel_logo}
                alt={channel_label}
                width={40}
                height={40}
                layout="fixed"
                quality={100}
              />
            </div>
            <div className="info">
              <div className="details">
                <h3>{title}</h3>
                {start} - {end}
              </div>
              <Details programDetails={progDetails} isOpen={isOpen[db_id]} />
              <Sharer programDetails={progDetails} />
            </div>
          </li>
        );
      })}
    </>
  );
};

export default Card;
