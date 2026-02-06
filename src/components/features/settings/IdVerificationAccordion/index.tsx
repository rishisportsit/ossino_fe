import Icon from 'components/shared/Icon';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import { useAppSelector } from 'store/index';
import { selectPlayerDetails } from 'store/settings/selectors';
import StatusIndicator from 'components/shared/StatusIndicator';
import IdVerificationForm from '../IdVerificationForm';
import documentNormal from '/icons/documentNormal.svg?url';

const IdVerificationAccordion = () => {
  const playerDetails = useAppSelector(selectPlayerDetails);
  const idKycStatus = playerDetails?.idKycStatus;

  return (
    <AccordionItem
      value="id-verification"
      className="rounded-xl xl:border xl:border-base-700 bg-base-800 xl:bg-none"
    >
      <AccordionTrigger className="data-[state=open]:pb-2 p-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-base-700 rounded-full">
            <Icon
              href={documentNormal}
              id="documentNormalIcon"
              className="w-5 h-5 fill-1"
            />
          </div>
          <h3 className="text-sm font-medium leading-none">ID Verification</h3>
          <StatusIndicator statusValue={idKycStatus} />
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 pt-3">
        <div className="lg:max-w-[600px]">
          <IdVerificationForm />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default IdVerificationAccordion;
