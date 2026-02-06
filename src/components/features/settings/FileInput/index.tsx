import {
  type ChangeEvent,
  type HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';

type FileInputProps = HTMLAttributes<HTMLInputElement> & {
  name: string;
  maxSizeMB?: number;
  allowedFormats?: string[];
};

const defaultMessage = 'No File Chosen';

const FileInput = ({
  name,
  maxSizeMB = 1.5,
  allowedFormats = ['.png', '.jpeg', '.jpg'],
  ...props
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState(defaultMessage);
  const { setValue, setError, clearErrors, watch } = useFormContext();

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      if (file.size > maxSizeBytes) {
        setError(name, {
          message: `File size should be less than ${maxSizeMB}MB`,
          type: 'maxLength',
        });

        setValue(name, null);
        return;
      }

      clearErrors(name);
      setValue(name, file);
    } else {
      setValue(name, null);
    }
  };

  const fileValue = watch(name);

  useEffect(() => {
    if (fileValue) {
      setMessage(fileValue.name);
    } else {
      setMessage(defaultMessage);
    }
  }, [fileValue]);

  return (
    <>
      <div
        className="h-10 bg-base-700 rounded-lg flex items-center gap-2 cursor-pointer mb-1"
        onClick={handleClick}
      >
        <div className="bg-base-600 inline-flex items-center justify-center h-full px-2 rounded-l-lg">
          <span className="text-base-400">Choose File</span>
        </div>
        <span className="text-sm">{message}</span>
        <input
          {...props}
          type="file"
          ref={inputRef}
          onChange={handleChange}
          accept={allowedFormats.join(',')}
          className="sr-only"
        />
      </div>
      <p className="text-xs leading-4 text-base-400">
        Max file size: {maxSizeMB}. Supported file formats:{' '}
        {allowedFormats.join(', ')}
      </p>
    </>
  );
};

export default FileInput;
