import Icon from 'components/shared/Icon';
import { useDialog } from 'helpers/hooks';
import { type ReactNode } from 'react';
import type { Message } from 'store/chat/slice';
import arrowRight from '/icons/arrowRight.svg?url';
import coinLogo from '/icons/coinLogo.svg?url';
import { DIALOG_TYPE } from 'store/dialog/slice';

const reg = new RegExp(/@\[@(.*?)\]\(\w+\)/g);

const formatMentionText = (text: string) => {
  const tags = text.match(reg);
  if (!tags) {
    return <span className="leading-[20px] text-base-200">{text}</span>;
  }

  const usernames = tags.map((tag) => tag.split(reg)[1]);
  return (
    <span className="leading-[20px] text-base-200">
      {text.split(reg).reduce(
        (prev, current) => {
          const n = [...prev];
          n.push(
            usernames.includes(current) ? (
              <span key={current} className="text-primary-1">
                @{current}
              </span>
            ) : (
              current
            ),
          );
          return n;
        },
        [] as (string | ReactNode)[],
      )}
    </span>
  );
};

const ChatMessage = (message: Message) => {
  const { openDialog } = useDialog();

  // eslint-disable-next-line react/destructuring-assignment
  if (message.type === 'text') {
    const { text, nickName } = message;

    return (
      <div className="flex flex-row">
        <span className="flex flex-row gap-1 items-start">
          <div className="h-5 w-5">
            <img
              src="/icons/avatarChatBlue.png"
              alt="User Avatar"
              className="pointer-events-none flex min-w-5 min-h-5 object-contain"
            />
          </div>
          <span className="text-sm font-regular leading-tight">
            <span className="font-bold leading-4 body-txtColor-1">{nickName}</span>
            <span>{`: `}</span>
            {formatMentionText(text)}
          </span>
        </span>
      </div>
    );
  }

  const { amount, receiver, sender } = message;

  const handleClick = () => {
    openDialog(DIALOG_TYPE.tip, { amount, sender, receiver });
  };

  return (
    <div className="bg-base-800 rounded-lg p-2 w-full">
      <span className="flex flex-row gap-1 items-start mb-2">
        <div className="h-5 w-5">
          <img
            src="/icons/avatarChatBlue.png"
            alt="User Avatar"
            className="pointer-events-none flex min-w-5 min-h-5 object-contain"
          />
        </div>
        <span className="text-sm font-regular leading-tight flex items-center gap-1">
          <span className="font-bold leading-4 body-txtColor-1">{sender}:</span>
          <span className="text-base-200">Tipped</span>
          <span className="leading-[20px] font-medium text-primary-1">
            @{receiver}
          </span>
        </span>
      </span>
      <button
        onClick={handleClick}
        className="bg-base-700 rounded-md p-2 flex items-center gap-2 w-full"
        type="button"
      >
        <Icon href={coinLogo} id="coinLogoIcon" className="w-4 h-4" />
        <span className="text-sm leading-[18px] grow text-left">{amount}</span>
        <Icon href={arrowRight} id="arrowRightIcon" className="w-4 h-4 fill-current body-txtColor-1" />
      </button>
    </div>
  );
};

export default ChatMessage;
