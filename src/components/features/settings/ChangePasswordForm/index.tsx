import { zodResolver } from '@hookform/resolvers/zod';
import PasswordChecks from 'components/shared/PasswordChecks';
import PasswordInput from 'components/shared/PasswordInput';
// import { Button } from 'components/shared/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/shared/ui/Form';
import { passwordSchema } from 'helpers/common';
import { useDialog } from 'helpers/hooks';
import { useForm } from 'react-hook-form';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppDispatch } from 'store/index';
import { refreshUserData } from 'store/user/slice';
import { z } from 'zod';
import { AuthApi } from 'api/auth/auth.api';
import { toast } from 'sonner';

const formSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine(
    ({ newPassword, confirmNewPassword }) => {
      return newPassword === confirmNewPassword;
    },
    {
      message: "Passwords don't match",
      path: ['confirmNewPassword'],
    },
  );

type FormSchema = z.infer<typeof formSchema>;

const ChangePasswordForm = () => {
  const dispatch = useAppDispatch();
  const { openDialog, closeDialog } = useDialog();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      confirmNewPassword: '',
    },
  });

  async function onSubmit(data: FormSchema) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await AuthApi.changePassword({
        accessToken: accessToken || '',
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
        channelType: 'desktop',
      });

      if (response.data.error === true) {
        const errorMessage = response.data.result?.message;

        if (errorMessage === 'PASSWORD_VALIDATION_FAILED') {
          form.setError('currentPassword', {
            type: 'manual',
            message: 'Incorrect password',
          });
          toast.error('Incorrect password');
        } else {
          toast.error(
            errorMessage || 'Failed to change password. Please try again.',
          );
        }
        return;
      }

      dispatch(refreshUserData({ passwordChanged: true }));
      toast.success('Password changed successfully');
      closeDialog(DIALOG_TYPE.changePassword);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.result?.message;

      if (errorMessage === 'PASSWORD_VALIDATION_FAILED') {
        form.setError('currentPassword', {
          type: 'manual',
          message: 'Incorrect current password',
        });
        toast.error('Incorrect current password');
      } else {
        toast.error('Failed to change password. Please try again.');
      }
    }
  }

  const handleClick = () => {
    openDialog(DIALOG_TYPE.forgotPassword);
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className="mb-1">
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="text-right mb-5">
          <button
            onClick={handleClick}
            type="button"
            className="text-xs font-medium leading-none underline"
          >
            Forgot Password?
          </button>
        </div> */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>New password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mb-5 md:mb-10">
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Confirm New password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Confirm New Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordChecks name="confirmNewPassword" />
        </div>
        <button
          type="submit"
          className={`h-12 px-8 rounded-md text-sm font-medium inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none disabled:pointer-events-none ${isSubmitting || !isValid
              ? 'bg-base-500 body-txtColor-1'
              : 'bg-button-gradient btn-textColor'
            }`}
          disabled={isSubmitting || !isValid}
        >
          Change Password
        </button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
