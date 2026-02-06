import { type PropsWithChildren } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAppSelector } from 'store/index';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';

import { cn } from 'helpers/ui';
import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import {
  DrawerContent,
  Drawer,
  DrawerTitle,
  DrawerDescription,
} from 'components/shared/ui/Drawer';
import { Button } from 'components/shared/ui/Button';
import NumberField from 'components/shared/ui/NumberField';
import ErrorMessage from 'components/shared/ui/ErrorMessage';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from 'components/shared/ui/Form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeaderWithBack,
} from 'components/shared/ui/Sheet';
import PurchaseDetailsCard from './PurchaseDetailsCard';

const values = [10, 50, 100, 150, 300, 500];

const Dialogs = ({ children }: PropsWithChildren) => {
  const { screenWidth } = useBreakpoint();
  const { closeDialog, openDialog } = useDialog();
  const { open } = useAppSelector(
    selectDialogById(DIALOG_TYPE.p2pTradePurchaseDetails),
  );

  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog(DIALOG_TYPE.p2pTradePurchaseDetails);
    }
  };

  if (screenWidth >= BREAKPOINTS.md) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="max-w-[400px] py-5 px-8 bg-base-900"
        >
          <SheetHeaderWithBack
            onClick={() => openDialog(DIALOG_TYPE.p2pTradeDetails)}
            label="Purchasing Details"
          />
          <SheetDescription hidden />
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-fit pb-8">
        <DrawerTitle className="mb-5">Purchasing details</DrawerTitle>
        <DrawerDescription hidden />
        {children}
      </DrawerContent>
    </Drawer>
  );
};

const formSchema = z.object({
  value: z.number(),
});

const PurchaseDetailsDialog = () => {
  const { closeDialog } = useDialog();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 100,
    },
  });

  const submit = () => {
    closeDialog(DIALOG_TYPE.p2pTradePurchaseDetails);
  };

  return (
    <Dialogs>
      <div className="flex flex-col gap-5">
        <PurchaseDetailsCard isMain={false} />
        <div className="flex flex-col gap-2">
          <p className="text-sm text-base-300 flex justify-between">
            Unit Price<span className="body-txtColor-1 font-medium">$34.5</span>
          </p>
          <p className="text-sm text-base-300 flex justify-between">
            Platform Fee<span className="body-txtColor-1 font-medium">$5.00</span>
          </p>
          <p className="text-sm text-base-300 flex justify-between">
            Total<span className="text-secondary-3 font-medium">$39.5</span>
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col gap-2"
          >
            <div className="flex gap-2">
              {values.map((val) => {
                const selected = form.watch('value') === val;
                return (
                  <Button
                    key={val}
                    type="button"
                    variant={selected ? 'filled' : 'filledGray'}
                    className={cn('rounded-full h-[22px] flex-1', {
                      'text-primary-2': !selected,
                    })}
                    size="sm"
                    onClick={() => form.setValue('value', val)}
                  >
                    {val}
                  </Button>
                );
              })}
            </div>
            <FormField
              name="value"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <NumberField
                        onIncrease={() =>
                          form.setValue('value', field.value + 1)
                        }
                        onDecrease={() =>
                          form.setValue('value', field.value - 1)
                        }
                        value={field.value}
                        inputClassName="text-xs font-medium"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-2">
          <Button size="lg" type="submit">
            Confirm Buy
          </Button>
          <ErrorMessage>
            Unable to buy units currently. Please try again later.
          </ErrorMessage>
        </div>
      </div>
    </Dialogs>
  );
};

export default PurchaseDetailsDialog;
