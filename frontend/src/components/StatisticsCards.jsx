"use client";
import React, { useEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const RadialProgress = ({ value, target, color }) => {
  const chartRef = useRef(null);
  const percentage = Math.min(Math.round((value / target) * 100), 100);

  useEffect(() => {
    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(80),
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
      })
    );

    series.data.setAll([
      { category: "Filled", value: percentage },
      { category: "Remaining", value: 100 - percentage },
    ]);

    series.slices.template.setAll({
      cornerRadius: 10,
      strokeWidth: 0,
    });

    series.slices.template.adapters.add("fill", (fill, target) => {
      return target.dataItem?.dataContext.category === "Filled"
        ? am5.color(color)
        : am5.color("#E5E7EB"); // Tailwind gray-200
    });

    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    chart.children.unshift(
      am5.Label.new(root, {
        text: `${percentage}%`,
        fontSize: 16,
        fontWeight: "500",
        fill: am5.color("#000000"), // You can use "white" if you want light text
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        textAlign: "center",
      })
    );

    return () => root.dispose();
  }, [percentage, color]);

  return <div ref={chartRef} className="w-16 h-16" />;
};

const StatisticsCards = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/properties");
        const data = await res.json();
        if (data.success) {
          setProperties(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      }
    };

    fetchProperties();
  }, []);

  const totalProperties = properties.length;
  const forSaleCount = properties.filter((p) => p.status === "FOR_SALE").length;
  const forRentCount = properties.filter((p) => p.status === "FOR_RENT").length;

  const totalTarget = 6000; // Adjust based on your real monthly goal

  return (
    <section className="grow min-h-[363px] w-full h-full flex flex-col items-stretch gap-4">
      <div className="w-full flex-1 flex items-stretch">
        <article className="relative flex flex-col justify-center w-full bg-red-500 rounded-xl min-h-[146px] shadow-md overflow-hidden">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/b9ae6a819f61e0cb0999470052ea03b938f82886"
            alt="Background pattern"
            className="absolute inset-0 z-0 w-full h-full object-cover opacity-10"
          />
          <div className="relative z-10 flex items-center justify-between p-6 md:p-8">
            <div className="flex items-start gap-4 md:gap-6 flex-grow">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/2b6075c19a426a3ba97623e1e42e6d57ca1ba2fc"
                alt="Properties icon"
                className="w-12 h-12 md:w-16 md:h-16"
              />
              <div className="flex-grow max-w-xl">
                <h2 className="text-xl md:text-2xl font-semibold text-white">Total Properties</h2>
                <div className="h-2 w-full bg-white/30 rounded-lg mt-3 md:mt-4 overflow-hidden">
                  <div
                    className="bg-white h-full transition-all duration-500"
                    style={{
                      width: `${Math.min((totalProperties / totalTarget) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="mt-2 text-xs md:text-sm text-white">
                  {totalProperties > 0
                    ? `${totalProperties - 431} more to break last month record`
                    : "Loading..."}
                </p>
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white ml-4">{totalProperties}</div>
          </div>
        </article>
      </div>

      <div className="flex-1 grid max-xl:grid-cols-1 grid-cols-2 gap-4 md:gap-6">
        <PropertyTypeCard
          title="Properties for Sale"
          count={forSaleCount}
          target={3000}
          color="#6366F1"
        />
        <PropertyTypeCard
          title="Properties for Rent"
          count={forRentCount}
          target={3000}
          color="#10B981"
        />
      </div>
    </section>
  );
};

const PropertyTypeCard = ({ title, count, target, color }) => {
  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-4 md:p-6 flex flex-wrap items-center justify-start">
      <div>
        <h3 className="text-2xl md:text-3xl font-semibold text-black">
          {count.toLocaleString()}
        </h3>
        <p className="text-sm md:text-base font-medium text-black mt-1 md:mt-2">
          {title}
        </p>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          Target {target.toLocaleString()}/month
        </p>
      </div>
      <div className="mx-auto">
        <RadialProgress value={count} target={target} color={color} />
      </div>
    </div>
  );
};

export default StatisticsCards;
