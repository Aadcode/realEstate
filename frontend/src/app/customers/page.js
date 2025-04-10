"use client";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import CustomerHeader from "../../components/CustomerList/CustomerHeader";
import CustomerCard from "../../components/CustomerList/CustomerCard";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/customers");
        const data = await response.json();

        if (data.success) {
          setCustomers(data.data); // Extract customer data from API response
        } else {
          throw new Error("Failed to fetch customers");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <CustomerHeader />

        {/* Show loading message */}
        {loading && <p className="text-center text-gray-500">Loading customers...</p>}

        {/* Show error message */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Display customer cards if data is available */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  id={customer.id}
                  name={customer.name}
                  email={customer.email}
                  phone={customer.phone || "N/A"}
                  location="Unknown" // No location in API response, setting a default
                  status="Active" // Assuming all customers are active
                  image="https://cdn.builder.io/api/v1/image/assets/TEMP/cf3b9227ce103ede32e1755f81ee85a77cff7bcc" // Default image
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No customers found.</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CustomersPage;
