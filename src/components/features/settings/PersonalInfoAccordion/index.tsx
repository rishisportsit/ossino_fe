import Icon from 'components/shared/Icon';
import {
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import user from '/icons/user.svg?url';
import Badge from '../Badge';

const PersonalInfoAccordion = () => {
  return (
    <AccordionItem
      disabled
      value="personal-info"
      className='rounded-xl xl:border xl:border-base-700'
    >
      <AccordionTrigger className="data-[state=open]:pb-2 p-4 bg-base-800 xl:bg-none rounded-xl data-[state=open]:rounded-b-none">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-base-700 rounded-full">
            <Icon href={user} id="userIcon" className="w-5 h-5 fill-1" />
          </div>
          <h3 className="text-sm font-medium leading-none">Personal info</h3>
          <Badge variant="warning">Incompleted</Badge>
        </div>
      </AccordionTrigger>
    </AccordionItem>
  );
};

export default PersonalInfoAccordion;
