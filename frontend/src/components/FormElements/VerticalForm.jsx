import React from "react";
import FormSection from "./FormSection";

const FormField = ({ label, type = "text", placeholder, ...props }) => (
  <div className="mb-4">
    <label className="mb-1 text-sm font-medium leading-5">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="px-4 py-2 w-full rounded-md border border-solid"
      {...props}
    />
  </div>
);

const RadioGroup = () => (
  <div className="mb-4">
    <label className="mb-1 text-sm font-medium leading-5">Radio</label>
    <div className="flex flex-col gap-2">
      {["First radio", "Second radio", "Third disabled radio"].map(
        (label, index) => (
          <div key={index} className="flex items-center">
            <input type="radio" name="radio" className="mr-2" />
            <span>{label}</span>
          </div>
        ),
      )}
    </div>
  </div>
);

const VerticalForm = () => {
  return (
    <FormSection title="Vertical Form">
      <form className="flex flex-col gap-4">
        <FormField label="Email" type="email" />
        <FormField label="Password" type="password" placeholder="********" />
        <RadioGroup />
        <div className="mb-4">
          <label className="mb-1 text-sm font-medium leading-5">Checkbox</label>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2 border-gray-300" />
            <span>Example checkbox</span>
          </div>
        </div>
        <button className="px-4 py-2 text-white bg-indigo-600 rounded-md">
          Sign in
        </button>
      </form>
    </FormSection>
  );
};

export default VerticalForm;
