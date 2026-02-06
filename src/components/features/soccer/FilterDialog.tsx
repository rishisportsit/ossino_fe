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
import ArrowRight2Icon from 'assets/icons/ArrowRight2';

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
    name: 'country',
    label: 'Country',
    placeholder: 'Select country',
  },
  {
    name: 'league',
    label: 'League',
    placeholder: 'Select league',
  },
  {
    name: 'team',
    label: 'Team',
    placeholder: 'Select team',
  },
  {
    name: 'odds',
    label: 'Odds',
    placeholder: 'Select odds',
  },
];

const formSchema = z.object({
  country: z.string(),
  league: z.string(),
  team: z.string(),
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
          <SheetTitle className="mb-5 flex flex-col gap-6">
            <SheetClose className="w-8 h-8 border border-base-700 rounded-lg flex items-center justify-center">
              <span className="sr-only">Close</span>
              <ArrowRight2Icon />
            </SheetClose>
            <div className="flex items-center gap-2">
              <Icon id="settingIcon" href={setting} className="w-5 h-5 fill-1" />
              <span className="font-medium text-base">Filters</span>
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
      <DrawerContent className="h-fit pb-8 bg-base-800">
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
      team: '',
      country: '',
      league: '',
      odds: '',
    },
  });

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
