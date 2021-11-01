import React from 'react';
import { ProgDetails } from '../../types/sharedTypes';
import Card from './Card';

interface ChannelProps {
  channelPrograms: Array<ProgDetails>;
}

const Channel = ({ channelPrograms }: ChannelProps) => {
  return (
    <>
      {channelPrograms.map((programDetails, index) => (
        <Card key={index} programDetails={programDetails} />
      ))}
    </>
  );
};

export default Channel;
