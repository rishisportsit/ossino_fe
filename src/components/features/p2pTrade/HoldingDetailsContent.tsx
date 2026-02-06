import { type ChangeEvent, useState } from 'react';
import { type ControllerRenderProps, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import { cn } from 'helpers/ui';
import arrowDown from '/icons/arrowDown.svg?url';
import infoIcon from '/icons/info.svg?url';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from 'components/shared/ui/Form';
import { Button } from 'components/shared/ui/Button';
import { DIALOG_TYPE } from 'store/dialog/slice';
import Tooltip from 'components/shared/ui/Tooltip';
import Icon from 'components/shared/Icon';
import Input from 'components/shared/ui/Input';
import HoldingCard from './HoldingCard';
import MultiColoredSliderInput from './MultiColoredSliderInput';
import SliderInput from './SliderInput';

const formSchema = z.object({
  value: z.number(),
  timer: z.number(),
});

type Field = ControllerRenderProps<
  {
    value: number;
  },
  'value'
>;

const HoldingDetailsContent = () => {
  const { openDialog, closeDialog } = useDialog();
  const { screenWidth } = useBreakpoint();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { value: 1, timer: 1 },
  });
  const [show, setShow] = useState<boolean>(false);

  const submit = () => {
    if (screenWidth >= BREAKPOINTS.md) {
      closeDialog(DIALOG_TYPE.p2pTradeDetails);
    }
    openDialog(DIALOG_TYPE.p2pTradeConfirm);
  };

  const onChange = (field: Field) => (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      field.onChange(0);
    } else {
      let value = parseInt(event.target.value, 10);
      if (value > 100) {
        value = 100;
      }
      if (value < 0) {
        value = 0;
      }
      field.onChange(value);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <HoldingCard isMain={false} />
      <Form {...form}>
        <form
          className="flex flex-col bg-base-800 p-4 rounded-xl"
          onSubmit={form.handleSubmit(submit)}
        >
          <div className="flex items-center gap-1 mb-6">
            <p className="font-bold">Tradometer</p>
            <Tooltip
              content={
                <span className="text-xs leading-none text-base-200">
                  Tooltip text
                </span>
              }
            >
              <button type="button" className="body-txtColor-1">
                <Icon
                  href={infoIcon}
                  id="infoIcon"
                  className="size-4 text-base-400"
                />
              </button>
            </Tooltip>
          </div>
          <FormField
            name="value"
            render={({ field }) => {
              return (
                <FormItem className="mb-1">
                  <FormLabel className="text-sm font-medium flex justify-between mb-4">
                    Cashout Value
                    <span className="font-bold text-primary-1">$7.5</span>
                  </FormLabel>
                  <FormControl>
                    <MultiColoredSliderInput
                      value={field.value}
                      onChange={(val) => {
                        form.setValue('value', val);
                      }}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            name="value"
            render={({ field }) => {
              return (
                <FormItem className="mb-6">
                  <FormLabel
                    className="text-sm font-medium flex items-center gap-1 text-primary-2 justify-end"
                    onClick={() => setShow((prev) => !prev)}
                  >
                    Enter value
                    <Icon
                      id="arrowDownIcon"
                      href={arrowDown}
                      className={cn('h-4 w-4 text-primary-2', {
                        'origin-center rotate-90': show,
                      })}
                    />
                  </FormLabel>
                  {show ? (
                    <FormControl>
                      <Input
                        placeholder="Enter amount"
                        type="number"
                        min={0}
                        max={100}
                        {...field}
                        value={field.value || ''}
                        onChange={onChange(field)}
                      />
                    </FormControl>
                  ) : null}
                </FormItem>
              );
            }}
          />
          {form.watch('value') > 33 ? (
            <FormField
              name="timer"
              render={({ field }) => {
                return (
                  <FormItem className="mb-5">
                    <FormLabel className="flex text-sm font-medium mb-4">
                      List Timer (min)
                    </FormLabel>
                    <FormControl>
                      <SliderInput
                        min={0}
                        max={80}
                        value={field.value}
                        onChange={(val) => {
                          form.setValue('timer', val);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          ) : (
            <div className="bg-base-700 rounded-xl p-3 mb-5">
              <p className="text-xs">
                Choose a larger amount than&nbsp;
                <span className="text-secondary-1">$7.5</span>&nbsp;to list your
                trades
              </p>
            </div>
          )}
          <Button type="submit" className="md:w-60">
            {form.watch('value') > 33 ? 'List Trade' : 'Instant Cashout'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default HoldingDetailsContent;
