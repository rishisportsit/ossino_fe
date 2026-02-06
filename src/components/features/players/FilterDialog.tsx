import { type PropsWithChildren } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import setting from '/icons/setting.svg?url';
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
import arrowLeft from '/icons/arrowLeft.svg?url';

type Field = {
  name: string;
  label: string;
  placeholder: string;
};

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const fields: Field[] = [
  {
    name: 'match_type',
    label: 'Match',
    placeholder: 'Select match type',
  },
  {
    name: 'league',
    label: 'League',
    placeholder: 'Select league',
  },
  {
    name: 'player_position',
    label: 'Player position',
    placeholder: 'Select position',
  },
];

const formSchema = z.object({
  match_type: z.string(),
  league: z.string(),
  player_position: z.string(),
  market: z.string(),
  odds: z.string(),
});

const Dialogs = ({
  children,
  onOpenChange,
  open,
}: PropsWithChildren & DialogProps) => {
  const { screenWidth } = useBreakpoint();

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

const FilterDialog = ({ open, onOpenChange }: DialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      match_type: '',
      league: '',
      player_position: '',
      market: '',
      odds: '',
    },
  });

  const selectedMarket = form.watch('market');
  const isOddsDisabled = selectedMarket !== 'over_under';

  const onClose = () => {
    onOpenChange(false);
  };

  const submit = () => {
    onClose();
  };

  return (
    <Dialogs open={open} onOpenChange={onOpenChange}>
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

          <div className="grid grid-cols-2 gap-4 mb-4">
            <FormField
              name="market"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Market</FormLabel>
                  <FormControl>
                    <Select
                      list={
                        <div
                          className="p-2 hover:bg-base-600 cursor-pointer"
                          onClick={() => {
                            field.onChange('over_under');
                          }}
                        >
                          Over/Under
                        </div>
                      }
                      withChevron
                      className="px-3 py-2 md:max-w-full xl:max-w-full h-auto"
                      chevronClassName="!bg-base-700"
                    >
                      <span className="text-sm text-base-400">
                        {field.value === 'over_under' ? 'Over/Under' : 'Select market'}
                      </span>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="odds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Odds</FormLabel>
                  <FormControl>
                    <div
                      className={
                        isOddsDisabled ? 'pointer-events-none opacity-50' : undefined
                      }
                    >
                      <Select
                        list={[]}
                        withChevron
                        className="px-3 py-2 md:max-w-full xl:max-w-full"
                        chevronClassName="!bg-base-700"
                        {...field}
                      >
                        <span className="text-sm text-base-400">
                          {isOddsDisabled ? 'Select market' : 'Select odds'}
                        </span>
                      </Select>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

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
