// src/app/updates/[slug]/page.tsx

import Image from 'next/image';
import { Container } from 'src/app/components/Container';
import Link from 'next/link';

export default function UpdateDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="bg-black">
      {/* 
        1. ВНЕШНЯЯ ОБЕРТКА ("Контентный прямоугольник").
        Она отвечает за максимальную ширину, центрирование, фон и тень.
        Ее ширина будет 1200px (контент) + 4.8rem (паддинги) на десктопе.
      */}
      <div className="mx-auto max-w-[calc(120rem+4.8rem)] bg-black shadow-[-20px_0_40px_-15px_rgba(239,68,68,0.4),_20px_0_40px_-15px_rgba(239,68,68,0.4)]">
        
        {/* --- СЕКЦИЯ 1: ГЕРОЙ И ЛОГОТИП (ТЕПЕРЬ НА ВСЮ ШИРИНУ) --- */}
        <section className="relative">
          <div 
            className="relative w-full h-[70vh] overflow-hidden
                       /* Добавляем классы для создания градиентного оверлея */
                       after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0
                       after:h-1/2 after:bg-gradient-to-t after:from-black after:to-transparent"
          >
            <Image
              src="/images/common/adventure-heros/barbara-is-waiting-hero.jpg"
              alt="Фон приключения"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 w-[70vw] md:w-[50vw] lg:w-[35vw] xl:w-[25vw]">
            <Image
              src="/images/common/adventure-logos/barbara-is-waiting-logo.png"
              alt="Логотип приключения"
              width={1200}
              height={940}
              className="w-full h-auto"
            />
          </div>
        </section>

            <Container>
              <section className="py-8">
                <p className="mx-auto text-center text-body-large text-gray-300 mt-[1.2rem] w-full md:w-[80%] lg:w-[70%]">
                  Уважаемые пассажиры, двери закрываются. Займите свои места, пристегнитесь и выпейте чего-нибудь на дорожку. За окном туман, грозы, возможны осадки в виде разъяренных горных дварфов. Достаньте под сиденьем свое оружие и приготовьтесь кастовать заклинания, а иначе следующая остановка станет для вас последней.
                </p>
              </section>

              <section className="py-12">
                <div className="flex flex-col-reverse md:flex-row items-center gap-12">
                  <div className="w-full md:w-2/5">
                    <h1 className="text-heading-1 text-white mb-4">Команда профессионалов</h1>
                    <p className="text-body-large text-gray-300">
                       Восходящая звезда криминального мира, Барбара, собирает команду для самой дерзкой кражи в истории. Их цель — не золото, а уникальное чудо инженерной мысли, спрятанное в неприступной цитадели гномов-изобретателей. Героям предстоит разработать план проникновения, обойти препятствия и хитроумные ловушки, чтобы проникнуть в самое сердце крепости.
                    </p>
                  </div>
                  <div className="w-full md:w-3/5">
                    <Image
                      src="/images/common/barbara-is-waiting-npc-team.png"
                      alt="Иллюстрация к модулю 1"
                      width={800}
                      height={600}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </section>

              <section className="py-12">
                <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-12">
                  <div className="w-full md:w-2/5">
                    <h1 className="text-heading-1 text-white mb-4">Хмельное приключение</h1>
                    <p className="text-body-large text-gray-300">
                      Приготовься к круговороту событий, которые заберут тебя и твоих сопартийцев с головой в развернувшуюся драму этой истории. Ты познакомишься не только с командой Барбары, которая поможет тебе в достижении цели, но и с представителями крупной гильдии «Балтия» — лидера алкогольного производства, что успеют вставить палок в колеса.
                    </p>
                  </div>
                  <div className="w-full md:w-3/5">
                    <Image
                      src="/images/common/beer-tastes-like-beer.png"
                      alt="Иллюстрация к модулю 2"
                      width={800}
                      height={600}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </section>
            </Container>

            <section className="py-12">
              <div className="aspect-[16/9] relative w-full overflow-hidden">
                <Image
                  src="/images/common/barbara-bus.jpg"
                  alt="Иллюстрация к модулю 3"
                  fill
                  className="object-cover"
                />
              </div>

              <Container>
                <h1 className="text-heading-1 text-white mt-[3.2rem] mb-6">Приключение посвящено barbara bus</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[1.2rem] md:gap-8">
                  <p className="text-body-large text-gray-300">Бар с красным автобусом в центре Новосибирска за последний год стал для нас настоящим местом силы. В конце 2024 года мы познакомились с Максом — барменом этого заведения прямо во время его смены. Узнав, что мы играем в ролевки, он рассказал, что сам давно мечтает сыграть в Dungeons & Dragons со своими друзьями, коллегами и знакомыми. Оказалось, у него было много таких же знакомых, как и он сам, которые все хотели, но никак не могли попробовать настольно-ролевые игры. И тут понеслось.</p>
                  <p className="text-body-large text-gray-300">Мы начали с завидной регулярностью собираться на втором этаже Барбары за большим столом, окруженным диваном и разноцветными стульями. И все ради того, чтобы отхерачить гоблинов, спасти принцессу, разграбить караваны и в конце понять, что уже прошло 8 часов в реальном мире. Мы до сих пор продолжаем играть в Barbara Bus и говорим спасибо каждому члену его команды за то, что сделали это место незабываемым.</p>
                </div>
              </Container>
            </section>
            <Container className="p-8">
              <Link 
                href="/" 
                className="block text-center w-full bg-pink-600 text-white font-bold py-6 rounded-lg hover:bg-pink-700 transition-colors mb-[4.8rem]"
              >
                <h1 className="text-heading-1">Записаться на игру</h1>
              </Link>
            </Container>
      </div>
    </div>
  );
}