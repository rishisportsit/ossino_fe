import { useState, useEffect } from 'react';
import BetslipTabs from '../../../shared/BetslipDialog/BetslipTabs';

const BetslipSection = ({ withControl = true, betcount = 0, myBetsCount = 0 }: { withControl?: boolean; betcount?: number, myBetsCount?: number }) => {
  const [activeTab, setActiveTab] = useState<'betslip' | 'my_bets'>('betslip');

  useEffect(() => {
    const handleSwitchToBetslip = () => {
      setActiveTab('betslip');
    };
    window.addEventListener("switch_to_betslip_tab", handleSwitchToBetslip);
    return () => {
      window.removeEventListener("switch_to_betslip_tab", handleSwitchToBetslip);
    };
  }, []);

  return (
    <div className="hidden lg:block bg-base-750 rounded-xl p-4 w-[290px] min-w-[290px] flex-shrink-0 overflow-hidden h-fit">
      <BetslipTabs
        withControl={withControl}
        tabs={['betslip', 'my_bets']}
        betslipCount={betcount}
        activeTab={activeTab}
        onTabChange={(val) => setActiveTab(val as 'betslip' | 'my_bets')}
        myBetsCount={myBetsCount}
      />
    </div>
  );
};

export default BetslipSection;
