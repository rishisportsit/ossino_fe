import Card from './Card';
import type { ResultData } from './types';

const SearchResult = ({ fixturesByGroup }) => {
  return (
    <div className="flex flex-col gap-5 pr-4">
      {fixturesByGroup?.map((data) => {
        return <Card key={data.id} data={data} />;
      })}
    </div>
  );
};

export default SearchResult;
