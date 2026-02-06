import { zodResolver } from '@hookform/resolvers/zod';
import PasswordChecks from 'components/shared/PasswordChecks';
import PasswordInput from 'components/shared/PasswordInput';
import { Button } from 'components/shared/ui/Button';
import { Checkbox } from 'components/shared/ui/Checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/shared/ui/Form';
import Input from 'components/shared/ui/Input';
import { passwordSchema } from 'helpers/common';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/index';
import { register } from 'store/user/slice';
import { z } from 'zod';
import Loader from 'components/shared/ui/Loader';
import BonusDialog from '../BonusDialog';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { selectSecurityPrivacyLinks } from 'store/footer/selectors';
import { useEffect } from 'react';
import { getFooterLinks } from 'store/footer/slice';
import { LocalStorageHelper } from 'helpers/storage';

const formSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email' }),
  referalCode: z.string(),
  username: z
    .string({ required_error: 'Username is required' })
    .min(2, { message: 'Username must be at least 2 characters' }),
  password: passwordSchema,
  termsAndConditions: z.boolean().refine((value) => value === true, {
    message: 'You must agree to the terms and policy',
  }),
});

type RegisterFormProps = {
  referalCode?: string;
};

const RegisterForm = ({ referalCode }: RegisterFormProps) => {
  const dispatch = useAppDispatch();
  const { openDialog } = useDialog();
  const securityPrivacyLinks = useAppSelector(selectSecurityPrivacyLinks);

  const vipAffiliateCode = LocalStorageHelper.getItem('vip_affiliate_code') as
    | string
    | null;
  const isVipAffiliate = Boolean(vipAffiliateCode);

  useEffect(() => {
    dispatch(getFooterLinks());
  }, [dispatch]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      referalCode: referalCode || '',
      termsAndConditions: false,
      username: '',
      password: '',
      email: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const registrationData = {
      ...data,
      ...(vipAffiliateCode && { affiliateBtag: vipAffiliateCode }),
    };

    try {
      await dispatch(register(registrationData)).unwrap();
      if (vipAffiliateCode) {
        LocalStorageHelper.removeItem('vip_affiliate_code');
      }
    } catch (error) {
      throw error;
    }
  }

  const handleLinkClick = (e: React.MouseEvent, linkName: string) => {
    e.preventDefault();

    const link = securityPrivacyLinks.find((l) =>
      l.link_name?.toLowerCase().includes(linkName?.toLowerCase()),
    );

    if (link) {
      if (link.is_content && link.is_content.trim() !== '') {
        openDialog(DIALOG_TYPE.footerContent, {
          title: link.link_name,
          content: link.is_content,
          link: link.menu_link,
          isNewWindow: link.is_newwindow === 'Yes',
        });
      } else if (link.menu_link) {
        if (link.is_newwindow === 'Yes') {
          window.open(link.menu_link, '_blank', 'noopener noreferrer');
        } else {
          window.location.href = link.menu_link;
        }
      }
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <div className="mb-5">
        <BonusDialog />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Email"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Username"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mb-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter Password"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordChecks name="password" />
        </div>
        {!isVipAffiliate && (
          <FormField
            control={form.control}
            name="referalCode"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Referral Code {referalCode ? '' : '(optional)'}</FormLabel>
                <FormControl>
                  {referalCode ? (
                    <div className="px-3 h-10 rounded-lg border border-base-600 flex justify-between items-center bg-base-800 overflow-x-auto">
                      <span className="text-base-100 text-sm truncate whitespace-nowrap">
                        {field.value}
                      </span>
                    </div>
                  ) : (
                    <Input
                      placeholder="Enter Referral Code"
                      autoComplete="off"
                      {...field}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="termsAndConditions"
          render={({ field }) => (
            <FormItem className="mb-3">
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={Boolean(field.value)}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="max-w-[220px]">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={(e) => handleLinkClick(e, 'terms')}
                    className="font-medium underline hover:body-txtColor-1 transition-colors cursor-pointer"
                  >
                    Terms & Condition
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={(e) => handleLinkClick(e, 'privacy')}
                    className="font-medium underline hover:body-txtColor-1 transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting || !isValid} size="lg">
          {isSubmitting ? <Loader /> : 'Register'}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
