import { type PropsWithChildren } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';

import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import setting from '/icons/setting.svg?url';
import arrowLeft from '/icons/arrowLeft.svg?url';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from 'components/shared/ui/Drawer';
import Icon from 'components/shared/Icon';
import Select from 'components/shared/Select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from 'components/shared/ui/Form';
import { Button } from 'components/shared/ui/Button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from 'components/shared/ui/Sheet';

type Field = {
  name: string;
  label: string;
  placeholder: string;
};

const fields: Field[] = [
  {
    name: 'team',
    label: 'Team',
    placeholder: 'Select team',
  },
  {
    name: 'bet_type',
    label: 'Bet Type',
    placeholder: 'Select bet type',
  },
  {
    name: 'market',
    label: 'Market',
    placeholder: 'Select market',
  },
  {
    name: 'odds',
    label: 'Odds',
    placeholder: 'Select odds',
  },
];

const formSchema = z.object({
  team: z.string(),
  bet_type: z.string(),
  market: z.string(),
  odds: z.string(),
});

const Dialogs = ({ children }: PropsWithChildren) => {
  const { screenWidth } = useBreakpoint();
  const { open } = useAppSelector(selectDialogById(DIALOG_TYPE.p2pTradeFilter));
  const { closeDialog, openDialog } = useDialog();
  const isTablet =
    screenWidth >= BREAKPOINTS.md && screenWidth < BREAKPOINTS.xl;

  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog(DIALOG_TYPE.p2pTradeFilter);
      if (isTablet) {
        openDialog(DIALOG_TYPE.betslip, { tab: 'p2p_trade' });
      }
    }
  };
  if (screenWidth >= BREAKPOINTS.md) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="max-w-[400px] py-5 px-8 bg-base-900"
        >
          <SheetTitle className="mb-5 flex gap-2">
            <SheetClose className="w-8 h-8 bg-base-800 rounded-lg flex items-center justify-center">
              <span className="sr-only">Close</span>
              <Icon id="arrowLeftIcon" href={arrowLeft} className="w-4 h-4 fill-current body-txtColor-1" />
            </SheetClose>
            <div className="bg-base-800 h-8 px-4 rounded-lg flex items-center">
              <p className="font-medium text-primary-2 text-sm">Filters</p>
            </div>
          </SheetTitle>
          <SheetDescription hidden />
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-fit pb-8">
        <DrawerTitle className="flex items-center gap-2 mb-3">
          <Icon id="settingIcon" href={setting} className="w-5 h-5 fill-1" />
          Filters
        </DrawerTitle>
        <DrawerDescription hidden />
        {children}
      </DrawerContent>
    </Drawer>
  );
};

const FilterDialog = () => {
  const { closeDialog, openDialog } = useDialog();
  const { screenWidth } = useBreakpoint();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      team: '',
      bet_type: '',
      market: '',
      odds: '',
    },
  });

  const isTablet =
    screenWidth >= BREAKPOINTS.md && screenWidth < BREAKPOINTS.xl;

  const onClose = () => {
    closeDialog(DIALOG_TYPE.p2pTradeFilter);
  };

  const submit = () => {
    onClose();
    if (isTablet) {
      openDialog(DIALOG_TYPE.betslip, { tab: 'p2p_trade' });
    }
  };

  return (
    <Dialogs>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          {fields.map(({ name, label, placeholder }) => {
            return (
              <FormField
                key={name}
                name={name}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Select
                        list={[]}
                        withChevron
                        className="px-3 py-2 md:max-w-full xl:max-w-full"
                        chevronClassName="!bg-base-700"
                        {...field}
                      >
                        <span className="text-sm text-base-400">
                          {placeholder}
                        </span>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            );
          })}
          <div className="flex gap-4 mt-8">
            <Button variant="outline" className="w-full">
              Reset
            </Button>
            <Button type="submit" className="w-full">
              Apply
            </Button>
          </div>
        </form>
      </Form>
    </Dialogs>
  );
};

export default FilterDialog;
