import React from "react";
import FormSection from "./FormSection";

const FormField = ({ label, type = "text", placeholder, ...props }) => (
  <div className="mb-4 flex gap-2 items-center">
    <label className="mb-1 w-[150px] text-sm font-semibold leading-5 text-indigo-900">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="px-4 py-2 text-gray-700 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-700 outline-none"
      {...props}
    />
  </div>
);

const RadioGroup = () => (
  <div className="mb-4 flex gap-10 items-start">
    <label className="mb-1 text-sm font-semibold leading-5 text-indigo-900">Radio</label>
    <div className="flex flex-col gap-2">
      {["First radio", "Second radio", "Third disabled radio"].map(
        (label, index) => (
          <div key={index} className="flex items-center text-gray-700">
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
        <FormField label="Email" type="email" placeholder={"Email"}/>
        <FormField label="Password" type="password" placeholder="********" />
        <RadioGroup />
        <div className="mb-4 flex gap-10 items-center">
          <label className="mb-1 text-sm font-semibold leading-5 text-indigo-900">Checkbox</label>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 border-gray-300" />
            <span className="text-gray-700">Example checkbox</span>
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
