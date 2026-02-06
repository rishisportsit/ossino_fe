import { useEffect } from 'react';
import { format } from 'date-fns';

import { useAppDispatch, useAppSelector } from 'store/index';
import { getReferralDetails } from 'store/referrals/slice';

import Icon from 'components/shared/Icon';
import userAvatar from '/icons/userAvatar.svg?url';

const ReferralReferrals = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.referrals.details.data);

  useEffect(() => {
    dispatch(getReferralDetails());
  }, [dispatch]);

  const safeData = data ?? [];
  return (
    <div className="xl:p-5 xl:rounded-xl xl:bg-base-800 xl:min-h-full">
      <h2 className="mb-3 body-txtColor-1 font-bold hidden xl:block xl:text-lg">
        Referrals
      </h2>
      <div className="flex flex-col gap-3">
        {safeData.length > 0 ? (
          safeData.map(({ referredUserName, signupDate }) => (
            <div
              key={referredUserName}
              className="p-3 flex bg-base-800 rounded-lg xl:border xl:border-base-700"
            >
              <div className="h-6 w-6 rounded-full flex items-center justify-center bg-gradient-to-b from-10 from-[#3166EC] to-90% to-[#0B2A79] mr-1">
                <Icon
                  id="userAvatarIcon"
                  href={userAvatar}
                  className="w-3 h-3"
                />
              </div>
              <p className="text-sm text-base-200">{referredUserName}</p>
              <p className="ml-auto text-sm text-primary-1 font-medium">
                {format(signupDate, 'dd.MM.yyyy')}
              </p>
            </div>
          ))
        ) : (
          <div className="p-3 flex bg-base-800 rounded-lg xl:border xl:border-base-700 items-center justify-center">
            <span className="text-base-400 text-sm w-full text-center">
              No referrals yet.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralReferrals;
