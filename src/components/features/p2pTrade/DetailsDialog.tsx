import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';

import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeaderWithBack,
} from 'components/shared/ui/Sheet';
import ExploreDetailsContent from './ExploreDetailsContent';
import HoldingDetailsContent from './HoldingDetailsContent';

const DetailsDialog = () => {
  const navigate = useNavigate();
  const { closeDialog, openDialog } = useDialog();
  const { screenWidth } = useBreakpoint();
  const selectedTrade = useAppSelector((state) => state.p2pTrade.selectedTrade);
  const { open } = useAppSelector(
    selectDialogById(DIALOG_TYPE.p2pTradeDetails),
  );

  const isMobile = screenWidth < BREAKPOINTS.md;
  const isTablet =
    screenWidth >= BREAKPOINTS.md && screenWidth < BREAKPOINTS.xl;

  useEffect(() => {
    if (isMobile && open) {
      closeDialog(DIALOG_TYPE.p2pTradeDetails);
      navigate('/sports/p2p');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, open]);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog(DIALOG_TYPE.p2pTradeDetails);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="max-w-[600px] py-5 px-8 bg-base-900"
      >
        <SheetHeaderWithBack
          onClick={() => {
            if (isTablet) {
              openDialog(DIALOG_TYPE.betslip, { tab: 'p2p_trade' });
            }
          }}
          label="Philippines - Nigeria"
        />
        <SheetDescription hidden />
        {selectedTrade ? (
          <div className="px-8 pb-5 md:px-0">
            {selectedTrade.type === 'explore' ? (
              <ExploreDetailsContent />
            ) : null}
            {selectedTrade.type === 'holding' ? (
              <HoldingDetailsContent />
            ) : null}
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default DetailsDialog;
