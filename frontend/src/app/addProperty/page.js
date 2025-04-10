"use client";

import React from "react";
import Layout from "../../components/Layout/Layout";
import PropertyForm from "../../components/FormElements/PropertyForm";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const AddPropertyPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Add Property</h1>
              <p className="text-gray-600">Add a new property to your listings</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <PropertyForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddPropertyPage;
