import EventContentCard from 'components/features/event/EventContentCard';
import MobileBetslip from 'components/features/sports/BetslipSection/MobileBetslip';
import { useBetSlipData } from 'hooks/useBetSlipData';
import { useAppSelector } from 'store/index';
import { selectBetHistoryInSportsBook } from 'store/SportsHomePage/selectors';

const EventPage = () => {

  const originalBetHistory = useAppSelector(selectBetHistoryInSportsBook);
  const { betSlipCount } = useBetSlipData();

  return (
    <div className="pt-[75px] md:pt-0 pb-4">
      <EventContentCard
        originalBetHistory={originalBetHistory ?? undefined}
        betcount={betSlipCount}
      />
      {/* Mobile Betslip Button and Panels */}
      <MobileBetslip betCount={betSlipCount} />
    </div>
  );
};

export default EventPage;