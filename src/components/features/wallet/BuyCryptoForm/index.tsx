import { zodResolver } from "@hookform/resolvers/zod";
import Select from "components/shared/Select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/shared/ui/Form";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import Icon from "components/shared/Icon";
// import TwoFactorAuthBlock from "components/shared/TwoFactorAuthBlock";
import { Button } from "components/shared/ui/Button";
import { useDialog } from "helpers/hooks";
import { formatNumber } from "helpers/numbers";
import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import { DIALOG_TYPE } from "store/dialog/slice";
import BuyCryptoDropdown from "./BuyCryptoDropdown";
import dollarIcon from '/icons/currencies/dollarUsd.svg?url';
import tetherLogo from '/icons/currencies/tetherLogo.svg?url';


type BuyCurrencySpan = {
  icon: React.ReactNode;
  contraction?: string;
  name: string;
}

const buyCryptFormSchema = z.object({
  buyAmount: z
    .string()
    .refine((val) => {
      const parsed = parseFloat(val.replace(/,/g, ''));
      return !Number.isNaN(parsed) && parsed > 0;
    }, { message: "Amount must be a positive number!" }),
  buyCurrency: z.string().nonempty("BuyCurrency is required!"),
  payAmount:z
    .string()
    .refine((val) => {
      const parsed = parseFloat(val.replace(/,/g, ''));
      return !Number.isNaN(parsed) && parsed > 0;
    }, { message: "Amount must be a positive number!" }),
  payCurrency: z.string().nonempty("PayCurrency is required!"),
  paymentMethod: z.string().nonempty("Choose a payment method.")
})

const BuyCryptoForm = () => {
  const [currency, setCurrency] = useState<BuyCurrencySpan>({
    icon: <Icon id="tetherIcon" href={tetherLogo} className="h-4 w-4" />,
    contraction: 'USDT',
    name: 'Tether'
  });

  const { closeDialog } = useDialog();

  const buyCryptoForm = useForm<z.infer<typeof buyCryptFormSchema>>({
    resolver: zodResolver(buyCryptFormSchema),
    defaultValues: {
      buyAmount: formatNumber(40.91, 6),
      buyCurrency: 'USDT',
      payAmount: formatNumber(40.91, 6),
      payCurrency: 'USD',
      paymentMethod: 'Buy with MoonPay'
    }
  });

  const { 
    buyCurrency: selectedBuyCurrency, 
    payCurrency: selectedPayCurrency, 
    buyAmount: enteredBuyAmount, 
    payAmount: enteredPayAmount, 
    paymentMethod: selectedPaymentMethod 
  } = useWatch({ control: buyCryptoForm.control, });
  
  const isAmountsValid = !Number.isNaN(parseFloat(enteredBuyAmount ?? '')) 
    && !Number.isNaN(parseFloat(enteredPayAmount ?? '')) 
    && parseFloat(enteredBuyAmount?.replace(/,/g, '') ?? '') > 0
    && parseFloat(enteredPayAmount?.replace(/,/g, '') ?? '') > 0;
  const isFormValid = isAmountsValid && selectedBuyCurrency && selectedPayCurrency && selectedPaymentMethod;

  const onSelectCurrency = (currency: BuyCurrencySpan) => {
    setCurrency(currency);
  }

  const handleBuyClick = (event: React.MouseEvent) => {
    event.preventDefault();
    closeDialog(DIALOG_TYPE.wallet);
    // here will be logic from cryptoServices (eg. MoonPay) 
  }

  return (
    <div className="flex flex-col gap-14 md:gap-6">
      <Form  {...buyCryptoForm}>
        <form className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 px-0 w-full justify-center items-end">
            <FormField
              name="buyAmount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Buy {currency.name}</FormLabel>
                  <FormControl>
                    <div className="relative mx-[2px]">
                      <IMaskInput
                        {...field}
                        mask={Number}
                        scale={6}
                        radix='.'
                        thousandsSeparator=","
                        padFractionalZeros={false}
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
                  </FormControl>
                </FormItem>
              )} />
            
            <FormField
              name="buyCurrency"
              render={({ field }) => (
                <FormItem className="w-fit md:w-full">
                  <FormControl>
                    <Select
                      className="!max-w-none h-10 text-sm leading-[18px] flex gap-1.5 items-center justify-center"
                      dropDownClassName="w-full bg-base-700"
                      chevronClassName="!bg-inherit"
                      withChevron
                      list={<BuyCryptoDropdown onSelectCurrency={onSelectCurrency} selectedCurrency={currency} />}
                      {...field}
                      closeOnClick
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <span className="h-4 w-4">{currency.icon}</span>
                        <div className="flex flex-row justify-between">
                          <span>{currency.contraction}</span>
                        </div>
                      </span>
                    </Select>

                  </FormControl>
                  <FormMessage />
                </FormItem>

              )} />
          </div>

          <div className="flex flex-row gap-2 justify-center items-end">
            <FormField
              name="payAmount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Pay with USD</FormLabel>
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
                        mapToRadix={["."]}
                        className="w-full pl-[38px] items-center justify-center flex h-10 rounded-lg bg-base-700 p-3 text-sm placeholder:text-base-500 body-txtColor-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-1"
                        placeholder="Enter Value"
                        onAccept={(value: string) => {
                          field.onChange(value);
                        }}
                      />
                      <Icon
                        id="dollarIcon"
                        href={dollarIcon}
                        className="absolute left-1.5 top-1/3 w-4 h-4 cursor-pointer text-base-500 hover:text-base-700" />
                    </div>
                  </FormControl>
                </FormItem>
              )} />
            
            <FormField
              name="buyCurrency"
              render={({ field }) => (
                <FormItem className="w-fit md:w-full">
                  <FormControl>
                    <Select
                      className="!max-w-none h-10 text-sm leading-[18px] flex gap-1.5 items-center justify-center px-3 sm:px-auto"
                      dropDownClassName="w-full bg-base-700"
                      chevronClassName="!bg-inherit"
                      withChevron
                      {...field}
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <Icon id="dollarIcon" href={dollarIcon} className=" h-4 w-4" />
                        <div className="flex flex-row justify-between">
                          <span>USD</span>
                        </div>
                      </span>
                    </Select>

                  </FormControl>
                  <FormMessage />
                </FormItem>

              )} />
          </div>

          <div>
            <FormField
              name="currency"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Select payment methods</FormLabel>
                  <FormControl>
                    <Select
                      className="!max-w-none h-10 text-sm leading-[18px] flex gap-1.5 items-center justify-center"
                      dropDownClassName="w-full bg-base-700"
                      chevronClassName="!bg-inherit"
                      withChevron
                      {...field}
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <span className="ml-1.5">Buy with MoonPay</span>
                      </span>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <Button
              disabled={!isFormValid} 
              size="lg" 
              className="!w-full mt-4 rounded-lg" 
              onClick={handleBuyClick}
            >
          Buy Crypto
            </Button>
            <FormDescription className="hidden lg:block mt-4 text-center text-xs leading-4">All crypto purchases are processed externally. Finalised quotes may vary between <br/> providers.</FormDescription>
            <FormDescription className="hidden md:block lg:hidden mt-4 text-center text-xs leading-4">All crypto purchases are processed externally. Finalised <br /> quotes may vary between providers.</FormDescription>
          </div>
        </form>
      </Form>

      {/* <TwoFactorAuthBlock border /> */}
    </div>
  )
}

export default BuyCryptoForm