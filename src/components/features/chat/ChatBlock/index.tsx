import { useAppDispatch, useAppSelector } from 'store/index';
import { useEffect, useRef } from 'react';
import { fetchChatData, addMessage, updateUsersCount } from 'store/chat/slice';

import { cn } from 'helpers/ui';
import ChatBody from '../ChatBody';
import ChatHeader from '../ChatHeader';
import ChatInput from '../ChatInput';
import ChatRulesModal from '../ChatRulesModal';
import { ChatWebSocket } from '../ChatWebSocket/ChatWebSocket';

interface ChatBlockProps {
  className?: string;
}

const ChatBlock = ({ className }: ChatBlockProps) => {
  const dispatch = useAppDispatch();

  const messages = useAppSelector((state) => state.chat.messages);
  const usersNumber = useAppSelector((state) => state.chat.usersCount);

  const wsRef = useRef<ChatWebSocket | null>(null);

  useEffect(() => {
    const initConnection = async () => {
      dispatch(fetchChatData());

      wsRef.current = new ChatWebSocket(
        'ws://localhost:3001',
        (message) => dispatch(addMessage(message)),
        (count) => dispatch(updateUsersCount(count))
      );

      wsRef.current.connect();
    };

    initConnection();

    return () => {
      if (wsRef.current) {
        wsRef.current.disconnect();
      }
    };
  }, [dispatch]);

  return (
    <div
      className={cn(
        ' overflow-y-hidden top-16 w-full sm:top-0 bottom-0  sm:mt-0 h-[calc(100vh-58px-72px)] sm:h-full background-2 z-50 transition-all duration-500 ',
        className
      )}
    >
      <div className="flex flex-col h-full">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          <ChatBody messages={messages} />
        </div>
        {/* <div>Chat wager (optional)</div> */}
        {wsRef.current && (
          <ChatInput
            ws={wsRef.current.ws as WebSocket}
            usersCount={usersNumber}
          />
        )}

        <ChatRulesModal />
      </div>
    </div>
  );
};

export default ChatBlock;
