import Image from 'next/image';

interface ChannelLogoProps {
  src: string;
  alt: string;
}

const ChannelLogo = ({ src, alt }: ChannelLogoProps) => {
  return (
    <div className="logo">
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        layout="fixed"
        quality={100}
      />
    </div>
  );
};

export default ChannelLogo;
