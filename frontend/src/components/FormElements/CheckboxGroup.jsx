import React from "react";
import FormSection from "./FormSection";

const CheckboxGroup = ({ variant = "grid" }) => {
  const checkboxes =
    variant === "grid"
      ? Array(5).fill(null)
      : [
          { label: "Option 1" },
          { label: "Option 2" },
          { label: "Disabled", disabled: true },
        ];

  if (variant === "grid") {
    return (
      <FormSection title="Checkbox">
        <div className="grid grid-cols-5 gap-4">
          {checkboxes.map((_, index) => (
            <div key={index} className="flex items-center">
              <input type="checkbox" defaultChecked={true}className="w-4 h-4 rounded border-gray-300"  />

            </div>
          ))}
        </div>
      </FormSection>
    );
  }

  return (
    <FormSection title="Checkboxes">
      <div className="flex flex-col gap-2">
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

export default CheckboxGroup;
