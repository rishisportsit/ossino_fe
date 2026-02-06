interface TruncatedTextProps {
  value: string | number;
  length: number;
}

const TruncatedText = ({ value, length = 10 }: TruncatedTextProps) => {
  const checkAndConvertToString = (): string => {
    if (typeof value === 'number') {
      return value.toString();
    }
    return value;
  };

  const truncatedText =
    checkAndConvertToString().length > length
      ? `${checkAndConvertToString().substring(0, length)}...`
      : value;

  return (
    <div className="relative text-xs">
      <span className="cursor-pointer px-1">{truncatedText}</span>
    </div>
  );
};

export default TruncatedText;
