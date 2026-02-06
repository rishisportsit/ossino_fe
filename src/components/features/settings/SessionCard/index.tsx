import Icon from 'components/shared/Icon';
import type { Session } from 'store/sessions/slice';
import mobile from '/icons/mobile.svg?url';
import monitor from '/icons/monitor.svg?url';
import arrowRight from '/icons/arrowRight.svg?url';
import { formatDate } from '../formatDate';

const SessionCard = ({
  country,
  deviceName,
  deviceType,
  lastVisited,
  status,
}: Omit<Session, 'id'>) => {
  return (
    <div className="bg-base-800 xl:border xl:border-base-700 p-4 rounded-xl">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center bg-base-700 rounded-full">
          {deviceType === 'mobile' ? (
            <Icon href={mobile} id="mobileIcon" className="w-5 h-5 fill-1" />
          ) : (
            <Icon href={monitor} id="monitorIcon" className="w-5 h-5 fill-1" />
          )}
        </div>
        <div className="grow">
          <h3 className="text-sm font-medium leading-none mb-2">
            {deviceName}
          </h3>
          <p className="flex items-center gap-1.5">
            <span className="text-xs leading-none text-base-300">
              {country}
            </span>
            <span className="w-1 h-1 bg-base-300 rounded-full mt-[3px]" />
            {status === 'online' ? (
              <span className="text-xs text-status-success leading-none">
                Online
              </span>
            ) : (
              <span className="text-xs leading-none text-base-300">
                {formatDate(lastVisited)}
              </span>
            )}
          </p>
        </div>
        <Icon href={arrowRight} id="arrowRightIcon" className='w-4 h-4 fill-current body-txtColor-1' />
      </div>
    </div>
  );
};

export default SessionCard;
