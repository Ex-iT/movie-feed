import React, { useEffect, useState } from 'react';
import getEpoch from '../../lib/getEpoch';
import getProgress from '../../lib/getProgress';
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
  const tickTime = 1e3;
  const hasWindow = typeof window !== 'undefined';
  const {
    s,
    e,
    db_id,
    title,
    channel_logo,
    channel_label,
    start,
    end,
    is_passed,
    progress,
  } = data;

  const onClick = (id: string) => {
    setIsOpen(Object.assign({}, isOpen, { [id]: !isOpen[id] }));
  };

  useEffect(() => {
    let rAF: any = null;

    if (hasWindow) {
      const endTime = parseInt(e, 10);
      let now = getEpoch();

      const checkIsPassed = () => {
        if (!is_passed && now > endTime) {
          setData(data => Object.assign({}, data, { is_passed: true }));
        }
        window.cancelAnimationFrame(rAF);

        setTimeout(() => {
          now = getEpoch();
          rAF = window.requestAnimationFrame(checkIsPassed);
        }, tickTime);
      };

      checkIsPassed();
    }

    return () => {
      if (hasWindow && rAF) {
        window.cancelAnimationFrame(rAF);
      }
    };
  }, [hasWindow, is_passed, e]);

  useEffect(() => {
    let rAF: any = null;

    if (hasWindow) {
      const startTime = parseInt(s, 10);
      const endTime = parseInt(e, 10);
      let now = getEpoch();

      const updateProgress = () => {
        if (is_passed) {
          setData(data => Object.assign({}, data, { progress: 0 }));
          window.cancelAnimationFrame(rAF);
        } else {
          const progress = getProgress(now, startTime, endTime);
          if (progress > 0) {
            setData(data => Object.assign({}, data, { progress }));
          }
        }

        setTimeout(() => {
          now = getEpoch();
          rAF = window.requestAnimationFrame(updateProgress);
        }, tickTime);
      };

      updateProgress();
    }

    return () => {
      if (hasWindow && rAF) {
        window.cancelAnimationFrame(rAF);
      }
    };
  }, [hasWindow, is_passed, s, e]);

  return (
    <li
      key={db_id}
      className={`card${is_passed ? ' passed' : ''}${
        progress > 0 ? ' progress' : ''
      }`}
      onClick={onClick.bind(this, db_id)}
    >
      <ChannelLogo src={channel_logo} alt={channel_label} />
      <div className="info">
        <div className="details">
          <h2>{title}</h2>
          {start} - {end}
        </div>
        <Details programDetails={programDetails} isOpen={isOpen[db_id]} />
        <Sharer programDetails={programDetails} />
      </div>
      {progress > 0 && (
        <div className="progress-bar">
          <div style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </li>
  );
};

export default Card;
