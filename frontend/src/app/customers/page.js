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
        const response = await fetch("http://localhost:8000/api/v1/users");
        const data = await response.json();

        if (data.success) {
          // Filter users to only show customers and include avatar
          const customerUsers = data.data
            .filter(user => user.role === 'CUSTOMER')
            .map(customer => ({
              ...customer,
              avatar: customer.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60"
            }));
          setCustomers(customerUsers);
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
                  location={customer.location || "Unknown"}
                  status="Active"
                  avatar={customer.avatar}
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
