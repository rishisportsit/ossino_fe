import ReferralDetails from '../ReferralDetails';
import ReferralFaq from '../ReferralFaq';
import ReferralProgram from '../ReferralProgram';

const ReferralOverview = () => {
  return (
    <div className="xl:p-5 xl:rounded-xl xl:bg-base-800 xl:h-[510px]">
      <div className="mb-8 xl:hidden">
        <ReferralProgram />
      </div>
      <div className="mb-8">
        <ReferralDetails />
      </div>
      <div className="xl:hidden">
        <ReferralFaq />
      </div>
    </div>
  );
};

export default ReferralOverview;
