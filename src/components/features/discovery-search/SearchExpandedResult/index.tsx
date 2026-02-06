import { Accordion } from 'components/shared/ui/Accordion';
import Card from './Card';
import type { ResultData } from './types';

const SearchExpandedResult = ({ fixturesByGroup }) => {

  return (
    <div>
      <Accordion type="multiple" className="flex flex-col gap-1">
        {fixturesByGroup?.map((data) => {
          return <Card key={data.id} data={data} />;
        })}
      </Accordion>
    </div>
  );
};

export default SearchExpandedResult;
