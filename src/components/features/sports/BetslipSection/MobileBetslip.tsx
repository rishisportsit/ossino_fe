import { DIALOG_TYPE } from 'store/dialog/slice';

import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import BetslipButton from './BetslipButton';

interface MobileBetslipProps {
  betCount?: number;
}

const MobileBetslip = ({ betCount = 0 }: MobileBetslipProps) => {
  const { screenWidth } = useBreakpoint();
  const { openDialog } = useDialog();

  const shouldShow = screenWidth < BREAKPOINTS.lg;

  if (!shouldShow) {
    return null;
  }

  return (
    <BetslipButton
      betCount={betCount}
      onClick={() => openDialog(DIALOG_TYPE.betslip, { tab: 'betslip' })}
    />
  );
};

export default MobileBetslip;
