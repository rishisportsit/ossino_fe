import LeagueDetails from './LeagueDetails';

type Data = {
  id: number;
  league: string;
  country: string;
};

const data: Data[] = [
  {
    id: 1,
    league: 'France Ligue 1',
    country: 'France',
  },
  {
    id: 2,
    league: 'Australia A-League',
    country: 'Australia',
  },
  {
    id: 3,
    league: 'Australia A-League Women',
    country: 'Australia',
  },
  {
    id: 4,
    league: 'Italy Serie A',
    country: 'Italy',
  },
  {
    id: 5,
    league: 'Germany Bundesliga 1',
    country: 'Germany',
  },
];

const TopLeaguesTabContent = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 bg-base-775 rounded-xl p-4">
      {data.map((item) => {
        return <LeagueDetails key={item.id} {...item} />;
      })}
    </div>
  );
};

export default TopLeaguesTabContent;
