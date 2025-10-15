// src/components/AdventureCard.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { adventuresDB } from '@/data/adventures';
import { mastersDB } from '@/data/masters';
import { AdventureCardBadge } from './AdventureCardBadge';

interface AdventureCardProps {
  adventureId: string;
  masterId: string;
  dateTime: string;
  price: string;
  location: string;
  startLevel: string;
  playerCount: string;
  duration: string;
  telegramLobbyUrl: string;
  lobbyButtonText?: string;
  badge?: {
    text: string;
    gradientColors?: { from: string; to: string };
  };
  highlight?: {
    title: string;
    text: string;
  };
  oldPrice?: string;
  isDisabled?: boolean;
}

export const AdventureCard = ({
  adventureId,
  masterId,
  dateTime,
  price,
  location,
  startLevel,
  playerCount,
  duration,
  telegramLobbyUrl,
  lobbyButtonText,
  badge,
  highlight,
  oldPrice,
  isDisabled = false,
}: AdventureCardProps) => {

  const adventureData = adventuresDB[adventureId];
  const masterData = mastersDB[masterId];

  if (!adventureData || !masterData) {
    if (!adventureData) console.warn(`Adventure with ID "${adventureId}" not found.`);
    if (!masterData) console.warn(`Master with ID "${masterId}" not found.`);
    return null;
  }

  const queryParams = new URLSearchParams({
    master: masterId,
    dateTime: dateTime,
    price: price,
    location: location,
    startLevel: startLevel,
    playerCount: playerCount,
    duration: duration,
    telegramLobbyUrl: telegramLobbyUrl,
  });

  if (lobbyButtonText) {
    queryParams.append('lobbyButtonText', lobbyButtonText);
  }
  if (highlight) {
    queryParams.append('highlightTitle', highlight.title);
    queryParams.append('highlightText', highlight.text);
  }
  if (oldPrice) {
    queryParams.append('oldPrice', oldPrice);
  }

  // Внутренний компонент с общим содержимым, чтобы не дублировать код
  const CardContent = () => (
    <>
      {/* ================================================================== */}
      {/* 1. SVG-ОВЕРЛЕЙ ТЕПЕРЬ ОТДЕЛЬНЫЙ ЭЛЕМЕНТ                         */}
      {/* ================================================================== */}
      {isDisabled && (
        <div className="absolute top-0 left-0 right-0 z-20 aspect-[210/297] pointer-events-none">
          <Image
            src="/svgs/full-party.svg"
            alt="Места на эту игру закончились"
            fill
            className="object-cover rounded-[0.2rem]"
          />
        </div>
      )}

      {/* ================================================================== */}
      {/* 2. КОНТЕЙНЕР ДЛЯ ВСЕГО ВИЗУАЛЬНОГО КОНТЕНТА КАРТОЧКИ            */}
      {/* ================================================================== */}
      <div className={clsx(
        "relative", // Добавляем relative сюда для позиционирования бейджа
        isDisabled && "opacity-30 pointer-events-none cursor-not-allowed"
      )}>
        {/* Бейдж */}
        {badge && (
          <div className="absolute top-[0.8rem] left-[0.8rem] z-10">
            <AdventureCardBadge text={badge.text} gradientColors={badge.gradientColors} />
          </div>
        )}

        {/* Иллюстрация */}
        <div className="relative w-full aspect-[210/297] rounded-[0.2rem] overflow-hidden mb-[1.2rem]">
          <Image src={adventureData.imageUrl} alt={adventureData.title} fill className="object-cover" />
        </div>

        {/* Текстовый контент */}
        <div>
          <h3 className="text-heading-3 text-white mb-[0.4rem]">
            {adventureData.title}
          </h3>
          
          <div className="flex items-center mb-[0.8rem]">
            <span className="text-label text-white">{dateTime}</span>
            <div className="w-[0.4rem] h-[0.4rem] bg-white rounded-full mx-2"></div>
            <div className="flex items-center">
              <Image
                src={masterData.avatarUrl}
                alt={masterData.name}
                width={16}
                height={16}
                className="rounded-full mr-1.5"
              />
              <span className="text-label text-white">{masterData.name}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-x-[0.4rem]">
            <div className="inline-block border-[0.1rem] border-white rounded-[0.8rem] px-3 py-1">
              <p className="text-label-italics text-white">{price}</p>
            </div>
            {oldPrice && (
              <p className="text-label-italics text-white/60 line-through py-1">
                {oldPrice}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );

  // Используем явный if/else для рендеринга нужной обертки
  if (isDisabled) {
    return (
      <div className="relative w-full group">
        <CardContent />
      </div>
    );
  } else {
    return (
      <Link
        href={`/?view=${adventureId}&${queryParams.toString()}`}
        scroll={false}
        className="relative w-full group transition-all duration-300 ease-in-out hover:z-10 hover:scale-105 hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.96)]"
      >
        <CardContent />
      </Link>
    );
  }
};