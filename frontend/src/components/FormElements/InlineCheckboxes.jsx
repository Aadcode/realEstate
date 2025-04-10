import React from "react";
import FormSection from "./FormSection";

const InlineCheckboxes = () => {
  const checkboxes = [
    { label: "Option 1" },
    { label: "Option 2" },
    { label: "Disabled", disabled: true },
  ];

  return (
    <FormSection title="Inline Checkboxes">
      <div className="flex gap-4">
        {checkboxes.map((checkbox, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              disabled={checkbox.disabled}
              className="mr-2"
            />
            <span>{checkbox.label}</span>
          </div>
        ))}
      </div>
    </FormSection>
  );
};

export default InlineCheckboxes;
