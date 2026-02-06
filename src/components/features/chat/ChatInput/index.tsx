import Icon from 'components/shared/Icon';
import sendIcon from '/icons/sendYellowIcon.svg?url';
import smileIcon from '/icons/smile.svg?url';

import { useDialog } from 'helpers/hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Message } from 'store/chat/slice';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppDispatch, useAppSelector } from 'store/index';

import type { EmojiClickData } from 'emoji-picker-react';
import Picker from 'emoji-picker-react';
import {
  MentionsInput,
  Mention,
  type OnChangeHandlerFunc,
} from 'react-mentions';
import { getAllUsers } from 'store/users/slice';
import './index.module.css';
import { EmojiPickerStyles, MentionsInputStyles } from './styles';

type ChatInputProps = {
  ws: WebSocket;
  usersCount: number;
};

const ChatInput = ({ ws, usersCount }: ChatInputProps) => {
  const dispatch = useAppDispatch();
  const { openDialog } = useDialog();
  const userName =
    useAppSelector((state) => state.user.data?.userName) || 'unknown guest';
  const users = useAppSelector((state) => state.users.data);
  const [message, setMessage] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null); // needed to close emojies panel on outside-div-tap

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const allUsers = useMemo(() => {
    if (!users) {
      return null;
    }
    return users.map((user) => ({
      id: user.id,
      display: `@${user.userName}`,
    }));
  }, [users]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSendMessageClick = () => {
    const normalizedMessage = message.trim();

    if (!normalizedMessage) return;

    const newMessageFromUser: Message = {
      avatarLink: '/icons/avatarChatBlue.png',
      nickName: userName,
      text: normalizedMessage,
      type: "text",
    };

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(newMessageFromUser));
    }

    setMessage('');
  };

  // can be used to send messages on <Enter>

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessageClick();
    }
  };

  const handleInputChange: OnChangeHandlerFunc = (e) => {
    setMessage(e.target.value);
  };

  const openChatRules = () => {
    openDialog(DIALOG_TYPE.chatRules);
  };

  return (
    <div className="absolute bottom-0 left-0 p-4 pt-6 right-0 flex flex-col gap-4 w-full box-border bg-base-800 border-top-greyscale rounded-t-xl">
      <div className="relative max-h-[104px] min-h-[53px]">
        <MentionsInput
          value={message}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          placeholder="Your Message"
          style={MentionsInputStyles}
        >
          <Mention trigger="@" data={allUsers} />
        </MentionsInput>
        <div className="flex gap-3 absolute bottom-4 right-4 z-10">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="h-[21px] w-[21px] flex items-center justify-center"
          >
            {/* <img
              src="/icons/smile.svg"
              alt="smile menu"
              className="pointer-events-none"
            /> */}
             <Icon
                 id="smileIcon"
                  href={smileIcon}
                  className="w-4 h-4 fill-1"
                          />
          </button>
          <button
            type="button"
            onClick={handleSendMessageClick}
            className="h-[21px] w-[21px] flex items-center justify-center"
          >
            {/* <img
              src="/icons/sendYellowIcon.svg"
              alt="send message"
              className="pointer-events-none"
            /> */}
            <Icon
                 id="sendYellowTriangle"
                  href={sendIcon}
                  className="w-4 h-4 fill-current text-primary-1"
                          />

          </button>
        </div>
      </div>
      {showEmojiPicker ? (
        <div ref={emojiPickerRef} className="w-full">
          <Picker
            onEmojiClick={handleEmojiClick}
            skinTonesDisabled
            style={EmojiPickerStyles}
          />
        </div>
      ) : (
        <div className="flex flex-row justify-between">
          <div className="flex gap-[6px] items-center">
            <span className="inline-block h-[5px] w-[5px] bg-accent-4 rounded-full" />
            <p className="text-xs leading-4 font-medium text-base-300">
              {usersCount} Online
            </p>
          </div>

          <button type="button" onClick={openChatRules}>
            <div className="flex gap-[10px] justify-center items-center">
              <img
                src="/icons/info.png"
                alt="Chat Rules"
                className="h-[14px] w-[14px]"
              />
              <p className="text-xs leading-4 font-medium text-base-300">
                Chat Rules
              </p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
