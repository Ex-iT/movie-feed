import React from 'react';
import Image from 'next/image';
import { EnrichedProg, MovieDetails } from '../../types/sharedTypes';

interface MetaInfoProps {
  programDetails: EnrichedProg;
  movieDetails: MovieDetails;
}

const MetaInfo = ({ programDetails, movieDetails }: MetaInfoProps) => {
  const { tvg_rating } = programDetails;
  const {
    generic,
    metadata: { items, guidance },
  } = movieDetails;

  return (
    <div className="meta-info">
      {tvg_rating ? (
        <p>
          <strong>Waardering:</strong> {tvg_rating}
        </p>
      ) : tvg_rating !== null && (
        <p className="loading"></p>
      )}
      {generic.year ? (
        <p>
          <strong>Jaar:</strong> {generic.year}
        </p>
      ) : (
        <p className="loading"></p>
      )}
      {items?.map(({ label, value }, index) => (
        <p key={index}>
          <strong>{label}:</strong> {value}
        </p>
      ))}
      {guidance?.length ? (
        <div className="guidance">
          <strong>Kijkwijzer:</strong>
          <ul>
            {guidance.map(({ name, icon }, index) => (
              <li key={index}>
                <span>
                  <Image
                    src={icon}
                    alt={name}
                    title={name}
                    width={20}
                    height={20}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MetaInfo;
