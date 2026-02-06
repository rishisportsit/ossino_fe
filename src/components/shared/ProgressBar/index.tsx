interface IProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: IProgressBarProps) => {
  return (
    <div className="relative w-full h-2 bg-base-800 rounded-full overflow-hidden">
      <div className="absolute top-0 left-0 h-full bg-accent-2" style={{ width: `${progress}%` }} />
    </div>

  );
};

export default ProgressBar;