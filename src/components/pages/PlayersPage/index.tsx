import { useMemo, useState } from 'react';
import { SwiperSlide } from 'swiper/react';

import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { cn } from 'helpers/ui';
import CategoryContent from 'components/features/players/CategoryContent';
import PlayersBanner from 'components/features/players/PlayersBanner';
import Search from 'components/features/players/Search';
import BetslipSection from 'components/features/sports/BetslipSection';
import MobileBetslip from 'components/features/sports/BetslipSection/MobileBetslip';
import PageHeader from 'components/shared/PageHeader';
import Slider from 'components/shared/Slider';

type Category = {
  id: string;
  label: string;
};

type Bet = {
  id: number;
  league: string;
  time: string;
  teams: { id: number; href: string }[];
  player: string;
  value: number;
};

type Data = {
  id: number;
  type: string;
  name: string;
  bets: Bet[];
};

const categories: Category[] = [
  {
    id: 'all_markets',
    label: 'All Markets',
  },
  {
    id: 'anytime_goalscorer',
    label: 'Anytime Goalscorer',
  },
  {
    id: 'first_goalscorer',
    label: 'First Goalscorer',
  },
  {
    id: 'last_goalscorer',
    label: 'Last Goalscorer',
  },
  {
    id: 'player_assists',
    label: 'Player Assists',
  },
];

const data: Data[] = [
  {
    id: 1,
    name: 'Anytime Goalscorer',
    type: 'anytime_goalscorer',
    bets: [
      {
        id: 1,
        league: 'UEFA Champions League',
        time: '19:30',
        teams: [
          { id: 1, href: '/images/sports/hotMultis/InterFC.png' },
          { id: 2, href: '/images/sports/hotMultis/MilanFC.png' },
        ],
        player: 'Bruno Fernandes',
        value: 4.7,
      },
      {
        id: 2,
        league: 'UEFA Champions League',
        time: '20:30',
        teams: [
          { id: 1, href: '/images/sports/hotMultis/InterFC.png' },
          { id: 2, href: '/images/sports/hotMultis/MilanFC.png' },
        ],
        player: 'Bruno Fernandes',
        value: 4.7,
      },
      {
        id: 3,
        league: 'UEFA Champions League',
        time: '21:30',
        teams: [
          { id: 1, href: '/images/sports/hotMultis/InterFC.png' },
          { id: 2, href: '/images/sports/hotMultis/MilanFC.png' },
        ],
        player: 'Bruno Fernandes',
        value: 4.7,
      },
      {
        id: 4,
        league: 'UEFA Champions League',
        time: '22:30',
        teams: [
          { id: 1, href: '/images/sports/hotMultis/InterFC.png' },
          { id: 2, href: '/images/sports/hotMultis/MilanFC.png' },
        ],
        player: 'Bruno Fernandes',
        value: 4.7,
      },
    ],
  },
  {
    id: 2,
    name: 'First Goalscorer',
    type: 'first_goalscorer',
    bets: [
      {
        id: 1,
        league: 'UEFA Champions League',
        time: '19:30',
        teams: [
          { id: 1, href: '/images/sports/hotMultis/InterFC.png' },
          { id: 2, href: '/images/sports/hotMultis/MilanFC.png' },
        ],
        player: 'Bruno Fernandes',
        value: 4.7,
      },
      {
        id: 2,
        league: 'UEFA Champions League',
        time: '20:30',
        teams: [
          { id: 1, href: '/images/sports/hotMultis/InterFC.png' },
          { id: 2, href: '/images/sports/hotMultis/MilanFC.png' },
        ],
        player: 'Bruno Fernandes',
        value: 4.7,
      },
      {
        id: 3,
        league: 'UEFA Champions League',
        time: '21:30',
        teams: [
          { id: 1, href: '/images/sports/hotMultis/InterFC.png' },
          { id: 2, href: '/images/sports/hotMultis/MilanFC.png' },
        ],
        player: 'Bruno Fernandes',
        value: 4.7,
      },
    ],
  },
  {
    id: 3,
    name: 'Last Goalscorer',
    type: 'last_goalscorer',
    bets: [
      {
        id: 1,
        league: 'UEFA Champions League',
        time: '19:30',
        teams: [
          { id: 1, href: '/images/sports/hotMultis/InterFC.png' },
          { id: 2, href: '/images/sports/hotMultis/MilanFC.png' },
        ],
        player: 'Bruno Fernandes',
        value: 4.7,
      },
      {
        id: 2,
        league: 'UEFA Champions League',
        time: '20:30',
        teams: [
          { id: 1, href: '/images/sports/hotMultis/InterFC.png' },
          { id: 2, href: '/images/sports/hotMultis/MilanFC.png' },
        ],
        player: 'Bruno Fernandes',
        value: 4.7,
      },
      {
        id: 3,
        league: 'UEFA Champions League',
        time: '21:30',
        teams: [
          { id: 1, href: '/images/sports/hotMultis/InterFC.png' },
          { id: 2, href: '/images/sports/hotMultis/MilanFC.png' },
        ],
        player: 'Bruno Fernandes',
        value: 4.7,
      },
    ],
  },
  {
    id: 4,
    name: 'Player Assists',
    type: 'player_assists',
    bets: [
      {
        id: 1,
        league: 'UEFA Champions League',
        time: '19:30',
        teams: [
          { id: 1, href: '/images/sports/hotMultis/InterFC.png' },
          { id: 2, href: '/images/sports/hotMultis/MilanFC.png' },
        ],
        player: 'Bruno Fernandes',
        value: 4.7,
      },
      {
        id: 2,
        league: 'UEFA Champions League',
        time: '20:30',
        teams: [
          { id: 1, href: '/images/sports/hotMultis/InterFC.png' },
          { id: 2, href: '/images/sports/hotMultis/MilanFC.png' },
        ],
        player: 'Bruno Fernandes',
        value: 4.7,
      },
      {
        id: 3,
        league: 'UEFA Champions League',
        time: '21:30',
        teams: [
          { id: 1, href: '/images/sports/hotMultis/InterFC.png' },
          { id: 2, href: '/images/sports/hotMultis/MilanFC.png' },
        ],
        player: 'Bruno Fernandes',
        value: 4.7,
      },
    ],
  },
];

const PlayersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id,
  );
  const { screenWidth } = useBreakpoint();
  const isDesktop = screenWidth >= BREAKPOINTS.xl;

  const filteredData = useMemo(() => {
    return selectedCategory === 'all_markets'
      ? data
      : data.filter(({ type }) => type === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="pt-[76px] pb-4 md:pt-0 xl:px-5">
      <PageHeader className="px-4 xl:px-0" />
      <div className="px-4 xl:px-0">
        <PlayersBanner />
      </div>
      <div className="xl:p-5 xl:bg-base-800 xl:rounded-xl xl:flex">
        <div className="xl:flex-1">
          <Search />
          <Slider
            spaceBetween={8}
            className="pl-4 relative z-10 mb-4 xl:order-1 xl:pl-0 xl:mb-5"
          >
            {categories.map(({ label, id }) => {
              return (
                <SwiperSlide key={id} className="!w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(id)}
                    className={cn(
                      'bg-base-750 px-3 h-10 text-primary-2 text-xs rounded-xl',
                      id === selectedCategory
                        ? 'border border-primary-2 text-primary-2 font-medium'
                        : 'body-txtColor-1',
                    )}
                  >
                    {label}
                  </button>
                </SwiperSlide>
              );
            })}
          </Slider>
          <div className="flex flex-col gap-6 px-4 xl:order-3 xl:px-0">
            {filteredData.map((item) => {
              return (
                <CategoryContent
                  key={item.id}
                  withTitle={selectedCategory === 'all_markets'}
                  {...item}
                />
              );
            })}
          </div>
        </div>
        <div className="hidden lg:block w-px bg-borderdefault min-h-full mx-5" />
         <div className="w-full lg:w-[290px] lg:flex-shrink-0 flex flex-col gap-6">
            {isDesktop ? <BetslipSection /> : null}
         </div>
        
      </div>
      <MobileBetslip />
    </div>
  );
};

export default PlayersPage;
