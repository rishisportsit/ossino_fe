import { Label } from 'components/shared/ui/Label';
import { Switch } from 'components/shared/ui/Switch';

type NotificationToggleProps = {
  label: string;
};

const NotificationToggle = ({ label }: NotificationToggleProps) => {
  const id = `${label}-toggle`;

  return (
    <div className="bg-base-800 border border-base-700 p-4 rounded-xl">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-sm font-medium leading-none" htmlFor={id}>
          {label}
        </Label>
        <Switch id={id} />
      </div>
    </div>
  );
};

export default NotificationToggle;
