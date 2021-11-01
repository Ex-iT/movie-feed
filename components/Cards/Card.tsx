import React, { useEffect, useState } from 'react';
import { ProgDetails } from '../../types/sharedTypes';
import ChannelLogo from '../ChannelLogo';
import Details from '../Details';
import Sharer from '../Sharer';

interface CardProps {
  programDetails: ProgDetails;
}

const Card = ({ programDetails }: CardProps) => {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState(programDetails);
  const { e, db_id, title, channel_logo, channel_label, start, end, is_passed } =
    data;


  const onClick = (id: string) => {
    setIsOpen(Object.assign({}, isOpen, { [id]: !isOpen[id] }));
  };

  useEffect(() => {
    const hasWindow = typeof window !== 'undefined';
    let rAF: any = null;

    if (hasWindow) {
      const checkIsPassed = () => {
        if (!is_passed && +new Date() > parseInt(e, 10) * 1000) {
          setData(Object.assign({}, data, { is_passed: true }));
        }
        window.cancelAnimationFrame(rAF);

        setTimeout(() => {
          rAF = window.requestAnimationFrame(checkIsPassed);
        }, 3e3);
      };
      checkIsPassed();
    }

    return () => {
      if (hasWindow && rAF) {
        window.cancelAnimationFrame(rAF);
      }
    };
  }, [is_passed, e, data]);

  return (
    <li
      key={db_id}
      className={`card${is_passed ? ' passed' : ''}`}
      onClick={onClick.bind(this, db_id)}
    >
      <ChannelLogo src={channel_logo} alt={channel_label} />
      <div className="info">
        <div className="details">
          <h3>{title}</h3>
          {start} - {end}
        </div>
        <Details programDetails={programDetails} isOpen={isOpen[db_id]} />
        <Sharer programDetails={programDetails} />
      </div>
    </li>
  );
};

export default Card;
