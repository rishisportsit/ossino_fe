import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import PopularTabContent from 'components/features/politics/PopularTabContent';
import UpcomingTabContent from 'components/features/politics/UpcomingTabContent';
import BetslipSection from 'components/features/sports/BetslipSection';
import MobileBetslip from 'components/features/sports/BetslipSection/MobileBetslip';
import PageHeader from 'components/shared/PageHeader';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/shared/ui/Tabs';

const PoliticsPage = () => {
  const { screenWidth } = useBreakpoint();
  const isDesktop = screenWidth >= BREAKPOINTS.xl;
  return (
    <>
      <div className="px-4 pt-[75px] md:pt-0 xl:px-5 pb-4">
        <PageHeader />
        <div className="xl:p-5 xl:rounded-xl xl:bg-base-800 xl:flex xl:h-full">
          <Tabs defaultValue="popular" className="xl:flex-1">
            <TabsList className="border-b-base-600 h-[31px]">
              <TabsTrigger value="popular" className="xl:max-w-[200px]">
                Popular
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="xl:max-w-[200px]">
                Upcoming
              </TabsTrigger>
            </TabsList>
            <TabsContent value="popular">
              <PopularTabContent />
            </TabsContent>
            <TabsContent value="upcoming">
              <UpcomingTabContent />
            </TabsContent>
          </Tabs>
          <div className="hidden xl:flex xl:mx-5 xl:bg-borderdefault xl:min-h-full xl:w-px" />
          {isDesktop ? <BetslipSection /> : null}
        </div>
      </div>
      <MobileBetslip />
    </>
  );
};

export default PoliticsPage;
