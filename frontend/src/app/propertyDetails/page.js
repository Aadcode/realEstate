"use client";
import React from "react";
import Layout from "../../components/Layout/Layout";
import PropertyHeader from "../../components/PropertyDetails/PropertyHeader";
import PropertyGallery from "../../components/PropertyDetails/PropertyGallery";
import PropertyFeatures from "../../components/PropertyDetails/PropertyFeatures";
import PropertyLocation from "../../components/PropertyDetails/PropertyLocation";
import PropertyAgent from "../../components/PropertyDetails/PropertyAgent";

const PropertyDetails = () => {
  return (
    <Layout>
      <PropertyHeader />
      <PropertyGallery />
      <PropertyFeatures />
      <PropertyLocation />
      <PropertyAgent />
    </Layout>
  );
};

export default PropertyDetails;
