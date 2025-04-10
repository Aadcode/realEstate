import React from "react";
import FormSection from "./FormSection";
import Select from "react-select";

const SelectSection = ({ variant = "size" }) => {
  const title = variant === "size" ? "Select Size" : "Select List";

  const selects =
    variant === "size"
      ? [
          { options: ["Option 1", "Medium", "Large"] },
          { options: ["Option 1", "Medium", "Extra Large"] },
          { options: ["Option 1", "Size 2", "Size 3"] },
        ]
      : [
          {
            label: "Select list (select one):",
            defaultValue: "Select list (select one)",
            options: ["Option 1", "Option 2", "Option 3"],
          },
          {
            label: "Multiple select list (hold shift to select more than one):",
            defaultValue: "Nothing selected",
            multiple: true,
            options: ["Item 1", "Item 2", "Item 3", "Item 4"],
          },
        ];

  return (
    <FormSection title={title}>
      <div className="flex flex-col gap-4">
        {selects.map((select, index) => (
          <div key={index} className="flex flex-col text-gray-600">
            {select.label && (
              <label className="font-semibold mb-1">{select.label}</label>
            )}
            {select.multiple ? (
              <Select
                isMulti
                options={select.options.map((option) => ({
                  value: option,
                  label: option,
                }))}
                placeholder={select.defaultValue}
                className="w-full"
              />
            ) : (
              <select
                className="py-2 px-3 w-full rounded-md border border-solid border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                {select.defaultValue && (
                  <option value="" disabled>
                    {select.defaultValue}
                  </option>
                )}
                {select.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </FormSection>
  );
};

export default SelectSection;
