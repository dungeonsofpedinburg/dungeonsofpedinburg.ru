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
    description: `В королевском колледже магии произошло немыслимое: величайший артефакт, Голем Талантов, вышел из-под контроля. Изначально созданный для хранения и передачи знаний, он начал поглощать магические способности студентов и преподавателей, оставляя их опустошенными.

Королевская гвардия бессильна против магии такого уровня. Вам, отряду отважных искателей приключений, предстоит проникнуть в запечатанные залы колледжа, найти способ усмирить разбушевавшегося конструкта и вернуть украденные таланты, пока не стало слишком поздно.`,
  },
  'barbara-is-waiting': {
    title: 'Барбара ждет',
    imageUrl: '/images/common/adventure-covers/barbara-is-waiting-cover.jpg',
    coverImageUrl: '/images/common/adventure-mini-covers/barbara-is-waiting-mini-cover.jpg',
    description: `Легенды гласят, что в глубине заброшенных подземелий под руинами замка Алого Барона сокрыты несметные сокровища. Однако те же легенды умалчивают о том, что барон заключил сделку с темными силами, и его дух до сих пор охраняет свои богатства.

Сможете ли вы пройти через хитроумные ловушки, одолеть призрачную стражу и заполучить сокровища, или же ваши души навсегда останутся в проклятых залах этого мрачного места?`,
  },
};