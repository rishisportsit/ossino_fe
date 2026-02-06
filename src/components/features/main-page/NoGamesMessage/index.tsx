import NoItemsMessage from 'components/shared/NoItemsMessage';
import type { ReactNode } from 'react';

type NoGamesMessageProps = {
  label: ReactNode;
  message: string;
};

const NoGamesMessage = ({ label, message }: NoGamesMessageProps) => {
  return (
    <div>
      <span className="mb-3 text-base">{label}</span>
      <div className="flex justify-center items-center py-[66px]">
        <NoItemsMessage message={message} />
      </div>
    </div>
  );
};

export default NoGamesMessage;
