import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'components/shared/Select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/shared/ui/Form';
import Input from 'components/shared/ui/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CopyButton from 'components/shared/CopyButton';
import { formatCurrencyNumber } from 'helpers/numbers';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'store/index';
import {
  selectWalletCurrencies,
  selectWalletAddresses,
} from 'store/wallet/selectors';
import { getWalletAddressList } from 'store/wallet/slice';
import type { WalletAddress } from 'api/wallet/wallet.types';
import DepositDropdown from './DepositDropdown';
import QrBlock from './QrBlock';
import { getCurrencyIconByCode } from 'components/shared/Header/CurrencyDropdown';
import { getFormattedBalance } from 'helpers/currencyHelpers';

export type CurrencySpan = {
  icon: React.ReactNode;
  name: string;
  code: string;
  contraction?: string;
  balance: number;
  currencyType?: string;
};

const depositFormSchema = z.object({
  currency: z.string().nonempty('Currency is required!'),
  network: z.string().optional(),
  walletAddress: z.string().nonempty('Wallet address is required!'),
});

const DepositForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const walletCurrencies = useAppSelector(selectWalletCurrencies);
  const walletAddresses = useAppSelector(selectWalletAddresses);

  const initialCurrency: CurrencySpan =
    walletCurrencies && walletCurrencies.length > 0
      ? {
        icon: (
          <img
            src={
              getCurrencyIconByCode(walletCurrencies[0].currencyCode) ||
              '/icons/currencies/etheriumLogo.svg'
            }
            alt={walletCurrencies[0].currencyCode}
            className="h-4 w-4"
          />
        ),
        name: walletCurrencies[0].currencyName,
        code: walletCurrencies[0].currencyCode,
        balance: getFormattedBalance(walletCurrencies[0]),
        currencyType: walletCurrencies[0].currencyType,
      }
      : {
        icon: (
          <img
            src={
              getCurrencyIconByCode('USDT') ||
              '/icons/currencies/etheriumLogo.svg'
            }
            alt="USDT"
            className="h-4 w-4"
          />
        ),
        name: 'Tether',
        code: 'USDT',
        balance: 3450.35,
      };

  const [currency, setCurrency] = useState<CurrencySpan>(initialCurrency);

  const shouldShowNetworkField = currency.code !== 'BTC_TEST';

  const onSelectCurrency = (selected: CurrencySpan) => {
    setCurrency(selected);
  };

  const depositForm = useForm<z.infer<typeof depositFormSchema>>({
    resolver: zodResolver(depositFormSchema),
    defaultValues: {
      currency: initialCurrency.name,
      network: 'ERC20',
      walletAddress: '',
    },
  });

  useEffect(() => {
    if (currency.code) {
      dispatch(getWalletAddressList({ currencyCode: currency.code }));
    }
  }, [currency, dispatch]);

  useEffect(() => {
    if (walletAddresses && walletAddresses.length > 0) {
      const selectedAddress =
        walletAddresses.find(
          (address: WalletAddress) => address.addressFormat === 'SEGWIT',
        ) ||
        walletAddresses.find(
          (address: WalletAddress) => address.addressFormat === 'DEFAULT',
        ) ||
        walletAddresses[0];

      depositForm.setValue('walletAddress', selectedAddress.address);
    } else {
      depositForm.setValue('walletAddress', 'No address available');
    }
  }, [walletAddresses, depositForm]);

  const watchedWalletAddress = depositForm.watch('walletAddress');

  return (
    <div className="flex flex-col gap-4 md:gap-9">
      <Form {...depositForm}>
        <form>
          <FormField
            name="currency"
            render={({ field }) => (
              <FormItem className="mb-2 sm:mb-4">
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Select
                    className="!max-w-full h-10 text-sm leading-[18px] flex gap-1.5 items-center justify-center"
                    dropDownClassName="w-full bg-base-700"
                    chevronClassName="!bg-inherit"
                    withChevron
                    {...field}
                    list={
                      <DepositDropdown
                        onSelectCurrency={onSelectCurrency}
                        selectedCurrency={currency}
                        walletCurrencies={walletCurrencies}
                      />
                    }
                    closeOnClick
                  >
                    <div className="ml-1.5 flex w-full items-center justify-between gap-1.5">
                      <span className="h-4 w-4">{currency.icon}</span>
                      <span className="flex-1">{currency.name}</span>
                      <span className="flex-1 text-right text-xs leading-4">
                        {formatCurrencyNumber(+(currency.balance ?? 0), currency.code, currency.currencyType)}
                      </span>
                    </div>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {shouldShowNetworkField && (
            <FormField
              name="network"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Network</FormLabel>
                  <FormControl>
                    <Select
                      className="!max-w-none pl-3 h-10 text-sm leading-[18px] flex gap-1.5 items-center justify-center"
                      dropDownClassName="w-full bg-base-700"
                      chevronClassName="!bg-inherit"
                      withChevron
                      {...field}
                    >
                      <span>ERC20</span>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={depositForm.control}
            name="walletAddress"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>{currency.name} Address</FormLabel>
                <FormControl>
                  <div className="relative mx-[2px]">
                    <Input
                      readOnly
                      placeholder="Wallet Address"
                      {...field}
                      className="w-full pr-10"
                    />
                    <CopyButton valueToCopy={watchedWalletAddress} isAbsolute />
                  </div>
                </FormControl>
                <FormDescription className="text-base-400 text-xs leading-4">
                  {shouldShowNetworkField
                    ? `Your deposit must be sent on the ${currency.name} network to be processed.`
                    : `Your deposit must be sent to this ${currency.name} address to be processed.`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <QrBlock walletNumber={watchedWalletAddress} />
    </div>
  );
};

export default DepositForm;
