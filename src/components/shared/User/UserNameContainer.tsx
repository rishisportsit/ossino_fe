import { cn } from 'helpers/ui';
import { useAppSelector } from 'store/index';

interface IUserNameContainerProps {
  name: string;
}

const UserNameContainer = ({ name }: IUserNameContainerProps) => {
  const isChatShown = useAppSelector((state) => state.chat.isChatOpen);
  return (
    <span className={cn('hidden whitespace-nowrap xl:block px-1 overflow-hidden text-ellipsis ',
      { 'w-16 ': isChatShown }
    )}>
      {name}
    </span>
  );
};

export default UserNameContainer;
