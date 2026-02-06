import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';

const DailyRaceBlock = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="px-4 bg-base-670 rounded-xl mt-4 xl:border md:bg-base-850 xl:border-base-700 xl:bg-transparent"
    >
      <AccordionItem value="item-1" className="flex flex-col">
        <AccordionTrigger>$10,000 Daily Race</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 pb-4 ">
          content
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DailyRaceBlock;
