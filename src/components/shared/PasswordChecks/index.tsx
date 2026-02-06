import TickCircleIcon from 'assets/icons/TickCircle';
import { cn } from 'helpers/ui';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const indicators = [
  { id: 'minLength', text: 'Minimum 8 characters' },
  { id: 'hasSpecialChar', text: 'One special character' },
  { id: 'hasUpperLowerCase', text: 'One uppercase and lowercase character' },
  { id: 'hasNumber', text: 'One number' },
];

type PasswordChecksProps = {
  name: string;
};

const PasswordChecks = ({ name }: PasswordChecksProps) => {
  const { watch } = useFormContext();
  const [passwordChecks, setPasswordChecks] = useState({
    minLength: false,
    hasUpperLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const password = watch(name, '');

  useEffect(() => {
    setPasswordChecks({
      minLength: password.length >= 8,
      hasUpperLowerCase: /[A-Z]/.test(password) && /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  return (
    <ul className="flex flex-col gap-2">
      {indicators.map(({ id, text }) => {
        const isValid = passwordChecks[id as keyof typeof passwordChecks];

        return (
          <li key={id} className="flex items-center gap-2">
            <div
              className={cn(
                isValid ? '[&>svg]:fill-primary-1' : '[&>svg]:fill-base-500',
              )}
            >
              <TickCircleIcon />
            </div>
            <span className="text-xs leading-4">{text}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default PasswordChecks;
