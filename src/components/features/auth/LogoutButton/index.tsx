import { Button } from 'components/shared/ui/Button';
import Loader from 'components/shared/ui/Loader';
import { type MouseEvent, useState } from 'react';
import { useAppDispatch } from 'store/index';
import { logout } from 'store/user/slice';

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton = ({ className }: LogoutButtonProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async (e: MouseEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await dispatch(logout()).unwrap();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button size="lg" className={`btn-textColor ${className ?? ''}`} onClick={onLogout} disabled={isLoading}>
      {isLoading ? <Loader /> : 'Yes, I want'}
    </Button>
  );
};

export default LogoutButton;
