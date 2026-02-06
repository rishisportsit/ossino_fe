import { zodResolver } from '@hookform/resolvers/zod';
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
import Input from 'components/shared/ui/Input';
import Loader from 'components/shared/ui/Loader';
import { useDialog } from 'helpers/hooks';
import { useForm } from 'react-hook-form';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppDispatch } from 'store/index';
import { login } from 'store/user/slice';
import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z.string({ required_error: 'Password is required' }),
});

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      email: '',
    },
  });

  const { openDialog } = useDialog();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await dispatch(
      login({ userName: data.email, password: data.password }),
    ).unwrap();
  }

  function handleClick() {
    openDialog(DIALOG_TYPE.forgotPassword);
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
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
                  autoComplete="current-email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-2">
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
        <div className="mb-8 text-right">
          <button
            type="button"
            className="text-xs leading-4 font-medium underline"
            onClick={handleClick}
          >
            Forgot Password
          </button>
        </div>
        <Button disabled={isSubmitting || !isValid} size="lg">
          {isSubmitting ? <Loader /> : 'Login'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
