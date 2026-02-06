import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from 'helpers/ui';

const SportsTabs = TabsPrimitive.Root;

const SportsTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'flex items-center w-full mb-6',
      className,
    )}
    {...props}
  />
));
SportsTabsList.displayName = TabsPrimitive.List.displayName;

const SportsTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex-1 px-0 py-2 text-lg font-medium transition-colors relative text-center',
      'data-[state=active]:text-special-2 data-[state=active]:border-b data-[state=active]:border-special-2',
      'data-[state=inactive]:text-base-500 data-[state=inactive]:border-b data-[state=inactive]:border-base-680',
      'hover:data-[state=inactive]:body-txtColor-1',
      'bg-transparent rounded-none border-b border-transparent',
      className,
    )}
    {...props}
  />
));
SportsTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const SportsTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
SportsTabsContent.displayName = TabsPrimitive.Content.displayName;

interface SportsTabsProps {
  activeTab: 'popular' | 'live' | 'upcoming';
  onTabChange: (tab: 'popular' | 'live' | 'upcoming') => void;
  children: React.ReactNode;
}

const SportsTabsComponent = ({ activeTab, onTabChange, children }: SportsTabsProps) => {
  return (
    <SportsTabs value={activeTab} onValueChange={(value) => onTabChange(value as any)}>
      <SportsTabsList>
        <SportsTabsTrigger value="popular">Popular</SportsTabsTrigger>
        <SportsTabsTrigger value="live">Live</SportsTabsTrigger>
        <SportsTabsTrigger value="upcoming">Upcoming</SportsTabsTrigger>
      </SportsTabsList>
      
      <SportsTabsContent value="popular">
        {children}
      </SportsTabsContent>
      
      <SportsTabsContent value="live">
        {children}
      </SportsTabsContent>
      
      <SportsTabsContent value="upcoming">
        {children}
      </SportsTabsContent>
    </SportsTabs>
  );
};

export default SportsTabsComponent;
