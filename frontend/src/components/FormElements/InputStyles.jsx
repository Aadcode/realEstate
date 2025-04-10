import React from "react";
import FormSection from "./FormSection";

const InputStyles = () => {
  return (
    <FormSection title="Input Style">
      <div className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="Input default"
          className="px-4 py-2 w-full rounded-md border border-solid border-gray-300"
        />
        <input
          type="text"
          placeholder="Input rounded"
          className="px-4 py-2 w-full rounded-md border border-solid border-gray-300"
        />
      </div>
    </FormSection>
  );
};

export default InputStyles;
