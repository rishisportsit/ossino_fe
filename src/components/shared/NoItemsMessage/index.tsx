import Icon from '../Icon';
import documentCopy from '/icons/documentCopy.svg?url';

interface NoItemsMessageProps {
  message: string;
}

const NoItemsMessage = ({ message }: NoItemsMessageProps) => {
  return (
    <div className="flex flex-col items-center">
      <Icon
        id="documentCopyIcon"
        href={documentCopy}
        className="w-16 h-16 mb-4 icon-placeholder"
      />
      <p className="test-sm text-base-400">{message}</p>
    </div>
  );
};

export default NoItemsMessage;
