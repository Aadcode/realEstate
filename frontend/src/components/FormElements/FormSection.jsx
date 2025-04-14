import React from "react";

const FormSection = ({ title, children }) => {
  return (
    <section className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="mb-4 text-lg font-semibold leading-7 text-black">{title}</h2>
      {children}
    </section>
  );
};

export default FormSection;
