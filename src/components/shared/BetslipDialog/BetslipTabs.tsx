import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from 'helpers/ui';
import BetslipTabContent from './BetslipTabContent';
import MyBetsTabContent from './MyBetsTabContent';
import P2PTradeTabContent from './P2PTradeTabContent';
import { useAppSelector } from 'store/index';
import { selectIsLoggedIn } from 'store/user/selectors';

const BetslipTabs = TabsPrimitive.Root;

const BetslipTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('flex items-center w-full mb-6', className)}
    {...props}
  />
));
BetslipTabsList.displayName = TabsPrimitive.List.displayName;

const BetslipTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex-1 px-0 py-2 text-base font-medium transition-colors relative text-center',
      'data-[state=active]:text-special-2 data-[state=active]:border-b data-[state=active]:border-special-2',
      'data-[state=inactive]:body-txtColor-1 data-[state=inactive]:border-b data-[state=inactive]:border-base-700',
      'hover:data-[state=inactive]:body-txtColor-1',
      'bg-transparent rounded-none border-b border-transparent',
      '[&>span]:data-[state=active]:text-special-2',
      '[&>div>span]:data-[state=active]:text-special-2',
      className,
    )}
    {...props}
  />
));
BetslipTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const BetslipTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-0 data-[state=active]:md:h-full data-[state=active]:md:flex data-[state=active]:md:flex-col ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
BetslipTabsContent.displayName = TabsPrimitive.Content.displayName;

type Tabs = 'betslip' | 'my_bets' | 'p2p_trade';

interface BetslipTabsProps {
  tabs?: Tabs[];
  activeTab: Tabs;
  betslipCount?: number;
  onTabChange: (value: Tabs) => void;
  withControl?: boolean;
  myBetsCount?: number;
}

const BetslipTabsComponent = ({
  tabs = ['betslip', 'my_bets', 'p2p_trade'],
  activeTab,
  onTabChange,
  betslipCount,
  myBetsCount
}: BetslipTabsProps) => {
  const show = (name: Tabs) => {
    return tabs.includes(name);
  };

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const betHistoryLoading = useAppSelector((state) => state.sportsBook?.data?.betHistoryInSportsBook?.loading);

  return (
    <BetslipTabs
      className="md:flex md:flex-col"
      value={activeTab}
      onValueChange={(value) => onTabChange(value as typeof activeTab)}
    >
      <BetslipTabsList>
        {show('betslip') ? (
          <BetslipTabsTrigger value="betslip">
            <div className="flex items-center justify-center">
              <span>Betslip</span>
              <div className="ml-2 w-5 h-5 bg-base-700 rounded-full flex items-center justify-center">
                <span className="text-accent-4 text-xs font-bold">{betslipCount}</span>
              </div>
            </div>
          </BetslipTabsTrigger>
        ) : null}
        {show('my_bets') ? (
          <BetslipTabsTrigger value="my_bets">
            <div className="flex items-center justify-center">
              <span>My Bets</span>
              {isLoggedIn && ((myBetsCount ?? 0) > 0) && (
                <div className="ml-2 w-5 h-5 bg-base-700 rounded-full flex items-center justify-center">
                  <span className="text-accent-4 text-xs font-bold">{myBetsCount}</span>
                </div>
              )}

            </div>
          </BetslipTabsTrigger>
        ) : null}
        {/* {show('p2p_trade') ? (
          <BetslipTabsTrigger value="p2p_trade">P2P Trade</BetslipTabsTrigger>
        ) : null} */}
      </BetslipTabsList>

      {show('betslip') ? (
        <BetslipTabsContent value="betslip" className="">
          <BetslipTabContent />
        </BetslipTabsContent>
      ) : null}

      {show('my_bets') ? (
        <BetslipTabsContent value="my_bets">
          <MyBetsTabContent />
        </BetslipTabsContent>
      ) : null}

      {show('p2p_trade') ? (
        <BetslipTabsContent value="p2p_trade">
          <P2PTradeTabContent />
        </BetslipTabsContent>
      ) : null}
    </BetslipTabs>
  );
};

export default BetslipTabsComponent;
