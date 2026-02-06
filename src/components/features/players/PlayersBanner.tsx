import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';

import Slider from 'components/shared/Slider';
import { Button } from 'components/shared/ui/Button';
import { cn } from 'helpers/ui';

type Player = {
  id: number;
  href: string;
};

const players: Player[] = [
  {
    id: 1,
    href: '/images/sports/playerProps/player2.png',
  },
  {
    id: 2,
    href: '/images/sports/playerProps/player1.png',
  },
  {
    id: 3,
    href: '/images/sports/playerProps/player2.png',
  },
  {
    id: 4,
    href: '/images/sports/playerProps/player1.png',
  },
  {
    id: 5,
    href: '/images/sports/playerProps/player2.png',
  },
  {
    id: 6,
    href: '/images/sports/playerProps/player1.png',
  },
];

const PlayersBanner = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>(players[0]);
  return (
    <>
      <p className="text-base font-bold mb-3">Top Player Props</p>
      <div className="gradient-player-prop rounded-xl relative overflow-hidden pt-4 pb-2 xl:py-8 mb-8">
        <img
          src={selectedPlayer.href}
          alt=""
          className="size-56 xl:size-[420px] absolute z-0 -right-5 bottom-3 md:right-2 xl:-bottom-2 xl:right-[72px]"
        />
        <div className="gradient-fade-bottom h-24 w-full absolute bottom-0 z-10" />
        <div className="flex justify-between items-center mb-8 px-4 md:px-8 relative z-20 xl:mb-6">
          <div className="background-1 px-2 h-5 rounded-full flex items-center">
            <span className="text-base-900 text-10px font-medium">
              835 People Bet
            </span>
          </div>
          <div className="bg-background-1/20 px-2 h-5 rounded-full flex items-center">
            <span className="body-txtColor-1 text-10px">
              Today,&nbsp;<span className="font-medium">19:30</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col w-fit mb-16 px-4 md:px-8 relative z-20 xl:mb-[74px]">
          <p className="font-bold xl:font-black text-xl xl:text-4xl uppercase mb-2 xl:mb-1">
            Fernandes
          </p>
          <span className="font-medium text-xs xl:text-base mb-2 xl:mb-8">
            Over 1.81 - Hits
          </span>
          <Button className="w-fit btn-textColor">Bet Now</Button>
        </div>
        <Slider spaceBetween={8} className="pl-4 relative z-20 md:pl-8">
          {players.map((player) => {
            return (
              <SwiperSlide
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className={cn(
                  '!size-auto bg-background-1/20 rounded-xl overflow-hidden cursor-pointer backdrop-blur-2xl',
                  {
                    'border border-primary-1': player.id === selectedPlayer.id,
                  },
                )}
              >
                <img src={player.href} alt="" className="size-16 xl:size-20" />
              </SwiperSlide>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default PlayersBanner;
