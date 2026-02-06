import Missions from 'components/features/missions/Missions';
import PageHeader from 'components/shared/PageHeader';
import PageHeaderBalance from 'components/shared/PageHeaderBalance';

const MissionsPage = () => {
  return (
    <>
      <PageHeader className="mx-4 mt-[76px] md:mt-0">
        <PageHeaderBalance />
      </PageHeader>
      <Missions />
    </>
  );
};

export default MissionsPage;
