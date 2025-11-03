// src/app/PageContent.tsx
'use client'; // <-- ВАЖНО: Помечаем этот компонент как клиентский
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { adventuresDB } from '@/data/adventures';
import { mastersDB } from '@/data/masters';

import { Container } from './components/Container';
import { AdventureCard } from './components/AdventureCard';
import { Modal } from './components/Modal';
import { AdventureModal } from './components/AdventureModal';

const cardsData = [
  {
    adventureId: "barbara-is-waiting",
    masterId: "alexey-kakaulin",
    dateTime: "БЕЗ ДАТЫ",
    price: "690₽",
    location: "Barbara Bus",
    startLevel: "1 уровень",
    playerCount: "От 4 до 6",
    duration: "От 4 до 5 часов",
    telegramLobbyUrl: "https://t.me/Barbara_Zhdet_dnd_story",
    lobbyButtonText: "Зайти в лобби",
    oldprice: "990₽",
    isDisabled: false,
  },
  {
    adventureId: "primary-broth",
    masterId: "ivan-komarik",
    dateTime: "БЕЗ ДАТЫ",
    price: "990₽",
    location: "—",
    startLevel: "1 уровень",
    playerCount: "От 4 до 6",
    duration: "От 3 до 5 часов",
    telegramLobbyUrl: "https://t.me/pediburgborshch",
    lobbyButtonText: "Зайти в лобби",
    isDisabled: false,
  },
  {
    adventureId: "talent-devouring-golem",
    masterId: "ivan-komarik",
    dateTime: "20:00, 11 ноября",
    price: "990₽",
    location: "Бар «Истерика»",
    startLevel: "1 уровень",
    playerCount: "От 4 до 6",
    duration: "От 3 до 5 часов",
    telegramLobbyUrl: "https://t.me/gptgolematia",
    lobbyButtonText: "Зайти в лобби",
    isDisabled: false,
  },
  {
    adventureId: "adventurers-ID",
    masterId: "oleg-ostanin",
    dateTime: "Без даты",
    price: "690₽",
    location: "Barbara Bus",
    startLevel: "1 уровень",
    playerCount: "От 4 до 5",
    duration: "От 3 до 5 часов",
    telegramLobbyUrl: "https://t.me/udostovirenie",
    lobbyButtonText: "Зайти в лобби",
    isDisabled: true,
  },
];

export default function PageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const adventureId = searchParams.get('view');
  const masterId = searchParams.get('master');
  const dateTime = searchParams.get('dateTime');
  const price = searchParams.get('price');
  const location = searchParams.get('location');
  const startLevel = searchParams.get('startLevel');
  const playerCount = searchParams.get('playerCount');
  const duration = searchParams.get('duration');
  const oldPrice = searchParams.get('oldPrice');
  const telegramLobbyUrl = searchParams.get('telegramLobbyUrl');
  const lobbyButtonText = searchParams.get('lobbyButtonText');
  const highlightTitle = searchParams.get('highlightTitle');
  const highlightText = searchParams.get('highlightText');

  useEffect(() => {
    if (adventureId) {
      const selectedCard = cardsData.find(card => card.adventureId === adventureId);
      if (selectedCard && selectedCard.isDisabled) {
        // Next.js автоматически обработает этот роут и покажет страницу not-found.tsx
        router.push('/not-found'); 
      }
    }
  }, [adventureId, router]);

  const selectedAdventure = adventureId ? adventuresDB[adventureId] : null;
  const selectedMaster = masterId ? mastersDB[masterId] : null;

  const detailsGrid = [
    { label: 'Дата и время', value: dateTime },
    { label: 'Место проведения', value: location },
    { 
      label: 'Стоимость для игрока', 
      value: oldPrice ? (
        // Если есть старая цена, формируем JSX
        <>
          {price}
          <span className="ml-2 line-through text-white/60">
            {oldPrice}
          </span>
        </>
      ) : (
        // Иначе, просто передаем строку
        price
      )
    },
    { label: 'Уровень на старте', value: startLevel },
    { label: 'Количество игроков', value: playerCount },
    { label: 'Продолжительность', value: duration },
  ];

  return (
    <>
      <Container className="py-8">
        <div className="card-grid gap-x-[1.2rem] gap-y-[2.4rem] mt-[2rem]">
          {/* 5. Рендерим карточки из массива данных */}
          {cardsData.map((card) => (
            <AdventureCard key={card.adventureId} {...card} />
          ))}
        </div>
      </Container>

      {selectedAdventure && selectedMaster && telegramLobbyUrl && (
        <Modal>
          <AdventureModal
            adventure={selectedAdventure}
            master={selectedMaster}
            details={detailsGrid}
            lobbyUrl={telegramLobbyUrl}
            lobbyButtonText={lobbyButtonText || 'ЗАГЛЯНУТЬ В ЛОББИ'}
            highlightTitle={highlightTitle}
            highlightText={highlightText}
          />
        </Modal>
      )}
    </>
  );
}