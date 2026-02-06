import { zodResolver } from '@hookform/resolvers/zod';
import PasswordChecks from 'components/shared/PasswordChecks';
import PasswordInput from 'components/shared/PasswordInput';
import { Button } from 'components/shared/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/shared/ui/Form';
import Loader from 'components/shared/ui/Loader';
import { passwordSchema } from 'helpers/common';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'store/index';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
import { changePassword, resetPasswordWithToken } from 'store/user/slice';
import { z } from 'zod';

const formSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

interface NewPasswordFormProps {
  token?: string;
}

const NewPasswordForm = ({ token }: NewPasswordFormProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function submitHandler(data: z.infer<typeof formSchema>) {
    if (token) {
      await dispatch(
        resetPasswordWithToken({
          token,
          newPassword: data.confirmPassword,
        }),
      );
    } else {
      // Otherwise, use the regular change password flow (for logged-in users)
      const accessToken = LocalStorageHelper.getItem(
        STORAGE_KEYS.accessToken,
      ) as string;
      await dispatch(
        changePassword({
          accessToken,
          channelType: 'mobile',
          newPassword: data.confirmPassword,
          oldPassword: data.password,
        }),
      );
    }
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mb-5">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordChecks name="confirmPassword" />
        </div>
        <Button size="lg" disabled={isSubmitting || !isValid}>
          {isSubmitting ? (
            <Loader className="w-5 h-5" />
          ) : (
            'Create New Password'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NewPasswordForm;
