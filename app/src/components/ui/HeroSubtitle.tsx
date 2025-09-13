'use client';

import Typewriter from 'typewriter-effect';

const HeroSubtitle = () => {
  return (
    <Typewriter
      options={{
        strings: [
          'Data Scientist',
          'Data Analyst',
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
