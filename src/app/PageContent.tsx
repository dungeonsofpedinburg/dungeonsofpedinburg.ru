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
    adventureId: "mysterious-abduction",
    masterId: "ivan-komarik",
    dateTime: "18:00, 10 марта",
    price: "1000₽",
    location: "Melomel",
    startLevel: "1 уровень",
    playerCount: "От 4 до 6 игроков",
    duration: "От 3 до 5 часов",
    telegramLobbyUrl: "https://t.me/dnd_melomel",
    lobbyButtonText: "Зайти в лобби",
    isDisabled: false,
  },
  {
    adventureId: "delusional-robbery",
    masterId: "alexey-kakaulin",
    dateTime: "18:00, 10 марта",
    price: "1000₽",
    location: "Drink&RE",
    startLevel: "1 уровень",
    playerCount: "От 4 до 6 игроков",
    duration: "От 3 до 5 часов",
    telegramLobbyUrl: "https://t.me/drink_re_dnd",
    lobbyButtonText: "Зайти в лобби",
    isDisabled: false,
  }
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