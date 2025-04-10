"use client";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import PropertyFilter from "../../components/PropertyList/PropertyFilter";
import PropertyGrid from "../../components/PropertyList/PropertyGrid";

const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/properties');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data.data);
        setTotalResults(data.data.length);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-500 text-center">
            <p className="text-xl font-semibold">Error loading properties</p>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[1744px] w-full px-4 sm:px-6 lg:px-8 mx-auto py-6">
        <div className="w-full">
          <PropertyFilter />

          <div className="flex flex-wrap justify-between items-center mt-6 mb-6">
            <div className="text-sm text-zinc-500">
              Showing 1-{properties.length} of {totalResults} Results
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-slate-700 font-medium mr-2">Sort by:</span>
                <select className="bg-white rounded-xl border border-neutral-200 px-4 py-2 text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="default">Default</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="date_desc">Newest First</option>
                </select>
              </div>
            </div>
          </div>

          <PropertyGrid properties={properties} />
        </div>
      </div>
    </Layout>
  );
};

export default PropertyListPage;
