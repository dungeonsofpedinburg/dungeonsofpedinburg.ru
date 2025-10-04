export interface Update {
  slug: string; // Уникальный идентификатор для URL, например /updates/zapusk-proekta
  imageUrl: string;
  title: string;
  date: string;
}

export const updatesDB: Update[] = [
  {
    slug: 'barbara-is-waiting-update',
    title: 'Барбара ждет',
    date: '4 октября, 2025',
    imageUrl: '/images/common/update-covers/barbara-is-waiting-update-cover.jpg',
  },
];