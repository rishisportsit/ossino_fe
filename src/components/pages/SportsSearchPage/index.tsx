import SportsSearchContent from 'components/features/sports-search/SportsSearchContent';
import PageHeader from 'components/shared/PageHeader';

const SportsSearchPage = () => {
  return (
    <div className="pt-[76px] md:pt-0 pb-4">
      <PageHeader className="px-4" />
      <SportsSearchContent />
    </div>
  );
};

export default SportsSearchPage;
