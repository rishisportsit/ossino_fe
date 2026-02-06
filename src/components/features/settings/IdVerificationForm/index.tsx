import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector, useAppDispatch } from 'store/index';
import FileInput from 'components/features/settings/FileInput';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/shared/ui/Form';
import { Button } from 'components/shared/ui/Button';
import Select from 'components/shared/Select';
import { Label } from 'components/shared/ui/Label';
import { selectUserData } from 'store/user/selectors';
import { uploadKyc } from 'store/user/slice';

const schema = z.object({
  idProofType: z.string().min(1, { message: 'Please select a document type' }),
  file: z.instanceof(File, { message: 'Please select a document file' }),
  selfie: z.instanceof(File, { message: 'Please select a selfie file' }),
});

type FormSchema = z.infer<typeof schema>;

const IdVerificationForm = () => {
  const dispatch = useAppDispatch();
  const form = useForm<FormSchema>({ resolver: zodResolver(schema) });

  const userData = useAppSelector(selectUserData);
  const kycTypes = userData?.kycTypes || [];

  const onSubmit = (data: FormSchema) => {
    const file = data.file instanceof FileList ? data.file[0] : data.file;
    const selfie = data.selfie instanceof FileList ? data.selfie[0] : data.selfie;

    dispatch(
      uploadKyc({
        file,
        idType: 'ADDRESS',
        kycType: data.idProofType,
        selfie,
      }),
    ).then(() => {
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <FormField
          control={form.control}
          name="idProofType"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-4">
              <Label>ID Proof</Label>
              <Select
                withChevron
                className="h-10 w-full px-2.5 py-2.5 xl:px-3 xl:max-w-full"
                chevronClassName="xl:bg-transparent"
                dropDownClassName="w-full min-w-[200px]"
                list={
                  <div className="flex flex-col">
                    {kycTypes.length === 0 ? (
                      <span className="text-nowrap text-sm capitalize px-4 py-2">
                        No options
                      </span>
                    ) : (
                      kycTypes.map((type) => (
                        <div
                          key={type}
                          className="text-nowrap text-sm capitalize px-4 py-2 hover:bg-base-600 rounded-lg cursor-pointer"
                          onClick={() => field.onChange(type)}
                        >
                          {type}
                        </div>
                      ))
                    )}
                  </div>
                }
                closeOnClick
              >
                <span className="text-nowrap text-sm capitalize">
                  {field.value || 'Select'}
                </span>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="file"
          control={form.control}
          render={() => (
            <FormItem className="mb-5">
              <FormLabel>Select a File for ID Proof</FormLabel>
              <FormControl>
                <FileInput name="file" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="selfie"
          control={form.control}
          render={() => (
            <FormItem className="mb-5">
              <FormLabel>Upload Selfie</FormLabel>
              <FormControl>
                <FileInput name="selfie" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size="default"
          disabled={form.formState.isSubmitting}
          className="md:max-w-[294px] bg-primary-1"
        >
          Send verification
        </Button>
      </form>
    </Form>
  );
};

export default IdVerificationForm;
