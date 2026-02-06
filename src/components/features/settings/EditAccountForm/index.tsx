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
import deepCompare from 'helpers/objects';
import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectUserData } from 'store/user/selectors';
import { selectPlayerDetails, selectUploadedFile, selectUploadedFilePreview } from 'store/settings/selectors';
import { z } from 'zod';
import { refreshUserData } from 'store/user/slice';
import { updatePlayerDetails, getPlayerDetails, clearUploadedFile } from 'store/settings/slice';
import { openDialog, DIALOG_TYPE } from 'store/dialog/slice';
import VerifyEmailAlert from '../VerifyEmailAlert';

const schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters long'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters long'),
  email: z.string().email('Please enter a valid email address'),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date in the format YYYY-MM-DD')
    .refine(
      (val) => {
        const year = Number(val.split('-')[0]);
        return year >= 1900 && year <= 2099;
      },
      {
        message: 'Year must be between 1900 and 2099',
      },
    ),
  city: z.string().min(2, 'City must be at least 2 characters long'),
});

type FormSchema = z.infer<typeof schema>;

const EditAccountForm = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectUserData);
  const accountInfo = useAppSelector(selectPlayerDetails);
  const uploadedFile = useAppSelector(selectUploadedFile);
  const uploadedFilePreview = useAppSelector(selectUploadedFilePreview);

  const stateValues: FormSchema = useMemo(
    () => ({
      firstName: accountInfo?.firstName ?? account?.firstName ?? '',
      lastName: accountInfo?.lastName ?? account?.lastName ?? '',
      email: accountInfo?.userOtherInfo?.email ?? account?.email ?? '',
      dob: accountInfo?.dob ?? account?.dateOfBirth ?? '',
      city: accountInfo?.userOtherInfo?.city ?? account?.city ?? '',
    }),
    [account, accountInfo],
  );

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: stateValues,
  });

  const onSubmit = async (values: FormSchema) => {
    // Convert base64 preview back to File object if available
    let fileToUpload: File | undefined = undefined;
    
    if (uploadedFile && uploadedFilePreview) {
      try {
        console.log('=== File Upload Debug ===');
        console.log('Uploaded file metadata:', uploadedFile);
        console.log('Preview length:', uploadedFilePreview.length);
        
        // Convert base64 data URL to Blob
        const response = await fetch(uploadedFilePreview);
        const blob = await response.blob();
        
        console.log('Blob created:', blob.size, 'bytes, type:', blob.type);
        
        // Create File object from Blob with original metadata
        fileToUpload = new File([blob], uploadedFile.name, {
          type: uploadedFile.type,
          lastModified: Date.now(),
        });
        
        console.log('File object created:', {
          name: fileToUpload.name,
          size: fileToUpload.size,
          type: fileToUpload.type,
          isFile: fileToUpload instanceof File,
          isBlob: fileToUpload instanceof Blob
        });
      } catch (error) {
        console.error('Error converting preview to File:', error);
      }
    }
    
    console.log('Submitting with file:', fileToUpload);
    
    const resultAction = await dispatch(
      updatePlayerDetails({
        data: values,
        file: fileToUpload
      })
    );
    if (updatePlayerDetails.fulfilled.match(resultAction)) {
      dispatch(getPlayerDetails());
      dispatch(clearUploadedFile());
      dispatch(
        openDialog({
          id: DIALOG_TYPE.success,
          data: {
            message: 'Account details updated successfully',
            details: 'Your account information has been changed.',
          },
        }),
      );
    }
    dispatch(refreshUserData(values));
  };

  useEffect(() => {
    form.reset(stateValues);
  }, [stateValues, form]);

  const formValues = useWatch({ control: form.control });
  const hasFormChanged = account ? !deepCompare(formValues, stateValues) : false;
  const hasUploadedFile = !!uploadedFile;
  const isUnchanged = !hasFormChanged && !hasUploadedFile;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex items-start gap-3 mb-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  {/* For Google login users, read from playerDetails.userOtherInfo.emailVerified */}
                  {/* For regular users, fallback to account.emailVerified */}
                  <Input placeholder="Enter Email" {...field} disabled={!!(accountInfo?.userOtherInfo?.emailVerified ?? account?.emailVerified)} />
                  {(accountInfo?.userOtherInfo?.emailVerified ?? account?.emailVerified) ? (
                    <span className="text-[10px] font-medium text-status-success absolute top-1/2 right-3 -translate-y-1/2">
                      Verified
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-status-error-100 absolute top-1/2 right-3 -translate-y-1/2">
                      Not verified
                    </span>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!(accountInfo?.userOtherInfo?.emailVerified ?? account?.emailVerified) ? (
          <div className="mt-2">
            <VerifyEmailAlert />
          </div>
        ) : null}
        <div className="mt-4 flex items-start gap-3 mb-8">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    min="1900-01-01"
                    max="5099-12-31"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isUnchanged}
          className="self-start w-full md:w-[294px]"
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default EditAccountForm;
