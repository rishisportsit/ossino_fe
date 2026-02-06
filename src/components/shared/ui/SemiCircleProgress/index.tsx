const MAX = 163;
const calcRatio = (val: number) => {
  return (MAX * val) / 100;
};

const SemiCircleProgress = ({
  value,
  label,
}: {
  value: number;
  label: string;
}) => {
  const val = calcRatio(value / 2);
  return (
    <div className="relative w-fit">
      <div className="rotate-180 w-fit h-fit">
        <svg className="size-14">
          <circle
            r="26"
            cy="28"
            cx="28"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${MAX / 2} 1000`}
            className="stroke-base-400"
            fill="transparent"
          />
          <circle
            r="26"
            cy="28"
            cx="28"
            strokeWidth="3"
            strokeDasharray={`${val} 1000`}
            strokeLinecap="round"
            className="stroke-accent-2 fill-transparent"
          />
        </svg>
      </div>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col">
        <p className="text-center text-xs leading-none font-medium">
          {value}%
          <br />
          <span className="text-10px font-normal text-base-300">{label}</span>
        </p>
      </div>
    </div>
  );
};

export default SemiCircleProgress;
