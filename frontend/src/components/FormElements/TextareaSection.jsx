import React from "react";
import FormSection from "./FormSection";

const TextareaSection = () => {
  return (
    <FormSection title="Textarea">
      <textarea className="px-4 py-2 w-full rounded-md border border-solid border-gray-300 resize-none h-[150px]" />
    </FormSection>
  );
};

export default TextareaSection;
