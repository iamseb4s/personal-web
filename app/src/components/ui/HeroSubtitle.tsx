'use client';

import Typewriter from 'typewriter-effect';

const HeroSubtitle = () => {
  return (
    <Typewriter
      options={{
        strings: [
          'Full-Stack Developer',
          'Software Engineer',
          'Lifelong Learner',
        ],
        autoStart: true,
        loop: true,
        delay: 50,
        deleteSpeed: 50,
      }}
    />
  );
};

export default HeroSubtitle;
