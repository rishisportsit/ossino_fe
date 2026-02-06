import { cn } from "helpers/ui";
import { Skeleton } from "../ui/Skeleton";

type MenuListLoaderProps = {
  isOpen: boolean
}

const MenuListLoader = ({ isOpen }: MenuListLoaderProps) => {
  return (
    <div className="flex flex-col gap-2 ">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={cn('w-10 rounded-xl h-10 bg-base-700 transition-width', { 'w-full': isOpen })}
        />
      ))}
    </div>
  );
};

export default MenuListLoader;
