export interface Master {
  name: string;
  avatarUrl: string;
  description: string;
}

export const mastersDB: Record<string, Master> = {
  'ivan-komarik': {
    name: 'Иван Комарик',
    avatarUrl: '/images/icons/masters/ivan-komarik.png',
    description: 'Опытный мастер, предпочитающий классические фэнтези-миры. Проводит игры уже более 5 лет.',
  },
  'alexey-kakaulin': {
    name: 'Леша Какаулин',
    avatarUrl: '/images/icons/masters/alexey-kakaulin.png',
    description: 'Специализируется на детективных и хоррор-историях. Ее игры полны интриг и неожиданных поворотов.',
  },
  'maksim-novikov': {
    name: 'Максим Новиков',
    avatarUrl: '/images/icons/masters/maxim-novikov.png',
    description: 'Любитель научно-фантастических сеттингов и сложных правил. Идеальный выбор для тех, кто любит тактику.',
  },
  'oleg-ostanin': {
    name: 'Олег Останин',
    avatarUrl: '/images/icons/masters/oleg-ostanin.jpg',
    description: 'Любитель научно-фантастических сеттингов и сложных правил. Идеальный выбор для тех, кто любит тактику.',
  },
  'dmitry-mordvinov': {
    name: 'Дмитрий Мордвинов',
    avatarUrl: '/images/icons/masters/alexey-kakaulin.png',
    description: 'Любитель научно-фантастических сеттингов и сложных правил. Идеальный выбор для тех, кто любит тактику.',
  },
};