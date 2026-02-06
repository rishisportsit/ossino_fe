import { useState } from 'react';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';

import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import ExploreDetailsContent from 'components/features/p2pTrade/ExploreDetailsContent';
import HoldingDetailsContent from 'components/features/p2pTrade/HoldingDetailsContent';
import P2PTradeExploreTabContent from 'components/features/p2pTrade/P2PTradeExploreTabContent';
import P2PTradeHoldingsTabContent from 'components/features/p2pTrade/P2PTradeHoldingsTabContent';
import PageHeader from 'components/shared/PageHeader';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/shared/ui/Tabs';

const P2PTradePage = () => {
  const selectedTrade = useAppSelector((state) => state.p2pTrade.selectedTrade);
  const { screenWidth } = useBreakpoint();
  const { openDialog } = useDialog();
  const [currentTab, setCurrentTab] = useState<string>('explore');
  const isTablet =
    screenWidth >= BREAKPOINTS.md && screenWidth < BREAKPOINTS.xl;
  const isMobile = screenWidth < BREAKPOINTS.md;

  if (isTablet) {
    return null;
  }

  return (
    <div className="px-4 pt-[76px] pb-4 xl:pt-0 xl:px-5">
      {isMobile ? (
        <>
          {selectedTrade ? (
            <>
              <PageHeader
                onClick={() =>
                  openDialog(DIALOG_TYPE.betslip, { tab: 'p2p_trade' })
                }
                label="Philippines - Nigeria"
              />
              {selectedTrade.type === 'explore' ? (
                <ExploreDetailsContent />
              ) : null}
              {selectedTrade.type === 'holding' ? (
                <HoldingDetailsContent />
              ) : null}
            </>
          ) : null}
        </>
      ) : (
        <>
          <PageHeader label="P2P Trading" />
          <Tabs
            value={currentTab}
            onValueChange={(val: string) => setCurrentTab(val)}
          >
            <TabsList className="border-b-base-600">
              <TabsTrigger value="explore" variant="text" className="max-w-32">
                Explore
              </TabsTrigger>
              <TabsTrigger value="holdings" variant="text" className="max-w-32">
                Holding
              </TabsTrigger>
            </TabsList>
            <TabsContent value="explore" className="bg-base-800 p-5 rounded-xl">
              <P2PTradeExploreTabContent isPage />
            </TabsContent>
            <TabsContent
              value="holdings"
              className="bg-base-800 p-5 rounded-xl"
            >
              <P2PTradeHoldingsTabContent isPage />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default P2PTradePage;
