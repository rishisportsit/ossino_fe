import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store/index';
import { setSelectedTrade } from 'store/p2pTrade/slice';
import { DIALOG_TYPE } from 'store/dialog/slice';

import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import HoldingCard from './HoldingCard';
import Search from './Search';

const P2PTradeHoldingsTabContent = ({
  isPage = false,
}: {
  isPage?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { closeDialog, openDialog } = useDialog();
  const { screenWidth } = useBreakpoint();

  const onClick = () => {
    dispatch(
      setSelectedTrade({
        type: 'holding',
      }),
    );
    closeDialog(DIALOG_TYPE.betslip);
    if (screenWidth >= BREAKPOINTS.md) {
      openDialog(DIALOG_TYPE.p2pTradeDetails);
    } else {
      navigate('/sports/p2p');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Search isPage={isPage} />
      <div
        className={isPage ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-3'}
      >
        <HoldingCard onClick={onClick} />
        <HoldingCard sold onClick={onClick} />
        <HoldingCard onClick={onClick} />
      </div>
    </div>
  );
};

export default P2PTradeHoldingsTabContent;
