import { Link } from 'react-router-dom';
import info from '/icons/info.svg?url';
import Icon from 'components/shared/Icon';

const VerifyEmailAlert = () => {
  return (
    <div className="bg-status-error-200 py-2 px-3 flex items-center gap-1 rounded-lg">
      <Icon href={info} id="infoIcon" className="w-4 h-4 mt-0.5" />
      <span className="text-[10px] leading-[13px]">
        Proceed to the{' '}
        <Link to="/settings/verify" className="font-medium underline">
          Verify page
        </Link>{' '}
        and complete the process.
      </span>
    </div>
  );
};

export default VerifyEmailAlert;
