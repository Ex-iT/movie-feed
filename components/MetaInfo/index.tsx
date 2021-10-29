import React from 'react';
import { ProgDetails } from '../../types/sharedTypes';

interface MetaInfoProps {
  programDetails: ProgDetails;
}

const MetaInfo = ({ programDetails }: MetaInfoProps) => {
  const { rating, year, dir, act, scen, comp, country } = programDetails;

  return (
    <div className="meta-info">
      {rating && (
        <p>
          <strong>Waardering:</strong> {rating} / 5.0
        </p>
      )}
      {year && (
        <p>
          <strong>Jaar:</strong> {year}
        </p>
      )}
      {dir && (
        <p>
          <strong>Regiseur:</strong> {dir}
        </p>
      )}
      {act && (
        <p>
          <strong>Acteurs:</strong> {act}
        </p>
      )}
      {scen && (
        <p>
          <strong>Scenario:</strong> {scen}
        </p>
      )}
      {comp && (
        <p>
          <strong>Componist:</strong> {comp}
        </p>
      )}
      {country && (
        <p>
          <strong>Land:</strong> {country}
        </p>
      )}
    </div>
  );
};

export default MetaInfo;
