import React, { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  tooltipText: string | undefined;
}

const Tooltip: React.FC<TooltipProps> = ({ children, tooltipText }) => {
  return (
    <div className="relative inline-block group cursor-pointer text-xs lg:text-sm leading-[18px]">
      {children}
      <div className="absolute -top-6 left-1/2 hidden flex-col items-center text-center transform -translate-x-1/2 group-hover:flex z-50">
        <div className="background-2 body-txtColor-1 text-[12px] leading-[14px] rounded-md py-0.5 px-1.5 whitespace-nowrap border border-base-600">
          {tooltipText}
        </div>
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black border-t-base-300"></div>
      </div>
    </div>
  );
};

export default Tooltip;
