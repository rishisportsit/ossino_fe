import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from 'helpers/ui';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'flex items-center border-b border-primary text-muted-foreground',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const sheetVariants = cva(
  'items-center grow justify-center whitespace-nowrap px-3 py-1 leading-5 relative !flex-1 md:flex-none',
  {
    variants: {
      variant: {
        text: 'after:absolute after:w-full after:h-[1px] after:bg-primary-2 after:-bottom-[1px] after:left-0 after:opacity-0 data-[state=active]:after:opacity-100 data-[state=active]:text-primary-2',
        filled:
          'h-7 data-[state=active]:bg-primary-2 data-[state=active]:text-base-900 text-base-200 rounded-md text-xs data-[state=active]:font-medium',
      },
    },
    defaultVariants: { variant: 'text' },
  },
);

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof sheetVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant = 'text', ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(sheetVariants({ variant }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-5 px-[2px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
