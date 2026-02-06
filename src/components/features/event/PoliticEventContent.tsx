import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import PageHeader from 'components/shared/PageHeader';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/shared/ui/Tabs';
import BetslipSection from '../sports/BetslipSection';
import PoliticEventBanner from './PoliticEventBanner';
import PoliticEventPopularTabContent from './PoliticEventPopularTabContent';
import PoliticEventUpcomingTabContent from './PoliticEventUpcomingTabContent';

const PoliticEventContent = () => {
  const { screenWidth } = useBreakpoint();
  const isDesktop = screenWidth >= BREAKPOINTS.xl;
  return (
    <div className="px-4 xl:px-5">
      <PageHeader label="Politics / US Presidential Election 2024" />
      <PoliticEventBanner />
      <div className="xl:p-5 xl:rounded-xl xl:bg-base-800 xl:flex xl:h-full">
        <Tabs defaultValue="popular" className="xl:flex-1">
          <TabsList className="border-b-base-600">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          <TabsContent value="popular">
            <PoliticEventPopularTabContent />
          </TabsContent>
          <TabsContent value="upcoming">
            <PoliticEventUpcomingTabContent />
          </TabsContent>
        </Tabs>
        <div className="hidden xl:flex xl:mx-5 xl:bg-borderdefault xl:min-h-full xl:w-px" />
        {isDesktop ? <BetslipSection /> : null}
      </div>
    </div>
  );
};

export default PoliticEventContent;
