import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import { useAppDispatch } from 'store/index';
import BonusesContent from 'components/shared/BonusesContent';
import PageHeader from 'components/shared/PageHeader';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';

const BonusesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { screenWidth } = useBreakpoint();

  useEffect(() => {
    if (screenWidth >= BREAKPOINTS.xl) {
      dispatch(openDialog({ id: DIALOG_TYPE.bonuses }));
      navigate('/');
    }
  }, [dispatch, navigate, screenWidth]);

  return screenWidth < BREAKPOINTS.xl ? (
    <div className="p-4 pt-[76px] md:pt-0 xl:p-5 mb-2 flex flex-col overflow-hidden min-h-svh md:min-h-full md:-mb-4">
      <PageHeader to="/" className="mb-5" />
      <BonusesContent />
    </div>
  ) : null;
};

export default BonusesPage;
