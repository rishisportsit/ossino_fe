import { Skeleton } from 'components/shared/ui/Skeleton';

interface SidebarListSkeletonProps {
  title: string;
  subtitle?: string;
  showSeeAll?: boolean;
  itemCount?: number;
  columnHeaders?: string[];
}

const SidebarListSkeleton = ({ 
  title, 
  subtitle, 
  showSeeAll = false, 
  itemCount = 5,
  columnHeaders = ['User', 'Win']
}: SidebarListSkeletonProps) => {
  return (
    <div className="bg-base-800 rounded-xl w-full lg:w-[290px] overflow-hidden border border-base-700">
      {/* Header */}
      <div className="px-4 py-3 bg-base-850 border-b border-base-800">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-[16px] font-regular body-txtColor-1 leading-5">{title}</h3>
            {subtitle && (
              <span className="text-sm font-regular text-base-400">{subtitle}</span>
            )}
          </div>
          {showSeeAll && (
            <Skeleton className="w-12 h-4 rounded" />
          )}
        </div>
      </div>

      {/* Column Headers */}
      <div className="flex items-center justify-between px-4 py-3 text-sm border-b border-base-800">
        {columnHeaders.map((header, index) => (
          <span key={index} className="text-base-400">{header}</span>
        ))}
      </div>

      {/* List Items */}
      <ul className="divide-y divide-base-800">
        {Array.from({ length: itemCount }).map((_, index) => (
          <li key={index} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="w-20 h-4 rounded" />
            </div>
            <Skeleton className="w-16 h-4 rounded" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarListSkeleton;