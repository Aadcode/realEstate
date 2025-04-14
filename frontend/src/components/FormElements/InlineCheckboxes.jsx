import React from "react";
import FormSection from "./FormSection";

const InlineCheckboxes = () => {

  const checkboxes = [
    { label: "Option 1" , checked: true },
    { label: "Option 2" , checked: false },
    { label: "Disabled", disabled: true },
];

  return (
    <FormSection title="Inline Checkboxes">
      <div className="flex gap-4">
        {checkboxes.map((checkbox, index) => (
          <div key={index} className="flex items-center ">
            <input
              type="checkbox"
              disabled={checkbox.disabled}
              defaultChecked={checkbox?.checked ?? false}
              className={`mr-2 ${checkbox.disabled ? 'cursor-not-allowed' : ''}`}
            />
            <span className={`${checkbox.disabled ? 'text-gray-300' : 'text-gray-700'}`}>{checkbox.label}</span>
          </div>
        ))}
      </div>
    </FormSection>
  );
};

export default InlineCheckboxes;
