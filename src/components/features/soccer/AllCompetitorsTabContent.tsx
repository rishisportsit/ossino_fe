import LeagueDetails from './LeagueDetails';

type Data = {
  id: number;
  name: string;
  competitions: {
    id: number;
    league: string;
    country: string;
  }[];
};

const data: Data[] = [
  {
    id: 1,
    name: 'Popular Competitions',
    competitions: [
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
    ],
  },
  {
    id: 2,
    name: 'All Competitions',
    competitions: [
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
    ],
  },
];

const AllCompetitorsTabContent = () => {
  return (
    <div className="flex flex-col gap-3">
      {data.map(({ id, name, competitions }) => {
        return (
          <div key={id}>
            <div className="pl-3 mb-3">
              <p>{name}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 bg-base-775 rounded-xl p-4">
              {competitions.map((data) => {
                return <LeagueDetails key={data.id} {...data} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllCompetitorsTabContent;
