import PageHeader from 'components/shared/PageHeader';
import RedemptionsList from 'components/features/redemptions/RedemptionsList';
import PageHeaderBalance from 'components/shared/PageHeaderBalance';

const RedemptionsPage = () => {
  return (
    <>
      <PageHeader className="mx-4 mt-[76px] md:mt-0">
        <PageHeaderBalance />
      </PageHeader>
      <div className="pb-16 px-4 xl:px-5">
        <RedemptionsList />
      </div>
    </>
  );
};

export default RedemptionsPage;
