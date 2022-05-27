import Image from 'next/image';
import { useEffect, useState } from 'react';

import { EMPTY_IMG } from '../../config';
import fetchData from '../../lib/fetchData';
import { EnrichedProg, MovieDetails } from '../../types/sharedTypes';
import MetaInfo from '../MetaInfo';

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
      <div className="asset-image">
        <span>
          <Image
            src={movieDetails.generic?.image || EMPTY_IMG}
            alt={title}
            width={615}
            height={400}
            unoptimized={true}
          />
        </span>
      </div>
      <div className="synopsis">
        {subgenre && <strong className="prefix-description">{subgenre}</strong>}
        {descr ? <p>{descr}</p> : <br />}
        <MetaInfo programDetails={programDetails} movieDetails={movieDetails} />
      </div>
    </div>
  );
};

Details.defaultProps = {
  isOpen: false,
};

export default Details;
