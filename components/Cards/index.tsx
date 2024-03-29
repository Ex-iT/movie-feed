import { EnrichedProg } from '../../types/sharedTypes';

import Card from './Card';

interface CardsProps {
  programData: Array<EnrichedProg>;
}

const Cards = ({ programData }: CardsProps) => {
  const skeleton = (
    <>
      <li className="card loading"></li>
      <li className="card loading"></li>
      <li className="card loading"></li>
    </>
  );

  return (
    <ol>
      {programData.length
        ? programData.map(programs => (
            <Card
              key={`${programs.ps}-${programs.main_id}`}
              programDetails={programs}
            />
          ))
        : skeleton}
    </ol>
  );
};

export default Cards;
