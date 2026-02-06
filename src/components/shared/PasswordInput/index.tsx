import { forwardRef, useState } from 'react';
import EyeClosedIcon from 'assets/icons/EyeClosed';
import EyeOpenIcon from 'assets/icons/EyeOpen';
import Input, { type InputProps } from 'components/shared/ui/Input';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleToggle = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <Input
        {...props}
        ref={ref}
        type={isPasswordVisible ? 'text' : 'password'}
        className="pr-10"
      />
      <button
        type="button"
        className="absolute right-0 top-0 h-full px-3 py-2"
        onClick={handleToggle}
        aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
      >
        {/* EyeOpenIcon means password is visible, EyeClosedIcon means hidden */}
        {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
