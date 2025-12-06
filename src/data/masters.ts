export interface Master {
  name: string;
  avatarUrl: string;
  description: string;
}

export const mastersDB: Record<string, Master> = {
  'ivan-komarik': {
    name: 'Иван Комарик',
    avatarUrl: '/images/icons/masters/ivan-komarik.png',
    description: '—',
  },
  'alexey-kakaulin': {
    name: 'Леша Какаулин',
    avatarUrl: '/images/icons/masters/alexey-kakaulin.png',
    description: '—',
  },
  'maksim-novikov': {
    name: 'Максим Новиков',
    avatarUrl: '/images/icons/masters/maxim-novikov.png',
    description: '—',
  },
  'oleg-ostanin': {
    name: 'Олег Останин',
    avatarUrl: '/images/icons/masters/oleg-ostanin.jpg',
    description: '—',
  },
  'dmitry-mordvinov': {
    name: 'Дмитрий Мордвинов',
    avatarUrl: '/images/icons/masters/alexey-kakaulin.png',
    description: '—',
  },
  'roman-saltovsky': {
    name: 'Роман Салтовский',
    avatarUrl: '/images/icons/masters/roman-saltovsky.png',
    description: '—',
  },
};