import TransactionsContent from "components/features/transactions/TransactionsContent";
import PageHeader from "components/shared/PageHeader";

const TransactionsPage = () => {
  return (
    <div className="p-4 pt-[76px] md:pt-0 xl:p-5 mb-2 flex flex-col overflow-hidden min-h-svh md:min-h-full md:-mb-4">
      <PageHeader to='/' />
      <TransactionsContent />
    </div>
  )
}

export default TransactionsPage