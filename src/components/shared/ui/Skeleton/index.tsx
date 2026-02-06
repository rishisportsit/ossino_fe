import { cn } from "helpers/ui"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-base-700', className)}
      {...props}
    />
  );
}

export { 
  Skeleton 
};
