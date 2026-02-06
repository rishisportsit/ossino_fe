import { DIALOG_TYPE } from 'store/dialog/slice';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store/index';
import { setSelectedTrade } from 'store/p2pTrade/slice';

import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import ExploreCard from './ExploreCard';
import Search from './Search';

const P2PTradeExploreTabContent = ({
  isPage = false,
}: {
  isPage?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { closeDialog, openDialog } = useDialog();
  const navigate = useNavigate();
  const { screenWidth } = useBreakpoint();
  const isMobile = screenWidth < BREAKPOINTS.md;
  const onClick = () => {
    dispatch(
      setSelectedTrade({
        type: 'explore',
      }),
    );
    closeDialog(DIALOG_TYPE.betslip);
    if (isMobile) {
      navigate('/sports/p2p');
    } else {
      openDialog(DIALOG_TYPE.p2pTradeDetails);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <Search isPage={isPage} />
      <div
        className={isPage ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-3'}
      >
        <ExploreCard onClick={onClick} />
        <ExploreCard onClick={onClick} />
        <ExploreCard onClick={onClick} />
      </div>
    </div>
  );
};

export default P2PTradeExploreTabContent;
