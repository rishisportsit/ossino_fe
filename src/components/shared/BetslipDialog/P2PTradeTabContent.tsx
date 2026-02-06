import { useState } from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/shared/ui/Tabs';
import P2PTradeExploreTabContent from 'components/features/p2pTrade/P2PTradeExploreTabContent';
import P2PTradeHoldingsTabContent from 'components/features/p2pTrade/P2PTradeHoldingsTabContent';

const P2PTradeTabContent = () => {
  const [currentTab, setCurrentTab] = useState<string>('explore');
  return (
    <Tabs
      value={currentTab}
      onValueChange={(val: string) => setCurrentTab(val)}
    >
      <TabsList className="bg-base-700 rounded-lg border-none h-8">
        <TabsTrigger value="explore" variant="filled">
          Explore
        </TabsTrigger>
        <TabsTrigger value="holdings" variant="filled">
          Holding
        </TabsTrigger>
      </TabsList>
      <TabsContent value="explore">
        <P2PTradeExploreTabContent />
      </TabsContent>
      <TabsContent value="holdings">
        <P2PTradeHoldingsTabContent />
      </TabsContent>
    </Tabs>
  );
};

export default P2PTradeTabContent;
