import ArrowRight2Icon from 'assets/icons/ArrowRight2';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from 'components/shared/ui/Sheet';
import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import PromotionDetails from '../PromotionDetails';
import Icon from 'components/shared/Icon';
import arrowLeft from '/icons/arrowLeft.svg?url';

const PromotionSheet = () => {
  const dialogState = useAppSelector(selectDialogById(DIALOG_TYPE.promotion));
  const { closeDialog } = useDialog();
  const { screenWidth } = useBreakpoint();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog(DIALOG_TYPE.promotion);
    }
  };

  if (!dialogState?.open || !dialogState?.data?.cmsData) {
    return null;
  }

  return (
    <Sheet open={dialogState.open} onOpenChange={handleOpenChange}>
      <SheetContent className="inset-x-0 top-auto md:top-0 md:left-auto bottom-0 h-[90.6%] md:h-full pb-[60px] px-4 md:px-8 xl:border-l xl:border-base-700 max-w-full md:max-w-[400px] w-full">
        <SheetTitle hidden />
        <SheetDescription hidden />

        <div className="flex items-center gap-2 mb-5">
          <SheetClose className="w-8 h-8 border border-base-700 rounded-lg flex items-center justify-center">
            <span className="sr-only">Close</span>
            {screenWidth > BREAKPOINTS.md ? (
              <ArrowRight2Icon />
            ) : (
              <Icon id="arrowLeftIcon" href={arrowLeft} className="w-4 h-4 fill-current body-txtColor-1" />
            )}
          </SheetClose>
          <div className="inline-flex items-center justify-center text-sm text-primary-2 font-medium h-8 px-4 bg-base-800 rounded-lg capitalize">
            Promotion details
          </div>
        </div>

        <PromotionDetails cmsData={dialogState.data.cmsData} />
      </SheetContent>
    </Sheet>
  );
};

export default PromotionSheet;
