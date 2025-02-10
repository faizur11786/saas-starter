import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const LawyerFaq = () => {
  return (
    <div className="py-6">
      <h3 className="mb-3 text-3xl font-extralight">
        Frequently Asked Questions about Advocate Ricky Chopra
      </h3>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-base font-light">
            Can Advocate Ricky Chopra represent me in court?
          </AccordionTrigger>
          <AccordionContent>
            Yes, Advocate Ricky Chopra can represent you in court. The lawyer is
            trained to present your case in the most effective way possible.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-base font-light">
            What should I bring to my initial consultation with Advocate Ricky
            Chopra?
          </AccordionTrigger>
          <AccordionContent>
            When you meet with Advocate Ricky Chopra for an initial
            consultation, it is important to bring any relevant documents or
            information with you. This may include documents related to your
            legal issue, such as contracts or court orders, as well as any other
            relevant information, such as a list of questions or concerns you
            have about your case.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-base font-light">
            How do I prepare for my initial consultation with Advocate Ricky
            Chopra?
          </AccordionTrigger>
          <AccordionContent>
            Before your initial consultation with Advocate Ricky Chopra, it can
            be helpful to think about the specific legal issue you are facing
            and any questions or concerns you have about your case. You should
            also gather any relevant documents or information that you think may
            be helpful in understanding your situation.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-base font-light">
            What should I expect during my initial consultation with Advocate
            Ricky Chopra?
          </AccordionTrigger>
          <AccordionContent>
            During your initial consultation with Advocate Ricky Chopra, you can
            expect to discuss the specific legal issue you are facing and the
            details of your situation. Lawyer will ask you questions to get a
            better understanding of your case and will provide you with
            information about your legal options and any potential outcomes.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-base font-light">
            How do I communicate with Advocate Ricky Chopra?
          </AccordionTrigger>
          <AccordionContent>
            It is important to communicate with Advocate Ricky Chopra regularly
            to stay updated on the progress of your case and to discuss any new
            developments or concerns you may have. You can communicate with the
            lawyer through mobile calls, emails, or in-person meetings.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-base font-light">
            How much does it cost to hire Advocate Ricky Chopra?
          </AccordionTrigger>
          <AccordionContent>
            The cost of hiring Advocate Ricky Chopra can vary widely. Some
            lawyers charge hourly rates, while others charge a flat fee for
            their services. Some also offer free initial consultations to
            discuss your case. Kindly contact the lawyer directly to enquire
            about the fee.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LawyerFaq;
