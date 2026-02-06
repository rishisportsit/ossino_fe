import { cn } from 'helpers/ui';

interface IIconBaseProps {
  id: string;
  href: string;
  className?: string;
}

type IIconProps =
  Omit<IIconBaseProps, 'className'>
  & Partial<Pick<IIconBaseProps, 'className'>>;


const Icon = ({ id, href, className }: IIconProps) => {
  const useHref = id ? `${href}#${id}` : href;
  return (
    <svg className={cn("w-10 h-10", className)}>
      <use className={cn("w-10 h-10", className)} href={useHref} />
    </svg>
  );
};

export default Icon;

