import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
    totalCount: number
}

export default function Pagination({ currentPage, totalPages, onPageChange, totalCount }: PaginationProps) {
    const getVisiblePages = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return pages;
    };

    const handlePageClick = (page: number | string) => {
        if (typeof page === "number" && page !== currentPage && onPageChange) {
            onPageChange(page);
        }
    };

    return (
        <div className="sticky left-0 right-0 flex items-center justify-center border-t border-white/10 px-4 py-3 sm:px-6 bg-bg-primary">
            <div className="flex flex-1 sm:hidden justify-center">
                <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => onPageChange?.(currentPage - 1)}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-base-400 inset-ring inset-ring-base-700 hover:bg-background-1/5 focus:z-20 focus:outline-offset-0 disabled:opacity-40"
                    >
                        <span className="sr-only">Previous</span>
                        <FiChevronLeft className="h-5 w-5" />
                    </button>

                    {getVisiblePages().map((page, index) =>
                        page === "..." ? (
                            <span
                                key={index}
                                className="relative inline-flex items-center px-3 py-2 text-sm font-semibold text-base-400 inset-ring inset-ring-base-700"
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={index}
                                onClick={() => handlePageClick(page)}
                                className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 
                    ${page === currentPage
                                        ? "z-10 bg-base-700 body-txtColor-1"
                                        : "text-base-200 inset-ring inset-ring-base-700 hover:bg-background-1/5"
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    )}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange?.(currentPage + 1)}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-base-400 inset-ring inset-ring-base-700 hover:bg-background-1/5 focus:z-20 focus:outline-offset-0 disabled:opacity-40"
                    >
                        <span className="sr-only">Next</span>
                        <FiChevronRight className="h-5 w-5" />
                    </button>
                </nav>
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-base-300">
                        Total: <span className="font-medium">{totalCount}</span> - Showing <span className="font-medium">{currentPage}</span> of{" "}
                        <span className="font-medium">{totalPages}</span> pages
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md">

                        <button
                            disabled={currentPage === 1}
                            onClick={() => onPageChange?.(currentPage - 1)}
                            className="relative inline-flex items-center rounded-1-md px-2 py-2 text-base-400 inset-ring inset-ring-base-700 hover:bg-background-1/5 focus:z-20 focus:outline-offset-0 disabled:opacity-40"
                        >
                            <span className="sr-only">Previous</span>
                            <FiChevronLeft className="h-5 w-5" />
                        </button>

                        {getVisiblePages().map((page, index) =>
                            page === "..." ? (
                                <span
                                    key={index}
                                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-base-400 inset-ring inset-ring-base-700"
                                >
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={index}
                                    onClick={() => handlePageClick(page)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 
                    ${page === currentPage
                                            ? "z-10 border-base-800 xl:border-base-700 bg-base-700 body-txtColor-1 rounded-lg"
                                            : "text-base-200 inset-ring inset-ring-base-700 hover:bg-background-1/5"
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        )}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => onPageChange?.(currentPage + 1)}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-base-400 inset-ring inset-ring-base-700 hover:bg-background-1/5 focus:z-20 focus:outline-offset-0 disabled:opacity-40"
                        >
                            <span className="sr-only">Next</span>
                            <FiChevronRight className="h-5 w-5" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
