import React from 'react';
import Image from 'next/image';
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
          <span>
            <Image
              src={img}
              alt={title}
              width={615}
              height={400}
              unoptimized={true}
            />
          </span>
        </div>
      )}
      <div className="synopsis">
        {prog_sort && (
          <strong className="prefix-description">{prog_sort}</strong>
        )}
        {descr_short ? (
          <DangerouslySetHtmlContent html={descr_short} />
        ) : (
          <br />
        )}
        <MetaInfo programDetails={programDetails} />
      </div>
    </div>
  );
};

Details.defaultProps = {
  isOpen: false,
};

export default Details;
