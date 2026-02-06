import { zodResolver } from '@hookform/resolvers/zod';
import { type ChangeEvent, useEffect } from 'react';
import { useForm, type ControllerRenderProps } from 'react-hook-form';
import { z } from 'zod';

import { Button } from 'components/shared/ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from 'components/shared/ui/Form';
import Input from 'components/shared/ui/Input';
import { useDialog } from 'helpers/hooks';
import { cn } from 'helpers/ui';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import { selectLoyaltyDetails } from 'store/loyaltyDetails/selectors';
import { LEVEL_CONFIG } from 'components/pages/OverviewPage';

const getUserLevelConfig = (userLevel: string) => {
  return (
    LEVEL_CONFIG.find((config) => config.level === userLevel) || LEVEL_CONFIG[0]
  );
};

const calculateCashback = (coins: number, percentage: number): number => {
  return (coins * percentage) / 100;
};

const BurnCoins = () => {
  const { openDialog } = useDialog();
  const loyaltyDetails = useAppSelector(selectLoyaltyDetails);

  const currentUserLevel = loyaltyDetails?.level;
  const currentLevelConfig = currentUserLevel ? getUserLevelConfig(currentUserLevel) : null;
  const availableCoins = loyaltyDetails?.coins || 0;

  const fallbackConfig = {
    minBurnCoins: 1,
    maxBurnCoins: null,
    realCashPercentage: 5,
  };
  const config = currentLevelConfig || fallbackConfig;

  const createFormSchema = (
    minCoins: number,
    maxCoins: number | null,
    userBalance: number,
  ) => {
    let schema = z
      .coerce.number({ required_error: 'Amount is required' })
      .gte(minCoins, `Please enter value greater or equal ${minCoins} coins`)
      .lte(userBalance, 'Insufficient coins');

    if (maxCoins) {
      schema = schema.lte(
        maxCoins,
        `Please enter value less or equal ${maxCoins} coins`,
      );
    }

    return z.object({
      coins: schema
        .nullable()
        .refine((value) => value !== null, {
          message: 'Please enter value',
        }),
    });
  };

  const formSchema = createFormSchema(
    config.minBurnCoins,
    config.maxBurnCoins,
    availableCoins,
  );

  type SchemaIn = z.input<typeof formSchema>;
  type SchemaOut = z.output<typeof formSchema>;
  type Field = ControllerRenderProps<
    {
      coins: number | null;
    },
    'coins'
  >;

  const form = useForm<SchemaIn, unknown, SchemaOut>({
    resolver: zodResolver(formSchema),
    defaultValues: { coins: config.minBurnCoins },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (currentLevelConfig) {
      form.reset({ coins: currentLevelConfig.minBurnCoins });
    }
  }, [currentLevelConfig, form]);

  const watchedCoins = form.watch('coins');
  const expectedCashback = watchedCoins && currentLevelConfig
    ? calculateCashback(watchedCoins, config.realCashPercentage)
    : 0;

  const onChange = (field: Field) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '' || Number.isNaN(Number(value))) {
      field.onChange(null);
    } else {
      field.onChange(Number(value));
    }
  };

  const onSubmit = (values: SchemaOut) => {
    if (!currentLevelConfig) return;
    openDialog(DIALOG_TYPE.burnCoins, {
      value: values.coins,
      expectedCashback: calculateCashback(
        values.coins,
        config.realCashPercentage,
      ),
      cashPercentage: config.realCashPercentage,
    });
  };

  // Conditionally render UI after hooks are called
  if (!loyaltyDetails) {
    return (
      <div className="p-4 bg-base-800 rounded-xl xl:p-5">
        <p className="body-txtColor-1 font-bold xl:text-lg mb-2">Burn Coins into Cashback</p>
        <p className="text-xs text-base-200 mb-4">Loading your loyalty data...</p>
      </div>
    );
  }

  if (!currentLevelConfig) {
    return (
      <div className="p-4 bg-base-800 rounded-xl xl:p-5">
        <p className="body-txtColor-1 font-bold xl:text-lg mb-2">Burn Coins into Cashback</p>
        <p className="text-xs text-status-error-100 mb-4">Unable to determine your level configuration.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-base-800 rounded-xl xl:p-5">
      <div className="flex justify-between items-center mb-2">
        <p className="body-txtColor-1 font-bold xl:text-lg">
          Burn Coins into Cashback
        </p>
      </div>
      <p className="text-xs text-base-200 mb-4 max-w-[300px]">
        You will get Instant Cashback credited to your wallet immediately.
      </p>

      {expectedCashback > 0 && (
        <div className="mb-4 p-3 bg-base-700 rounded-lg">
          <p className="text-sm text-base-200">Expected Cashback:</p>
          <p className="text-lg font-bold text-primary-1">
            ₮{expectedCashback.toFixed(4)}
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="coins"
            render={({ field, fieldState }) => (
              <FormItem className="mb-4">
                <FormDescription className="text-primary-1">
                  1 coin = 	₮
                  {((config.realCashPercentage / 100) * 1).toFixed(
                    4,
                  )}{' '}
                  | {config.realCashPercentage}% cashback rate
                </FormDescription>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter amount"
                      type="number"
                      {...field}
                      value={field.value || ''}
                      onChange={onChange(field)}
                      className={cn('pl-10', {
                        'ring-1 ring-status-error-100 text-status-error-100':
                          fieldState.error,
                      })}
                    />
                    <img
                      src="/images/redemptions/chip.png"
                      className="absolute top-2.5 left-2 w-5"
                      alt=""
                    />
                  </div>
                </FormControl>
                <FormMessage className="font-normal" />
                <FormDescription className="text-base-400">
                  min {config.minBurnCoins} coins - max{' '}
                  {config.maxBurnCoins || '∞'} coins | Available:{' '}
                  {availableCoins} coins
                </FormDescription>
              </FormItem>
            )}
          />
          <Button variant="filled" className="w-full">
            Burn Now
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BurnCoins;
