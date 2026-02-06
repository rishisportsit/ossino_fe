import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/index';
import { useEffect } from 'react';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/shared/ui/Form';
import { Button } from 'components/shared/ui/Button';
import Input from 'components/shared/ui/Input';
import { verifyEmail } from 'store/user/slice';
import { selectPlayerDetails } from 'store/settings/selectors';

const schema = z.object({ email: z.string().email() });

const EmailVerificationForm = () => {
  const dispatch = useAppDispatch();

  const account = useAppSelector((state) => state.user.data);
  const playerDetails = useAppSelector(selectPlayerDetails);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: account?.email || '' },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const result = await dispatch(verifyEmail(values.email));

    if (verifyEmail.fulfilled.match(result)) {
      form.reset();
    }
  }

  const { isSubmitting } = form.formState;
  
  const isEmailVerified = playerDetails?.userOtherInfo?.emailVerified ?? account?.emailVerified ?? false;

  useEffect(() => {
    if (account?.email) {
      form.setValue('email', account.email);
    }
  }, [account?.email, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="rishi**@negroup.com"
                  {...field}
                  disabled={isEmailVerified}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isEmailVerified && (
          <Button
            type="submit"
            size="default"
            disabled={isSubmitting}
            className="md:max-w-[294px] bg-primary-1"
          >
            Send verification
          </Button>
        )}
      </form>
    </Form>
  );
};

export default EmailVerificationForm;
