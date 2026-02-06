/* eslint-disable react/no-array-index-key */
import { useEffect, useRef } from 'react';
import { useAppSelector } from 'store/index';
import type { Message } from 'store/chat/slice';
import ChatMessage from '../ChatMessage';
import Loader from 'components/shared/ui/Loader';

import './chatbody.css';

type ChatBodyProps = {
  messages: Message[];
};

const ChatBody = ({ messages }: ChatBodyProps) => {
  const loading = useAppSelector((state) => state.chat.loading);
  const error = useAppSelector((state) => state.chat.error);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center h-full text-center text-red-400">Error during loading messages: {error.message}</div>;
  }

  return (
    <div
      className="flex-1 no-scrollbar overflow-y-auto flex flex-col px-4 gap-5 mb-[120px]"
      id="chatbody"
    >
      {messages.map((message, index) => (
        <div key={index} className="message">
          <ChatMessage {...message} />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBody;
