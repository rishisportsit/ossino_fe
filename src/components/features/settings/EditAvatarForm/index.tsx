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
import { useForm, useWatch } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectUserData } from 'store/user/selectors';
import { selectPlayerDetails } from 'store/settings/selectors';
import { setUploadedFile } from 'store/settings/slice';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useDialog } from 'helpers/hooks';
import { z } from 'zod';
import UploadButton from '../UploadButton';

const schema = z.object({
  image: z.string(),
  userName: z.string(),
  file: z.instanceof(File).optional(),
});

type FormSchema = z.infer<typeof schema>;

const EditAvatarForm = () => {
  const account = useAppSelector(selectUserData);
  const playerDetails = useAppSelector(selectPlayerDetails);
  const dispatch = useAppDispatch();
  const { closeDialog } = useDialog();

  const profilePath = playerDetails?.userOtherInfo?.profilePath;
  const image = profilePath || account?.profileImage || '';
  const displayName = playerDetails?.nickName || account?.userName || '';

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { userName: displayName, image, file: undefined },
  });

  function onSubmit({ image, file }: FormSchema) {
    if (file) {
      dispatch(setUploadedFile({
        file: { name: file.name, size: file.size, type: file.type },
        preview: image
      }));
    }

    closeDialog(DIALOG_TYPE.editAvatar);
  }

  const { isSubmitting } = form.formState;
  const formValues = useWatch({ control: form.control });

  const hasFileChanged = !!formValues.file;
  const hasUserNameChanged = formValues.userName !== displayName;
  const hasImageChanged = formValues.image !== image;
  const isUnchanged = !hasFileChanged && !hasUserNameChanged && !hasImageChanged;

  const disabled = isUnchanged || isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-5" onClick={(e) => e.stopPropagation()}>
          <UploadButton name="image">{formValues.file ? 'Change Photo' : 'Upload Photo'}</UploadButton>
        </div>
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter User Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" disabled={disabled}>
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default EditAvatarForm;
