import { DIALOG_TYPE } from 'store/dialog/slice';

import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import ExploreCard from './ExploreCard';
import PurchaseDetailsCard from './PurchaseDetailsCard';
import TradeAvailablesTable from './TradeAvailablesTable';

const ExploreDetailsContent = () => {
  const { openDialog, closeDialog } = useDialog();
  const { screenWidth } = useBreakpoint();

  const isTablet = screenWidth >= BREAKPOINTS.md;

  return (
    <div className="flex flex-col gap-5">
      <ExploreCard isMain={false} />
      <PurchaseDetailsCard
        onClick={() => {
          if (isTablet) {
            closeDialog(DIALOG_TYPE.p2pTradeDetails);
          }
          openDialog(DIALOG_TYPE.p2pTradePurchaseDetails);
        }}
      />
      <TradeAvailablesTable />
    </div>
  );
};

export default ExploreDetailsContent;
