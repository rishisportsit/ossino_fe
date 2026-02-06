import { SwiperSlide } from 'swiper/react';
import Slider from 'components/shared/Slider';
import PlayerPropCard from 'components/shared/PlayerPropsSection/PlayerPropCard/index';
import type { PlayerPropCardProps } from './types';
import 'swiper/css';
import 'swiper/css/pagination';

type PlayerPropsSectionProps = {
  label: string;
  showMore?: boolean;
  to?: string;
  showMoreComponent?: 'link' | 'button';
  withCount?: boolean;
  withShadow?: boolean;
  sportShadow?: boolean;
  tooltipText?: string;
};

const PlayerPropsSection = ({
  label,
  showMore,
  to,
  showMoreComponent,
  withCount,
  withShadow,
  sportShadow,
  tooltipText,
  
}: PlayerPropsSectionProps) => {
  const playerProps: PlayerPropCardProps[] = [
    {
      id: 1,
      homeTeam: {
        name: 'Milan FC',
        logo: '/images/sports/hotMultis/MilanFC.png',
      },
      awayTeam: {
        name: 'Inter FC',
        logo: '/images/sports/hotMultis/InterFC.png',
      },
      matchTime: 'Today, 19:30',
      peopleBet: 835,
      player: {
        name: 'Mainoo',
        avatar: '/images/sports/playerProps/player1.png',
      },
      betType: {
        type: 'Over',
        value: 1.81,
        playerName: 'Mainoo',
        stat: 'Hits',
      },
      odds: 2.81,
    },
    {
      id: 2,
      homeTeam: {
        name: 'Milan FC',
        logo: '/images/sports/hotMultis/MilanFC.png',
      },
      awayTeam: {
        name: 'Inter FC',
        logo: '/images/sports/hotMultis/InterFC.png',
      },
      matchTime: 'Today, 19:30',
      peopleBet: 835,
      player: {
        name: 'Fernandes',
        avatar: '/images/sports/playerProps/player2.png',
      },
      betType: {
        type: 'Under',
        value: 2.12,
        playerName: 'Fernandes',
        stat: 'Hits',
      },
      odds: 1.12,
    },
    {
      id: 3,
      homeTeam: {
        name: 'Inter FC',
        logo: '/images/sports/hotMultis/InterFC.png',
      },
      awayTeam: {
        name: 'Napoli FC',
        logo: '/images/sports/hotMultis/NapoliFC.png',
      },
      matchTime: 'Today, 21:00',
      peopleBet: 642,
      player: {
        name: 'Mainoo',
        avatar: '/images/sports/playerProps/player1.png',
      },
      betType: {
        type: 'Over',
        value: 1.81,
        playerName: 'Mainoo',
        stat: 'Hits',
      },
      odds: 2.81,
    },
    {
      id: 4,
      homeTeam: {
        name: 'Roma FC',
        logo: '/images/sports/hotMultis/RomaFC.png',
      },
      awayTeam: {
        name: 'Torino FC',
        logo: '/images/sports/hotMultis/TorinoFC.png',
      },
      matchTime: 'Tomorrow, 15:00',
      peopleBet: 423,
      player: {
        name: 'Fernandes',
        avatar: '/images/sports/playerProps/player2.png',
      },
      betType: {
        type: 'Under',
        value: 2.12,
        playerName: 'Fernandes',
        stat: 'Hits',
      },
      odds: 1.12,
    },
    {
      id: 5,
      homeTeam: {
        name: 'Bologna FC',
        logo: '/images/sports/hotMultis/BolognaFC.png',
      },
      awayTeam: {
        name: 'Udinese FC',
        logo: '/images/sports/hotMultis/UdineseFC.png',
      },
      matchTime: 'Tomorrow, 18:00',
      peopleBet: 312,
      player: {
        name: 'Mainoo',
        avatar: '/images/sports/playerProps/player1.png',
      },
      betType: {
        type: 'Over',
        value: 2.5,
        playerName: 'Mainoo',
        stat: 'Goals',
      },
      odds: 3.25,
    },
    {
      id: 6,
      homeTeam: {
        name: 'Genoa FC',
        logo: '/images/sports/hotMultis/GenoaFC.png',
      },
      awayTeam: {
        name: 'Como FC',
        logo: '/images/sports/hotMultis/ComoFC.png',
      },
      matchTime: 'Tomorrow, 20:30',
      peopleBet: 198,
      player: {
        name: 'Fernandes',
        avatar: '/images/sports/playerProps/player2.png',
      },
      betType: {
        type: 'Under',
        value: 1.5,
        playerName: 'Fernandes',
        stat: 'Assists',
      },
      odds: 1.85,
    },
    {
      id: 7,
      homeTeam: {
        name: 'Salernitana FC',
        logo: '/images/sports/hotMultis/SalernitanaFC.png',
      },
      awayTeam: {
        name: 'Torino FC',
        logo: '/images/sports/hotMultis/TorinoFC.png',
      },
      matchTime: 'Sunday, 15:00',
      peopleBet: 567,
      player: {
        name: 'Mainoo',
        avatar: '/images/sports/playerProps/player1.png',
      },
      betType: {
        type: 'Over',
        value: 3.0,
        playerName: 'Mainoo',
        stat: 'Shots',
      },
      odds: 2.1,
    },
    {
      id: 8,
      homeTeam: {
        name: 'Monza FC',
        logo: '/images/sports/hotMultis/MonzaFC.png',
      },
      awayTeam: {
        name: 'Napoli FC',
        logo: '/images/sports/hotMultis/NapoliFC.png',
      },
      matchTime: 'Sunday, 17:30',
      peopleBet: 423,
      player: {
        name: 'Fernandes',
        avatar: '/images/sports/playerProps/player2.png',
      },
      betType: {
        type: 'Under',
        value: 0.5,
        playerName: 'Fernandes',
        stat: 'Cards',
      },
      odds: 1.45,
    },
  ];

  return (
    <Slider
      label={label}
      count={withCount ? playerProps.length : undefined}
      navigation
      withShadow={withShadow}
      sportShadow={sportShadow}
      spaceBetween={12}
      loop
      showMore={showMore}
      to={to}
      showMoreComponent={showMoreComponent}
      tooltipText={tooltipText}
      headerClassName="pr-0 lg:pr-4"
    >
      {playerProps.map((playerProp) => (
        <SwiperSlide key={playerProp.id} className="!w-auto">
          <PlayerPropCard {...playerProp} />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default PlayerPropsSection;
