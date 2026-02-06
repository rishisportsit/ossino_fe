import ArrowRight2Icon from 'assets/icons/ArrowRight2';
import Icon from 'components/shared/Icon';
import { SheetClose } from 'components/shared/ui/Sheet';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import arrowLeft from '/icons/arrowLeft.svg?url';

type SheetHeadingProps = {
  title: string;
};

const SheetHeading = ({ title }: SheetHeadingProps) => {
  const { screenWidth } = useBreakpoint();

  return (
    <div className="flex items-center gap-2 mb-5">
      <SheetClose className="w-8 h-8 border border-base-700 rounded-lg flex items-center justify-center">
        <span className="sr-only">Close</span>
        {screenWidth > BREAKPOINTS.md ? (
          <ArrowRight2Icon />
        ) : (
          <Icon id="arrowLeftIcon" href={arrowLeft} className="w-4 h-4 fill-current body-txtColor-1" />
        )}
      </SheetClose>
      <div className="inline-flex items-center justify-center text-sm text-primary-2 font-medium h-8 px-4 bg-base-800 rounded-lg">
        {title}
      </div>
    </div>
  );
};

export default SheetHeading;
