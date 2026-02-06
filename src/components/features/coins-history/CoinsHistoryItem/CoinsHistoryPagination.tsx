import { cn } from 'helpers/ui';
import left from '/icons/arrowLeft.svg?url';
import arrowRight from '/icons/arrowRight.svg?url';
import Icon from 'components/shared/Icon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const CoinsHistoryPaginationBlock = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={cn(
          'flex items-center justify-center w-8 h-8 rounded-lg transition-colors',
          currentPage === 1
            ? 'bg-base-800 text-base-600 cursor-not-allowed'
            : 'bg-base-800 text-base-200 hover:bg-base-700',
        )}
        aria-label="Previous page"
      >
        <Icon id="arrowLeftIcon" href={left} className="w-4 h-4 fill-current body-txtColor-1" />
      </button>

      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-8 h-8 text-base-400"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => handlePageClick(page as number)}
            className={cn(
              'flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors',
              currentPage === page
                ? 'bg-primary-1 text-base-900'
                : 'bg-base-800 text-base-200 hover:bg-base-700',
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={cn(
          'flex items-center justify-center w-8 h-8 rounded-lg transition-colors',
          currentPage === totalPages
            ? 'bg-base-800 text-base-600 cursor-not-allowed'
            : 'bg-base-800 text-base-200 hover:bg-base-700',
        )}
        aria-label="Next page"
      >
        <Icon id="arrowRightIcon" href={arrowRight} className="w-4 h-4 fill-current body-txtColor-1" />
      </button>
    </div>
  );
};

export default CoinsHistoryPaginationBlock;
