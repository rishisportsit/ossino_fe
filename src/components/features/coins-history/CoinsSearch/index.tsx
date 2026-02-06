import Icon from 'components/shared/Icon';
import Input from 'components/shared/ui/Input';
import { Button } from 'components/shared/ui/Button';
import searchNormal from '/icons/searchNormal.svg?url';
import setting from '/icons/setting.svg?url';

type CoinsSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onFilterClick: () => void;
  hasActiveFilters?: boolean;
};

const CoinsSearch = ({ value, onChange, onFilterClick, hasActiveFilters }: CoinsSearchProps) => {
  return (
    <div className="flex mt-5 gap-2">
      <div className="relative flex-1">
        <Input
          className="pl-[42px]"
          onChange={(event) => onChange(event.target.value)}
          value={value}
          placeholder="Search by game name, bet ID, or loyalty type"
        />
        <Icon
          id="searchNormalIcon"
          href={searchNormal}
          className="w-5 h-5 fill-base-500 absolute left-3 top-[10px]"
        />
      </div>
      <Button 
        className={`h-10 w-10 flex items-center justify-center rounded-lg p-0 ${
          hasActiveFilters ? 'bg-primary-1 text-base-900' : 'bg-base-700'
        }`}
        onClick={onFilterClick}
      >
        <Icon id="settingIcon" href={setting} className="w-5 h-5 fill-1" />
      </Button>
    </div>
  );
};

export default CoinsSearch;