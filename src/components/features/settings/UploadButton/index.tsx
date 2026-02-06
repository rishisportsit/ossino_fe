import { Button } from 'components/shared/ui/Button';
import { type PropsWithChildren, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

type Props = {
  name: string;
} & PropsWithChildren;

const MAX_FILE_SIZE = 500 * 1024; // 500KB in bytes

const UploadButton = ({ children, name }: Props) => {
  const { watch, setValue, setError, clearErrors } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    inputRef.current?.click();
  };

  const handleFilePreview = (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target?.result as string);
      };

      reader.onerror = () => {
        reject();
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (file: File) => {
    try {
      const preview = await handleFilePreview(file);
      setValue(name, preview);
      setValue('file', file); // Store the actual file for API call
      
      // Clear any previous upload errors on successful file processing
      setUploadError(null);
      clearErrors(name);
    } catch {
      setValue(name, null);
      setValue('file', undefined);
      setUploadError('Failed to process the selected file');
      toast.error('Failed to process the selected file');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      
      // Clear any previous errors
      setUploadError(null);
      clearErrors(name);
      
      // Validate file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        const fileSizeKB = (selectedFile.size / 1024).toFixed(0);
        const maxSizeKB = (MAX_FILE_SIZE / 1024).toFixed(0);
        const errorMessage = `File size exceeds the ${maxSizeKB}KB limit. Selected file: ${fileSizeKB}KB`;
        
        setUploadError(errorMessage);
        setError(name, { 
          type: 'manual', 
          message: errorMessage 
        });
        toast.error(errorMessage);
        
        // Reset input
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        return;
      }
      
      handleFile(selectedFile);
    }
  };

  const formImage = watch(name);

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <div className="w-[120px] h-[120px] rounded-full bg-base-600 relative overflow-hidden flex items-center justify-center">
          {formImage ? (
            <img
              src={formImage}
              alt="avatar"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src="/images/levels/phoenix.png"
              alt="avatar"
              width={90}
              height={90}
            />
          )}
        </div>
        <Button type="button" variant="outline" onClick={handleClick}>
          {children}
        </Button>
        {uploadError && (
          <p className="text-red-500 text-xs text-center mt-2 max-w-[200px]">
            {uploadError}
          </p>
        )}
      </div>
      <input
        type="file"
        ref={inputRef}
        accept="image/png, image/gif, image/jpeg"
        className="sr-only"
        onChange={handleChange}
      />
    </>
  );
};

export default UploadButton;
