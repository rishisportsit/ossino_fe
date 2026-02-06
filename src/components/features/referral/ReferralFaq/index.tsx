import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';

type Faq = {
  id: number;
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    id: 1,
    question: 'How can I earn point?',
    answer: 'Receive up to 20% back on house',
  },
  // {
  //   id: 2,
  //   question: 'How can I earn point?',
  //   answer: 'Receive up to 20% back on house',
  // },
  // {
  //   id: 3,
  //   question: 'How can I earn point?',
  //   answer: 'Receive up to 20% back on house',
  // },
  // {
  //   id: 4,
  //   question: 'How can I earn point?',
  //   answer: 'Receive up to 20% back on house',
  // },
  // {
  //   id: 5,
  //   question: 'How can I earn point?',
  //   answer: 'Receive up to 20% back on house',
  // },
];

const ReferralFaq = () => {
  return (
    <div className="w-full xl:bg-base-800 xl:rounded-xl xl:p-5 xl:min-h-[434px]">
      <h2 className="mb-3 body-txtColor-1 font-bold xl:text-lg">FAQ</h2>
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-3"
      >
        {faqs.map(({ id, question, answer }) => (
          <AccordionItem
            key={id}
            value={`faq-${id}`}
            className="bg-base-800 data-[state=open]:bg-base-725 data-[state=open]:border data-[state=open]:border-base-700 md:data-[state=open]:border-base-725 rounded-xl xl:border xl:border-base-700"
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

export default ReferralFaq;
