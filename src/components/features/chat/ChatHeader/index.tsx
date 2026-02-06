import Icon from 'components/shared/Icon';
import { toggleChat } from 'store/chat/slice';
import { useAppDispatch } from 'store/index';
import arrowRight from '/icons/arrowRight.svg?url';

import { cn } from 'helpers/ui';
import ChatDropdown from '../ChatDropdown';

const ChatHeader = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="header-wrapper sticky top-0 py-4 md:py-7 px-4 background-2">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2">
          <button
            type="button"
            onClick={() => dispatch(toggleChat())}
            className={cn(
              'border-base-700 rounded-lg border body-txtColor-1 w-8 h-8 flex items-center justify-center',
            )}
          >
            <Icon id="arrowRightIcon" href={arrowRight} className="w-4 h-4 fill-current body-txtColor-1" />
          </button>
          <div className="flex items-center justify-center rounded-lg h-8 px-4 text-sm bg-base-800 text-special-2 font-medium">
            Chat
          </div>
        </div>
        <div className="ml-auto">
          <ChatDropdown />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
