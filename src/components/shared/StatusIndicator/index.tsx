import { cn } from 'helpers/ui';


interface IStatusIndicator {
  className?: string;
}

type StatusIndicatorProps =
  Omit<IStatusIndicator, 'className'>
  & Partial<Pick<IStatusIndicator, 'className'>>;


const StatusIndicator = ({ className }: StatusIndicatorProps) => {
  return (
    <span
      className={cn('h-2 w-2 rounded-full bg-secondary-light-6 border-base-700 border-2', className)} />
  );
};

export default StatusIndicator;