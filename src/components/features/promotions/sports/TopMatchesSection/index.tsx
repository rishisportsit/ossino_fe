import { SwiperSlide } from 'swiper/react';
import Slider from 'components/shared/Slider';
import MatchCard from 'components/features/promotions/sports/MatchCard';
import { useBreakpoint } from 'helpers/hooks';
import 'swiper/css';
import 'swiper/css/pagination';

const TopMatchesSection = () => {
  const { screenWidth } = useBreakpoint();

  const getSliderSettings = () => {
    if (screenWidth >= 1024) {
      return { slidesPerView: 3, spaceBetween: 20 };
    }
    if (screenWidth >= 768) {
      return { slidesPerView: 2, spaceBetween: 16 };
    }
    return { slidesPerView: 1.2, spaceBetween: 12 };
  };

  const settings = getSliderSettings();

  // Mock data for matches
  const matches = [
    {
      league: {
        name: "Serie A",
        flag: "/icons/italy-flag.svg",
        logo: "/icons/serie-a-logo.svg"
      },
      homeTeam: {
        name: "Genoa",
        logo: "/icons/genoa-logo.svg"
      },
      awayTeam: {
        name: "Inter",
        logo: "/icons/inter-logo.svg"
      },
      matchTime: "19:30",
      matchDate: "August 17",
      odds: {
        home: 4.70,
        draw: 3.75,
        away: 1.81
      }
    },
    {
      league: {
        name: "Serie A",
        flag: "/icons/italy-flag.svg",
        logo: "/icons/serie-a-logo.svg"
      },
      homeTeam: {
        name: "Bologna",
        logo: "/icons/bologna-logo.svg"
      },
      awayTeam: {
        name: "Udinese",
        logo: "/icons/udinese-logo.svg"
      },
      matchTime: "19:30",
      matchDate: "August 18",
      odds: {
        home: 4.70,
        draw: 3.75,
        away: 1.81
      }
    },
    {
      league: {
        name: "Serie A",
        flag: "/icons/italy-flag.svg",
        logo: "/icons/serie-a-logo.svg"
      },
      homeTeam: {
        name: "Juventus",
        logo: "/icons/juventus-logo.svg"
      },
      awayTeam: {
        name: "Como",
        logo: "/icons/como-logo.svg"
      },
      matchTime: "21:45",
      matchDate: "August 19",
      odds: {
        home: 4.70,
        draw: 3.75,
        away: 1.81
      },
      selectedOdds: 'home' as const
    }
  ];

  return (
    <div className="mt-8">
      <Slider
        label="Top Matches"
        count={matches.length}
        navigation
        slidesPerView={settings.slidesPerView}
        spaceBetween={settings.spaceBetween}
        loop={false}
      >
        {matches.map((match, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <MatchCard {...match} />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
};

export default TopMatchesSection;
