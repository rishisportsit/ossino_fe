import Icon from 'components/shared/Icon';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import { useAppSelector } from 'store/index';
import { selectUserData } from 'store/user/selectors';
import { selectPlayerDetails } from 'store/settings/selectors';
import Badge from '../Badge';
import EmailVerificationForm from '../EmailVerificationForm';
import sms from '/icons/sms.svg?url';

const EmailVerificationAccordion = () => {
  const account = useAppSelector(selectUserData);
  const playerDetails = useAppSelector(selectPlayerDetails);
  
  const isEmailVerified = playerDetails?.userOtherInfo?.emailVerified ?? account?.emailVerified ?? false;

  return (
    <AccordionItem value="email-verification" className='rounded-xl xl:border xl:border-base-700 bg-base-800 xl:bg-none'>
      <AccordionTrigger className="data-[state=open]:pb-2 p-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-base-700 rounded-full">
            <Icon href={sms} id="smsIcon" className="w-5 h-5 fill-1" />
          </div>
          <h3 className="text-sm font-medium leading-none">Email</h3>
          {!isEmailVerified ? (
            <Badge variant="error">Not verified</Badge>
          ) : (
            <Badge variant="success">Verified</Badge>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 pt-3">
        <div className="lg:max-w-[600px]">
          <EmailVerificationForm />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default EmailVerificationAccordion;
