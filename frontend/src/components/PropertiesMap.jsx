"use client";

import React, { useRef, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

const MapChart = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);

    // Chart setup
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "translateY",
        projection: am5map.geoMercator(), // or geoNaturalEarth1()
        wheelY: "none",
        wheelX: "none",
      })
    );

    // Add polygon series
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"], // optional
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x6366f1), // Tailwind indigo-500
    });

    // Handle click event
    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      const name = ev.target.dataItem.dataContext.name;
      alert(`Clicked: ${name}`);
    });

    // Add zoom controls
    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} className="w-full h-[400px] rounded-lg" />;
};

const LocationProgress = ({ location, units }) => {
  const getProgressWidth = () => {
    const maxWidth = 300;
    const percentage = (units / 1000) * 100;
    return Math.min(maxWidth, (percentage / 100) * maxWidth);
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-center w-full font-medium">
        <h3 className="self-stretch my-auto text-base text-black">
          {location}
        </h3>
        <p className="self-stretch pl-2 my-auto text-sm text-neutral-500">
          {units} Unit
        </p>
      </div>
      <div className="flex overflow-hidden items-start mt-2 w-full bg-gray-200 rounded-xl min-h-2.5">
        <div
          className="flex bg-indigo-700 rounded min-h-2.5"
          style={{ width: `${getProgressWidth()}px` }}
        />
      </div>
    </div>
  );
};

const PropertiesMap = () => {
  const locations = [
    { name: "Europe", units: 653 },
    { name: "Asia", units: 653 },
    { name: "Africa", units: 653 },
    { name: "Australia", units: 653 },
    { name: "America", units: 653 },
    { name: "USA", units: 653 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-[0px_5px_5px_rgba(82,63,105,0.05)] p-6">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-black">
          Properties Map Location
        </h2>
        <button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/643f2d2e979793145a9200f4e5671d104e176e5c?placeholderIfAbsent=true"
            alt="Menu"
            className="w-6 h-6"
          />
        </button>
      </header>

      <div className="flex gap-5 max-md:flex-col">
        <div className="w-1/2 max-md:w-full">
          <div className="px-4">
            {locations.map((location, index) => (
              <LocationProgress
                key={index}
                location={location.name}
                units={location.units}
              />
            ))}
          </div>
        </div>

        <div className="w-1/2 max-md:w-full">
          <MapChart />
        </div>
      </div>
    </div>
  );
};

export default PropertiesMap;
