import React from 'react';
import clsx from 'clsx';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    // Этот div делает ВСЁ, что нам нужно.
    // mx-auto -> центрирует блок на странице
    // w-full -> занимает 100% ширины, пока не достигнет max-width
    // max-w-[120rem] -> задает максимальную ширину контентной области
    // px-[2rem] -> задает боковые отступы
    <div className={clsx(
      'mx-auto w-full max-w-[120rem] px-[2rem]',
      className
    )}>
      {children}
    </div>
  );
};