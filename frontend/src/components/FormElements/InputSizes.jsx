import React from "react";
import FormSection from "./FormSection";

const InputSizes = () => {
  const inputs = [
    {
      placeholder: "form-control-lg",
      className:
        "px-4 py-3 w-full text-lg leading-7 rounded-md border border-solid border-gray-300",
    },
    {
      placeholder: "Default input",
      className: "px-4 py-2 w-full rounded-md border border-solid border-gray-300",
    },
    {
      placeholder: "form-control-sm",
      className:
        "px-4 py-1.5 w-full text-sm leading-5 rounded-md border border-solid border-gray-300",
    },
  ];

  return (
    <FormSection title="Input Size">
      <div className="flex flex-col gap-4">
        {inputs.map((input, index) => (
          <input
            key={index}
            type="text"
            placeholder={input.placeholder}
            className={input.className}
          />
        ))}
      </div>
    </FormSection>
  );
};

export default InputSizes;
