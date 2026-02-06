type LeagueDetailsProps = {
  league: string;
  country: string;
};

const LeagueDetails = ({ league, country }: LeagueDetailsProps) => {
  return (
    <div className="border border-borderdefault rounded-xl p-2 flex flex-col gap-1">
      <span className="text-xs body-txtColor-1">{league}</span>
      <span className="text-base-400 text-xs">{country}</span>
    </div>
  );
};

export default LeagueDetails;
