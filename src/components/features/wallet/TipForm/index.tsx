import { STORAGE_KEYS } from 'constants/storage';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'components/shared/Select';
// import TwoFactorAuthBlock from "components/shared/TwoFactorAuthBlock";
import { getCurrencyIconByCode } from 'components/shared/Header/CurrencyDropdown';
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
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import ToggleSwitch from 'components/shared/ToggleSwitch';
import { Button } from 'components/shared/ui/Button';
import Input from 'components/shared/ui/Input';
import { useDialog } from 'helpers/hooks';
import { LocalStorageHelper } from 'helpers/storage';
import { formatCurrencyNumber } from 'helpers/numbers';
import { formatDate } from 'helpers/transactions/formatDate';
import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import type { TipTransaction } from 'store/transactions/types';
import { addTip, createTipThunk } from 'store/transactions/slice';
import { selectUserBalances, selectUserData } from 'store/user/selectors';
import type { UserData } from 'store/user/slice';
import { updateUserBalance } from 'store/user/slice';
import { setWalletCurrencies, setSelectedCurrency } from 'store/wallet/slice';
import { receiveTip } from 'store/users/slice';
import { TRANSACTION_STATUS } from 'store/transactions/constants';
import { selectWalletCurrencies } from 'store/wallet/selectors';
import TipDialog from './TipDialog';
import TipDropdown from './TipDropdown';
import { CLIENT_TYPE } from 'constants/clientType';
import { toast } from 'sonner';

const tipFormSchema = z.object({
  currency: z.string().nonempty('Currency is required!'),
  username: z.string().nonempty('Enter username first!'),
  amount: z.string().refine(
    (val) => {
      const parsed = parseFloat(val.replace(/,/g, ''));
      return !Number.isNaN(parsed) && parsed > 0;
    },
    { message: 'Amount must be a positive number!' },
  ),
});

type CurrencySpan = {
  icon: string;
  name: string;
  contraction?: string;
  balance: number;
};

const TipForm = () => {
  const { openDialog } = useDialog();
  const walletCurrencies = useAppSelector(selectWalletCurrencies);
  const userBalances = useAppSelector(selectUserBalances);
  const user = useAppSelector(selectUserData) as UserData;
  const dispatch = useAppDispatch();

  const initialCurrency: CurrencySpan =
    walletCurrencies && walletCurrencies.length > 0
      ? {
          icon:
            getCurrencyIconByCode(walletCurrencies[0].currencyCode) ||
            '/icons/currencies/etheriumLogo.svg',
          name: walletCurrencies[0].currencyName,
          balance: getFormattedBalance(walletCurrencies[0]),
          contraction: walletCurrencies[0].currencyCode,
        }
      : {
          icon:
            getCurrencyIconByCode('USDT') ||
            '/icons/currencies/etheriumLogo.svg',
          name: 'Tether',
          contraction: 'USDT',
          balance: 3450.35,
        };

  const [isPublicTip, setIsPublicTip] = useState(true);
  const [currency, setCurrency] = useState<CurrencySpan>(initialCurrency);
  const [username, setUsername] = useState<string>('');
  const [isInputError, setIsInputError] = useState<boolean>(false);

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isInputError) {
      setIsInputError(false);
    }

    const trimmedUserName = e.target.value.trim();
    setUsername(trimmedUserName);
    tipForm.setValue('username', trimmedUserName);
  };

  const onSelectCurrency = (currency: CurrencySpan) => {
    setCurrency(currency);
  };

  const tipForm = useForm<z.infer<typeof tipFormSchema>>({
    resolver: zodResolver(tipFormSchema),
    defaultValues: {
      currency: 'Tether (USDT)',
      username: '',
      amount: '',
    },
  });

  const { currency: selectedCurrency, amount: enteredAmount, username: formUsername } = useWatch({
    control: tipForm.control,
  });
  const normalizedUsername = (formUsername || username).trim();
  const isFormValid =
    normalizedUsername.length > 0 &&
    enteredAmount &&
    enteredAmount.trim().length > 0;

  const handleSwitchChange = (checked: boolean) => {
    setIsPublicTip(checked);
  };

  const confirmTipClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const date = new Date();
    const formattedDate = formatDate(date);
    const correctAmount = tipForm.getValues('amount').replace(/,/g, '');

    const tipPayload = {
      accessToken:
        (LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) as string) ?? '',
      amount: +correctAmount,
      clientType: CLIENT_TYPE,
      countryCode: user.countryCode ?? '',
      currencyCode: currency.contraction ?? '',
      receiverUserName: tipForm.getValues('username') || username,
      userId: (LocalStorageHelper.getItem(STORAGE_KEYS.userId) as string) ?? '',
    };

    dispatch(createTipThunk(tipPayload))
      .then((result: any) => {
        if (
          !result.error &&
          result.payload?.statuscode === '200' &&
          result.payload?.result?.status === 200
        ) {
          const tx = result.payload.result.data;

          dispatch(
            updateUserBalance({
              currency: tx.currencyCode,
              amount: -tx.amount,
            }),
          );

          if (walletCurrencies && walletCurrencies.length > 0) {
            const updatedCurrencies = walletCurrencies.map((wc) =>
              wc.currencyCode === tx.currencyCode
                ? { ...wc, totalBalance: wc.totalBalance - tx.amount }
                : wc,
            );
            dispatch(setWalletCurrencies(updatedCurrencies));
            const updatedSelected = updatedCurrencies.find(
              (wc) => wc.currencyCode === tx.currencyCode,
            );
            if (updatedSelected) {
              dispatch(setSelectedCurrency(updatedSelected));
            }
          }

          openDialog(DIALOG_TYPE.tip, {
            amount: `${tx.amount} ${tx.currencyCode}`,
            receiver: tipPayload.receiverUserName,
            sender: user.userName ?? '',
          });

          tipForm.reset({
            currency: 'Tether (USDT)',
            username: '',
            amount: '',
          });
          setUsername('');

          toast.success('Tip sent successfully!', {
            description: `${tx.amount} ${tx.currencyCode} sent to ${username}`,
          });
        } else {
          const errorMessage =
            result.payload?.message ||
            result.payload?.result?.message ||
            'Tip transfer failed';
          toast.error('Tip transfer failed', {
            description: errorMessage,
          });
        }
      })
      .catch((error) => {
        console.error('Tip transfer error:', error);
        toast.error('Tip transfer failed', {
          description: 'An unexpected error occurred. Please try again.',
        });
      });
  };

  return (
    <div className="flex flex-col gap-14 md:gap-6">
      <Form {...tipForm}>
        <form className="flex flex-col">
          <FormField
            name="currency"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Select
                    className="!max-w-none h-10 text-sm leading-[18px] flex gap-1.5 items-center justify-center"
                    dropDownClassName="w-full bg-base-700"
                    chevronClassName="!bg-inherit"
                    withChevron
                    {...field}
                    list={
                      <TipDropdown
                        onSelectCurrency={onSelectCurrency}
                        selectedCurrency={currency}
                        walletCurrencies={walletCurrencies}
                      />
                    }
                    closeOnClick
                  >
                    <div className="ml-1.5 flex w-full items-center justify-between gap-1.5">
                      <img
                        src={currency.icon}
                        alt={currency.name}
                        className="h-4 w-4"
                      />
                      <span className="flex-1">{currency.name}</span>
                      <span className="flex-1 text-right text-xs leading-4">
                        {formatCurrencyNumber(+currency.balance, currency.contraction)}
                      </span>
                    </div>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={tipForm.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative mx-[2px]">
                    <Input
                      placeholder="Enter Username"
                      {...field}
                      value={username}
                      onChange={(e) => {
                        field.onChange(e);
                        handleChangeUsername(e);
                      }}
                      className="w-full pr-10"
                    />
                  </div>
                </FormControl>
                {isInputError && (
                  <FormDescription className="text-red-500 text-[10px]">
                    This user is not found, please check entered Username!
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={tipForm.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  <div className="flex w-full justify-between">
                    <span>Amount</span>
                    <span>{`${field.value ? field.value : '0.00'} ${currency.contraction}`}</span>
                  </div>
                </FormLabel>
                <FormControl>
                  <div className="relative mx-[2px]">
                    <IMaskInput
                      {...field}
                      mask={Number}
                      scale={6}
                      radix="."
                      thousandsSeparator=","
                      padFractionalZeros={false}
                      normalizeZeros
                      mapToRadix={['.']}
                      className="w-full pl-[38px] items-center justify-center flex h-10 rounded-lg bg-base-700 p-3 text-sm placeholder:text-base-500 body-txtColor-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-1"
                      placeholder="Enter Value"
                      onAccept={(value: string) => {
                        field.onChange(value);
                      }}
                    />
                    <img
                      src={currency.icon}
                      alt={currency.name}
                      className="absolute left-3 top-1/3 w-4 h-4 cursor-pointer"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {/* <div className="flex flex-row gap-2 items-center">
            <span className="text-xs leading-[14px] font-normal">
              Public Tip
            </span>
            <ToggleSwitch
              checked={isPublicTip}
              onChange={handleSwitchChange}
              onColor="var(--switch-on)"
              offColor="var(--switch-off)"
              width={38}
              height={22}
              handleDiameter={14}
            />
          </div> */}

          <Button
            size="lg"
            className={`!w-full mt-8 rounded-lg ${isFormValid ? 'bg-primary-1 body-txtColor-2 hover:bg-primary-2' : 'bg-base-500 text-base-300'}`}
            onClick={confirmTipClick}
          >
            Tip
          </Button>
        </form>
      </Form>

      {/* <TwoFactorAuthBlock border /> */}
      <TipDialog />
    </div>
  );
};

export default TipForm;
