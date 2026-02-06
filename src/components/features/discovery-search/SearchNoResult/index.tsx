import Icon from 'components/shared/Icon';
import notFound from '/icons/searchZoomOut.svg?url';

const SearchNoResult = ({ query }: any) => {
  return (
    <div className="bg-base-700 rounded-xl h-48 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Icon id="searchZoomOutIcon" href={notFound} className="size-16 icon-placeholder" />
        <p className="text-center text-base-500 text-xs">
          No results for&nbsp;
          <span className="text-primary-1 font-bold">{query}</span>
          <br />
          Apply new criteria or clear search
        </p>
      </div>
    </div>
  );
};

export default SearchNoResult;
