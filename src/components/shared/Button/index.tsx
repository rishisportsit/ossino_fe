import type { HTMLAttributes } from 'react';
import { cn } from 'helpers/ui';

type ButtonProps =
  HTMLAttributes<{
    className?: string,
    onClick?: () => void
  }>

interface IButton extends ButtonProps {

}


const Button = ({ children, onClick, className }: IButton) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('block px-3 py-2 text-xs body-txtColor-2 font-medium leading-4 rounded-lg ', className)}
    >
      {children}
    </button>
  );
};

export default Button;
