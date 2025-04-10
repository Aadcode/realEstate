import React from "react";
import FormSection from "./FormSection";

const FormField = ({ label, type = "text", placeholder, ...props }) => (
  <div className="mb-4 flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder || label}
      className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
      {...props}
    />
  </div>
);

const HorizontalForm = () => {
  return (
    <FormSection title="Horizontal Form">
      <form className="grid grid-cols-2 gap-6">
        <div className="col-span-1">
          <FormField label="Name" />
          <FormField label="Password" type="password" />

          {/* Select Dropdown - Fixed defaultValue */}
          <div className="mb-4 flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">State</label>
            <select
              defaultValue=""
              className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="" disabled>Choose...</option>
              <option value="NY">New York</option>
              <option value="CA">California</option>
              <option value="TX">Texas</option>
            </select>
          </div>

          {/* Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 text-sm text-gray-700">Check me out</label>
          </div>

          {/* Submit Button */}
          <button className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 outline-none">
            Sign in
          </button>
        </div>

        <div className="col-span-1">
          <FormField label="Email" type="email" />
          <FormField label="City" />
          <FormField label="Zip" />
        </div>
      </form>
    </FormSection>
  );
};

export default HorizontalForm;
