import React from "react";

const PROPERTY_FEATURES = [
  {
    name: "Swimming pool",
    icon: "pool",
  },
  {
    name: "Terrace",
    icon: "terrace",
  },
  {
    name: "Radio",
    icon: "radio",
  },
  {
    name: "Grill",
    icon: "grill",
  },
  {
    name: "Cable TV",
    icon: "tv",
  },
  {
    name: "Air conditioning",
    icon: "ac",
  },
  {
    name: "Coffee pot",
    icon: "coffee",
  },
  {
    name: "Balcony",
    icon: "balcony",
  },
  {
    name: "Computer",
    icon: "computer",
  },
  {
    name: "Parquet",
    icon: "parquet",
  },
  {
    name: "Internet",
    icon: "wifi",
  },
  {
    name: "Towels",
    icon: "towels",
  },
  {
    name: "Roof terrace",
    icon: "roof",
  },
  {
    name: "Oven",
    icon: "oven",
  },
];

const PropertyFeatures = () => {
  const chunkSize = 5;
  const featuresInRows = Array.from({ length: Math.ceil(PROPERTY_FEATURES.length / chunkSize) }, (_, i) =>
    PROPERTY_FEATURES.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  return (
    <section className="mt-12 bg-white rounded-xl shadow-sm p-8">
      <h3 className="text-xl font-semibold">Property Features</h3>

      <div className="mt-8">
        {featuresInRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap">
            {row.map((feature) => (
              <div
                key={feature.name}
                className="flex items-center gap-2.5 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 py-2.5"
              >
                <img
                  src={`/icons/features/${feature.icon}.svg`}
                  alt=""
                  className="w-6 h-6"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium">{feature.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyFeatures;