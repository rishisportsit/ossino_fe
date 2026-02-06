import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from 'components/shared/ui/Accordion';
import { faqs } from './faq';

const Faq = () => {
  return (
    <div className="xl:p-5 xl:bg-base-800 xl:rounded-xl">
      <h3 className="mb-3 font-bold xl:text-lg">FAQ</h3>
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-3"
      >
        {faqs.map(({ id, question, answer }) => (
          <AccordionItem
            key={id}
            value={`faq-${id}`}
            className="bg-base-800 data-[state=open]:border data-[state=open]:border-base-700 data-[state=open]:bg-base-725 rounded-xl xl:border xl:border-base-700"
          >
            <AccordionTrigger className="data-[state=open]:pb-2 p-4">
              <h4 className="font-bold text-sm">{question}</h4>
            </AccordionTrigger>
            <AccordionContent className="text-xs p-4 pt-0 text-base-200">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
