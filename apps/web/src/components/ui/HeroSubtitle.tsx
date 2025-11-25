'use client';

import Typewriter from 'typewriter-effect';

interface HeroSubtitleProps {
  typewriterStrings: string;
}

export const HeroSubtitle = ({ typewriterStrings }: HeroSubtitleProps) => {
  const strings = typewriterStrings ? typewriterStrings.split(',') : [];

  return (
    <Typewriter
      options={{
        strings: strings,
        autoStart: true,
        loop: true,
        delay: 50,
        deleteSpeed: 50,
      }}
    />
  );
};
