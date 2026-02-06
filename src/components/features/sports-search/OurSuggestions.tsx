import MatchCard from '../sports/TopMatchesSection/MatchCard';

const matches = [
  {
    league: {
      name: 'Serie A',
      flag: '/images/sports/topMatchesSection/italy.png',
      logo: '/images/sports/topMatchesSection/LigaProfesional.png',
    },
    homeTeam: {
      name: 'Genoa',
      logo: '/images/sports/topMatchesSection/Genoa.png',
    },
    awayTeam: {
      name: 'Inter',
      logo: '/images/sports/topMatchesSection/Inter.png',
    },
    matchTime: '19:30',
    matchDate: 'August 17',
    odds: {
      home: 4.71,
      draw: 3.75,
      away: 1.81,
    },
    selectedOdds: ['home', 'away'] as const,
  },
  {
    league: {
      name: 'Serie A',
      flag: '/images/sports/topMatchesSection/italy.png',
      logo: '/images/sports/topMatchesSection/LigaProfesional.png',
    },
    homeTeam: {
      name: 'Bologna',
      logo: '/images/sports/topMatchesSection/Bologna.png',
    },
    awayTeam: {
      name: 'Udinese',
      logo: '/images/sports/topMatchesSection/Udinese.png',
    },
    matchTime: '19:30',
    matchDate: 'August 18',
    odds: {
      home: 4.71,
      draw: 3.75,
      away: 1.81,
    },
  },
  {
    league: {
      name: 'Serie A',
      flag: '/images/sports/topMatchesSection/italy.png',
      logo: '/images/sports/topMatchesSection/LigaProfesional.png',
    },
    homeTeam: {
      name: 'Juventus',
      logo: '/images/sports/topMatchesSection/Juventus.png',
    },
    awayTeam: {
      name: 'Como',
      logo: '/images/sports/topMatchesSection/Como.png',
    },
    matchTime: '21:45',
    matchDate: 'August 19',
    odds: {
      home: 4.71,
      draw: 3.75,
      away: 1.81,
    },
  },
  {
    league: {
      name: 'Serie A',
      flag: '/images/sports/topMatchesSection/italy.png',
      logo: '/images/sports/topMatchesSection/LigaProfesional.png',
    },
    homeTeam: {
      name: 'Genoa',
      logo: '/images/sports/topMatchesSection/Genoa.png',
    },
    awayTeam: {
      name: 'Inter',
      logo: '/images/sports/topMatchesSection/Inter.png',
    },
    matchTime: '19:30',
    matchDate: 'August 17',
    odds: {
      home: 4.71,
      draw: 3.75,
      away: 1.81,
    },
  },
  {
    league: {
      name: 'Serie A',
      flag: '/images/sports/topMatchesSection/italy.png',
      logo: '/images/sports/topMatchesSection/LigaProfesional.png',
    },
    homeTeam: {
      name: 'Bologna',
      logo: '/images/sports/topMatchesSection/Bologna.png',
    },
    awayTeam: {
      name: 'Udinese',
      logo: '/images/sports/topMatchesSection/Udinese.png',
    },
    matchTime: '19:30',
    matchDate: 'August 18',
    odds: {
      home: 4.71,
      draw: 3.75,
      away: 1.81,
    },
  },
  {
    league: {
      name: 'Serie A',
      flag: '/images/sports/topMatchesSection/italy.png',
      logo: '/images/sports/topMatchesSection/LigaProfesional.png',
    },
    homeTeam: {
      name: 'Juventus',
      logo: '/images/sports/topMatchesSection/Juventus.png',
    },
    awayTeam: {
      name: 'Como',
      logo: '/images/sports/topMatchesSection/Como.png',
    },
    matchTime: '21:45',
    matchDate: 'August 19',
    odds: {
      home: 4.71,
      draw: 3.75,
      away: 1.81,
    },
  },
];

const OurSuggestions = () => {
  return (
    <div className="px-4">
      <p className="font-bold text-base mb-3">Our suggestions</p>
      <div className="flex flex-col gap-3">
        {matches.map((match, index) => (
          <MatchCard {...match} key={index} className="w-full" />
        ))}
      </div>
    </div>
  );
};

export default OurSuggestions;
