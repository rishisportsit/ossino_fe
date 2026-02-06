type RatioProgressBarProps = {
  value: number;
};

const GAP = 5;
const MAX = 119.3;
const calcRatio = (val: number) => {
  return (MAX * val) / 100 - GAP;
};

const RatioProgressBar = ({ value }: RatioProgressBarProps) => {
  const val1 = calcRatio(value);
  const val2 = calcRatio(100 - value);

  return (
    <div className="-rotate-90 w-fit h-fit">
      <svg className="w-11 h-11">
        <circle
          r="19"
          cy="22"
          cx="22"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${val1} ${GAP} ${val2} 1000`}
          className="stroke-accent-2"
          fill="transparent"
        />
        <circle
          r="19"
          cy="22"
          cx="22"
          strokeWidth="3"
          strokeDasharray={`${val1} 1000`}
          strokeLinecap="round"
          className="stroke-primary-1 fill-transparent"
        />
      </svg>
    </div>
  );
};

export default RatioProgressBar;
