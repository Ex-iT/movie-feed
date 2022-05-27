import { MouseEvent } from 'react';

import ucFirst from '../../lib/ucFirst';
import { EnrichedProg } from '../../types/sharedTypes';

interface SharerProps {
  programDetails: EnrichedProg;
}

const Sharer = ({ programDetails }: SharerProps) => {
  const canShare =
    typeof window !== 'undefined' ? !!window.navigator?.share : false;

  const shareItem = (
    programDetails: EnrichedProg,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const { deep_link, title, channel_label, start, end, day } = programDetails;
    event.stopPropagation();

    navigator.share({
      title: `${title} ${day} op ${channel_label} om ${start}`,
      text: `${title}\n${ucFirst(day)} ${channel_label}, ${start} - ${end}\n`,
      url: deep_link,
    });
  };

  return canShare ? (
    <button
      className="button-share"
      type="button"
      onClick={shareItem.bind(this, programDetails)}
    >
      <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
        <path d="M72 56c-4.813 0-9.12 2.137-12.054 5.501L39.643 51.35c.23-1.081.357-2.201.357-3.35s-.127-2.269-.357-3.349l20.303-10.152C62.879 37.864 67.187 40 72 40c8.836 0 16-7.164 16-16S80.836 8 72 8s-16 7.164-16 16c0 1.149.127 2.269.357 3.349L36.054 37.501C33.121 34.136 28.814 32 24 32c-8.836 0-16 7.164-16 16s7.164 16 16 16c4.814 0 9.12-2.137 12.054-5.501l20.304 10.152C56.127 69.731 56 70.851 56 72c0 8.836 7.164 16 16 16s16-7.164 16-16-7.164-16-16-16zm0-40a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM24 56a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm48 24a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
      </svg>
      <span className="a11y-only">Delen</span>
    </button>
  ) : null;
};

export default Sharer;
