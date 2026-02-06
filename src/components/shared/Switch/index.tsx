import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from 'helpers/ui';

const commonStyle =
  'flex h-full w-1/2 cursor-pointer items-center justify-center bg-inherit text-center duration-300 body-txtColor-1';

const Switcher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(() =>
    location.pathname.startsWith('/sports') ? 'sports' : 'casino'
  );

  useEffect(() => {
    if (location.pathname.startsWith('/sports')) {
      setActive('sports');
    } else {
      setActive('casino');
    }
  }, [location.pathname]);

  const handleSwitch = (tab: 'sports' | 'casino') => {
    setActive(tab);
    if (tab === 'sports') {
      navigate('/sports');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative h-10 w-60 rounded-lg bg-base-800 p-1">
      <div
        className={cn(
          'absolute top-1 h-8 w-1/2 rounded-[6px] background-1 transition-transform duration-300 ease-in-out translate-x-0',
          { 'translate-x-[112px]': active === 'casino' },
        )}
      />

      <div className="relative z-10 flex h-full items-center justify-between">
        <button
          type="button"
          onClick={() => handleSwitch('sports')}
          className={cn(commonStyle, { 'body-txtColor-2': active === 'sports' })}
        >
          Sports
        </button>
        <button
          type="button"
          onClick={() => handleSwitch('casino')}
          className={cn(commonStyle, { 'body-txtColor-2': active === 'casino' })}
        >
          Casino
        </button>
      </div>
    </div>
  );
};

export default Switcher;