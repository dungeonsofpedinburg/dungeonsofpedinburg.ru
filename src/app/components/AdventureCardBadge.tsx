// src/app/components/AdventureCardBadge.tsx
import React from 'react';

interface AdventureCardBadgeProps {
  text: string;
  gradientColors?: {
    from: string;
    to: string;
  };
}

export const AdventureCardBadge = ({
  text,
  gradientColors = { from: '#FF6901', to: '#FF3401' },
}: AdventureCardBadgeProps) => {
  return (
    <div
      className="inline-block rounded-[0.6rem] px-[0.7rem] pt-[0.4rem] pb-[0.3rem]"
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to})`,
      }}
    >
      {/* Используем класс для текста метки, он отлично подходит */}
      <span className="text-label text-white">{text}</span>
    </div>
  );
};