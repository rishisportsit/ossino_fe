import { zodResolver } from '@hookform/resolvers/zod';
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
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'store/index';
import { forgotPassword } from 'store/user/slice';
import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email' }),
});

const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  async function submitHandler(data: z.infer<typeof formSchema>) {
    await dispatch(forgotPassword(data)).unwrap();
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
          name="email"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="lg" disabled={isSubmitting || !isValid}>
          {isSubmitting ? <Loader className="w-5 h-5" /> : 'Send Reset Link'}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
