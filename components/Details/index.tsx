import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { EnrichedProg, MovieDetails } from '../../types/sharedTypes';
import DangerouslySetHtmlContent from '../DangerouslySetHtmlContent';
import MetaInfo from '../MetaInfo';
import fetchData from '../../lib/fetchData';

interface DetailsProps {
  programDetails: EnrichedProg;
  isOpen?: boolean;
}

const Details = ({ programDetails, isOpen }: DetailsProps) => {
  const { title, subgenre, descr, main_id } = programDetails;
  const [movieDetails, setMovieDetails] = useState<MovieDetails>({
    generic: { id: 0, title: '' },
    metadata: { items: [], guidance: [] },
  });

  useEffect(() => {
    const fetchDetails = async () => {
      setMovieDetails(await fetchData(`/api/v1/details?id=${main_id}`));
    };

    if (isOpen) {
      fetchDetails();
    }
  }, [isOpen, main_id]);

  return (
    <div className={`asset-details${isOpen ? ' open' : ''}`}>
      {movieDetails.generic?.image && (
        <div className="asset-image">
          <span>
            <Image
              src={movieDetails.generic.image}
              alt={title}
              width={615}
              height={400}
              unoptimized={true}
            />
          </span>
        </div>
      )}
      <div className="synopsis">
        {subgenre ? (
          <strong className="prefix-description">{subgenre}</strong>
        ) : (
          <p className="loading"></p>
        )}
        {descr ? <DangerouslySetHtmlContent html={descr} /> : <br />}
        <MetaInfo programDetails={programDetails} movieDetails={movieDetails} />
      </div>
    </div>
  );
};

Details.defaultProps = {
  isOpen: false,
};

export default Details;
