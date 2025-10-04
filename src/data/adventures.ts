export interface Adventure {
  title: string;
  imageUrl: string;
  coverImageUrl: string;
  description: string;
}

export const adventuresDB: Record<string, Adventure> = {
  'talent-devouring-golem': {
    title: 'Голем, пожирающий таланты',
    imageUrl: '/images/common/adventure-covers/talent-devouring-golem-cover.jpg',
    coverImageUrl: '/images/common/adventure-mini-covers/talent-devouring-golem-mini-cover.jpg',
    description: `«Ты кто такой у нас будешь? Инженер, художник, кузнец, а может, вообще мастер боевых искусств? Кем бы ты ни был — в нашем мире незаменимых нет, прими это. Если еще не понял, то советую обернуться — эта механическая тварь смотрит прямо на тебя.»

Приготовься сыграть в наше самое эпичное D&D-приключение в стенах грядущего ДНК-маркета. (https://t.me/dungeonsofpedinburg/144) Мы едем подарить тебе игру, которую ты не скоро забудешь. Привезем крутые карты, раздатки, миниатюрки и, конечно же, дохрена магических дайсов.`,
  },
  'barbara-is-waiting': {
    title: 'Барбара ждет',
    imageUrl: '/images/common/adventure-covers/barbara-is-waiting-cover.jpg',
    coverImageUrl: '/images/common/adventure-mini-covers/barbara-is-waiting-mini-cover.jpg',
    description: `Восходящая звезда криминального мира Типографства, Барбара, собирает команду для самой дерзкой кражи в истории. Их цель — не золото, а уникальное чудо инженерной мысли, спрятанное в неприступной цитадели гномов-изобретателей. Героям предстоит разработать план проникновения, обойти препятствия и хитроумные ловушки, чтобы проникнуть в самое сердце крепости. Смогут ли они провернуть это дело и уйти с добычей?`,
  },
};