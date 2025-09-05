import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  paddingX?: string;
};

const Container = ({ 
  children, 
  className, 
  maxWidth = 'max-w-screen-sm md:max-w-screen-lg lg:max-w-screen-xl', 
  paddingX = 'px-12 lg:px-14'
}: ContainerProps) => {
  return (
    <div
      className={`container mx-auto ${paddingX} ${maxWidth} ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default Container;
