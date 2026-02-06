import { cn } from 'helpers/ui';

export type GameIconProps = {
  title: string;
  image: string;
  mobileImage?: any;
  selected?: boolean;
  thumbnailImage?: any;
  link?: string;
};

const GameIcon = ({ title, image, selected = false }: GameIconProps) => {
  return (
    <div className="flex flex-col gap-2 w-16 xl:w-20 text-center overflow-hidden font-bold ">
      <div className="flex flex-col m-0 justify-center items-center gap-2 relative aspect-square">
        <img
          className={cn(
            'absolute w-full h-full top-0 left-0 object-cover border border-transparent rounded-2xl xl:rounded-[24px] bg-transparent hover:border-accent-3 cursor-pointer',
            { 'border-accent-3': selected },
          )}
          src={image}
          alt={title}
        />
      </div>
      <span
        className={cn(
          'text-xs leading-[14px] overflow-hidden whitespace-nowrap text-ellipsis',
          { 'text-accent-3': selected },
        )}
      >
        {title}
      </span>
    </div>
  );
};

export default GameIcon;
