import React from 'react';
import { ProgDetails } from '../../types/sharedTypes';
import DangerouslySetHtmlContent from '../DangerouslySetHtmlContent';
import MetaInfo from '../MetaInfo';

interface DetailsProps {
  programDetails: ProgDetails;
  isOpen?: boolean;
}

const Details = ({ programDetails, isOpen }: DetailsProps) => {
  const { img, title, prog_sort, descr_short } = programDetails;
  return (
    <div className={`asset-details${isOpen ? ' open' : ''}`}>
      {img && (
        <div className="asset-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt={title} loading="lazy" />
        </div>
      )}
      <div className="synopsis">
        {prog_sort && (
          <strong className="prefix-description">{prog_sort}</strong>
        )}
        {descr_short ? <DangerouslySetHtmlContent html={descr_short} /> : <br />}
        <MetaInfo programDetails={programDetails} />
      </div>
    </div>
  );
};

Details.defaultProps = {
  isOpen: false,
};

export default Details;
