import { zodResolver } from '@hookform/resolvers/zod';
import Icon from 'components/shared/Icon';
import Select from 'components/shared/Select';
import { getFormattedBalance } from 'helpers/currencyHelpers';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/shared/ui/Form';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { z } from 'zod';

import { Button } from 'components/shared/ui/Button';
import Input from 'components/shared/ui/Input';
import { useDialog } from 'helpers/hooks';
import { formatCurrencyNumber } from 'helpers/numbers';
import React, { useState } from 'react';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getAccountHistory } from 'store/transactions/slice';
import { selectUserData } from 'store/user/selectors';
import { type UserData } from 'store/user/slice';
import {
  selectWalletCurrencies,
  selectWalletState,
} from 'store/wallet/selectors';
// import TwoFactorAuthBlock from "../../../shared/TwoFactorAuthBlock";
import { getCurrencyIconByCode } from 'components/shared/Header/CurrencyDropdown';
import WithdrawDialog from './WithdrawDialog';
import WithdawDropdown from './WithdrawDropDown';
import tetherLogo from '/icons/currencies/tetherLogo.svg?url';
import infoIcon from '/icons/infoWhite.svg?url';
import refreshIcon from '/icons/refresh.svg?url';
import securitySafeIcon from '/icons/security-safe.svg?url';
import {
  getWalletCurrencies,
  setSelectedCurrency,
  withdraw,
} from 'store/wallet/slice';
import { CLIENT_TYPE } from 'constants/clientType';
import Loader from 'components/shared/ui/Loader';

const withdrawFormSchema = z.object({
  currency: z.string().nonempty('Currency is required!'),
  network: z.string().nonempty('Network is required!'),
  walletAddress: z.string().nonempty('Wallet address is required!'),
  amount: z.string().refine(
    (val) => {
      const parsed = parseFloat(val.replace(/,/g, ''));
      return !Number.isNaN(parsed) && parsed > 0;
    },
    { message: 'Amount must be a positive number!' },
  ),
});

type CurrencySpan = {
  icon: React.ReactNode;
  name: string;
  contraction?: string;
  balance: number;
  multiplier: null | number;
  currencyType?: string;
};

const WithdrawForm = () => {
  const { openDialog } = useDialog();
  const { selectedCurrency: selectedHeaderCurrency } =
    useAppSelector(selectWalletState);
  const walletCurrencies = useAppSelector(selectWalletCurrencies);

  const withdrawForm = useForm<z.infer<typeof withdrawFormSchema>>({
    resolver: zodResolver(withdrawFormSchema),
    defaultValues: {
      currency: 'Tether',
      network: 'ERC20',
      walletAddress: '',
      amount: '',
    },
  });

  const initialCurrency: CurrencySpan =
    walletCurrencies && walletCurrencies.length > 0
      ? {
        icon: <img src={getCurrencyIconByCode(walletCurrencies[0].currencyCode) || '/icons/currencies/etheriumLogo.svg'} alt={walletCurrencies[0].currencyCode} className="h-4 w-4" />,
        name: walletCurrencies[0].currencyName,
        balance: getFormattedBalance(walletCurrencies[0]),
        contraction: walletCurrencies[0].currencyCode,
        multiplier: walletCurrencies[0].multiplier,
        currencyType: walletCurrencies[0].currencyType,
      }
      : {
        icon: <img src={getCurrencyIconByCode('USDT') || '/icons/currencies/etheriumLogo.svg'} alt="USDT" className="h-4 w-4" />,
        name: 'Tether',
        balance: 3450.35,
        contraction: 'USDT',
        multiplier: null,
      };

  const [currency, setCurrency] = useState<CurrencySpan>(initialCurrency);
  const [loading, setLoading] = useState<boolean>(false);

  const [walletAddress, setWalletAddress] = useState<string>('');
  const user = useAppSelector(selectUserData) as UserData;
  const dispatch = useAppDispatch();

  const {
    currency: selectedCurrency,
    network,
    walletAddress: address,
    amount,
  } = useWatch({ control: withdrawForm.control });
  const isAmountValid =
    !Number.isNaN(parseFloat(amount ?? '')) && parseFloat(amount ?? '') > 0;
  const isFormValid =
    selectedCurrency && network && address && isAmountValid && amount;
  const shouldShowNetworkField = currency.contraction !== 'BTC_TEST';
  const isWithdrawPossible =
    isFormValid &&
    user &&
    currency.balance >= parseFloat(amount.replace(/,/g, ''));

  const onSelectCurrency = (currency: CurrencySpan) => {
    setCurrency(currency);
  };

  const confirmWithdrawClick = async (event: React.MouseEvent) => {
    try {
      event.preventDefault();
      setLoading(true);

      const correctAmount = +withdrawForm.getValues('amount').replace(/,/g, '');
      const address = withdrawForm.getValues('walletAddress');
      const network = withdrawForm.getValues('network');

      const newAmount =
        currency.multiplier === null
          ? correctAmount
          : correctAmount * currency.multiplier;
      await dispatch(
        withdraw({
          userId: user.id,
          amount: newAmount,
          currencyCode: currency.contraction || '',
          oneTimeAddress: address,
          networkType: network,
        }),
      ).unwrap();

      setCurrency((prev) => ({
        ...prev,
        balance: prev.balance - correctAmount,
      }));
      if (
        selectedHeaderCurrency &&
        currency.contraction === selectedHeaderCurrency.currencyCode
      ) {
        dispatch(
          setSelectedCurrency({
            ...selectedHeaderCurrency,
            totalBalance: selectedHeaderCurrency.totalBalance - correctAmount,
          }),
        );
      }
      dispatch(
        getAccountHistory({
          clientType: CLIENT_TYPE,
          transactionType: 'WITHDRAW',
        }),
      );
      dispatch(getWalletCurrencies({}));
      openDialog(DIALOG_TYPE.withdrawn);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-9 md:gap-6">
      <Form {...withdrawForm}>
        <form>
          <FormField
            name="currency"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Select
                    className="!max-w-none h-10 text-sm leading-[18px] flex gap-1.5 items-center justify-center"
                    dropDownClassName="w-full bg-base-700"
                    chevronClassName="!bg-inherit"
                    withChevron
                    {...field}
                    list={
                      <WithdawDropdown
                        onSelectCurrency={onSelectCurrency}
                        selectedCurrency={currency}
                        walletCurrencies={walletCurrencies}
                      />
                    }
                    closeOnClick
                  >
                    <div className="ml-1.5 flex w-full items-center justify-between gap-1.5">
                      <span className="h-4 w-4">{currency.icon}</span>
                      <span className="flexs-1">{currency.name}</span>
                      <span className="flex-1 text-right text-xs leading-4">
                        {formatCurrencyNumber(+currency.balance, currency.contraction, currency.currencyType)}
                      </span>
                    </div>
                  </Select>
                </FormControl>
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
            control={withdrawForm.control}
            name="walletAddress"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  {`${currency.name} (${currency.contraction})`} Address
                </FormLabel>
                <FormControl>
                  <div className="relative mx-[2px]">
                    <Input
                      placeholder="Enter Value"
                      {...field}
                      value={walletAddress}
                      onChange={(e) => {
                        field.onChange(e);
                        setWalletAddress(e.target.value);
                      }}
                      className="max-w-full pr-10 mx-0"
                    />
                    <div onClick={() => setWalletAddress('')}>
                      <Icon
                        id="refreshIcon"
                        href={refreshIcon}
                        className="absolute right-3 top-1/3 w-4 h-4 cursor-pointer fill-1"
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={withdrawForm.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  <div className="flex w-full justify-between">
                    <span>Amount</span>
                    <span>{`${field.value ? formatCurrencyNumber(+field.value.replace(/,/g, ''), currency.currencyCode) : '0.00'} ${currency.contraction}`}</span>
                  </div>
                </FormLabel>
                <FormControl>
                  <Controller
                    name="amount"
                    control={withdrawForm.control}
                    render={({ field }) => (
                      <div className="relative mx-[2px]">
                        <IMaskInput
                          {...field}
                          mask={Number}
                          scale={6}
                          radix="."
                          thousandsSeparator=","
                          padFractionalZeros={false}
                          mapToRadix={['.', ',']}
                          normalizeZeros
                          className="w-full pl-[38px] items-center justify-center flex h-10 rounded-lg bg-base-700 p-3 text-sm placeholder:text-base-500 body-txtColor-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-1"
                          placeholder="Enter Value"
                          onAccept={(value: string) => {
                            field.onChange(value);
                          }}
                        />

                        <span className="absolute left-3 top-1/3 w-4 h-4 cursor-pointer text-base-500 hover:text-base-700">
                          {currency.icon}
                        </span>
                      </div>
                    )}
                  />
                </FormControl>
                <FormDescription>
                  <div className="mt-1 flex flex-col gap-1 justify-center">
                    <div className="flex flex-row gap-1 items-center">
                      <Icon
                        id="infoIconWhite"
                        href={infoIcon}
                        className="w-4 h-4 fill-1"
                      />
                      <span className="font-medium body-txtColor-1 text-10px leading-[13px]">
                        Withdrawal Fee: 1.00000000 USDT
                      </span>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                      <Icon
                        id="securitySafeIcon"
                        href={securitySafeIcon}
                        className="w-4 h-4 fill-1"
                      />
                      <span className="font-medium body-txtColor-1 text-10px leading-[13px]">
                        {`Your withdrawal will be processed on ${currency.name}${currency.contraction ? ` (${currency.contraction})` : ''}.`}
                      </span>
                    </div>
                  </div>
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            disabled={!isWithdrawPossible || loading}
            size="lg"
            className="!w-full mt-8 md:mt-2 rounded-lg"
            onClick={confirmWithdrawClick}
          >
            {loading ? <Loader /> : 'Withdraw'}
          </Button>
        </form>
      </Form>
      {/* <TwoFactorAuthBlock border /> */}
      <WithdrawDialog
        amount={withdrawForm.getValues('amount').replace(/,/g, '')}
        currency={currency.contraction ?? ''}
      />
    </div>
  );
};

export default WithdrawForm;
