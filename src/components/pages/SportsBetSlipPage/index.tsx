import BetslipSection from 'components/features/sports/BetslipSection';
import BetslipDashboard from 'components/features/sports/BetslipSection/BetslipDashboard';
import MobileBetslip from 'components/features/sports/BetslipSection/MobileBetslip';

const SportsBetSlipPage = () => {
  return (
    <div className="p-4 body-txtColor-1">
      <div className="mt-16 bg-secondary rounded-xl px-5 lg:pl-5 lg:pr-5 py-5 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row w-full items-start min-w-0">
          <div className="flex-1 w-full lg:max-w-4xl flex flex-col gap-8 min-w-0">
            <BetslipDashboard />
          </div>

          <div className="hidden h-full lg:block w-px bg-borderdefault mx-6" />

          <div className="w-full lg:w-[290px] lg:flex-shrink-0 flex flex-col gap-6">
            <BetslipSection />
          </div>
        </div>
      </div>

      {/* Mobile Betslip Button and Panels */}
      <MobileBetslip betCount={3} />
    </div>
  );
};

export default SportsBetSlipPage;
