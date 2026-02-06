import Badges from 'components/features/badges/Badges';
import PageHeader from 'components/shared/PageHeader';
import PageHeaderBalance from 'components/shared/PageHeaderBalance';

const BadgesPage = () => {
  return (
    <>
      <PageHeader className="mx-4 mt-[76px] md:mt-0">
        <PageHeaderBalance />
      </PageHeader>
      <Badges />
    </>
  );
};

export default BadgesPage;
