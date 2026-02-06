import Icon from 'components/shared/Icon';
import { cn } from 'helpers/ui';
import tickCircle2 from '/icons/tickCircle2.svg?url';
import spriteOtherIcons from '/sprite-other-icons.svg?url';

type GameCardProps = {
  onClick?: () => void;
  selected?: boolean;
  image: string;
  title: string;
  categoryIcon?: string;
};

const GameCard = ({
  onClick,
  selected = true,
  image,
  title,
  categoryIcon,
}: GameCardProps) => {
  return (
    <div className="flex flex-col w-14 gap-2" onClick={onClick}>
      <div className="relative">
        <img
          className={cn(
            'border-2 border-transparent rounded-full w-full cursor-pointer transition-all duration-200',
            { 'border-primary-1 shadow-lg shadow-primary-1/20': selected, },
          )}
          alt={title}
          src={image}
        />
        {selected ? (
          <Icon
            id="tickCircle2Icon"
            href={tickCircle2}
            className="w-5 h-5 absolute top-0 right-0 z-10 fill-current text-primary-1"
          />
        ) : null}
      </div>
      <div className="flex flex-col items-center gap-1">
        {categoryIcon && (
          <Icon
            id={`${categoryIcon}Icon`}
            href={spriteOtherIcons}
            className="w-4 h-4 fill-current text-primary-1"
          />
        )}
        <span className="inline text-xs leading-[14px] text-center overflow-hidden whitespace-nowrap font-bold text-ellipsis max-w-14 block">
          {title}
        </span>
      </div>
    </div>
  );
};

export default GameCard;
