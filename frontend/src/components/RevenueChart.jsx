"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const yearlyData = {
  2023: [
    { month: "Jan", revenue: 42000 },
    { month: "Feb", revenue: 38000 },
    { month: "Mar", revenue: 45000 },
    { month: "Apr", revenue: 47000 },
    { month: "May", revenue: 50000 },
    { month: "Jun", revenue: 48000 },
    { month: "Jul", revenue: 53000 },
    { month: "Aug", revenue: 55000 },
    { month: "Sep", revenue: 52000 },
    { month: "Oct", revenue: 58000 },
    { month: "Nov", revenue: 60000 },
    { month: "Dec", revenue: 65000 },
  ],
  2024: [
    { month: "Jan", revenue: 46000 },
    { month: "Feb", revenue: 42000 },
    { month: "Mar", revenue: 49000 },
    { month: "Apr", revenue: 51000 },
    { month: "May", revenue: 54000 },
    { month: "Jun", revenue: 56000 },
    { month: "Jul", revenue: 58000 },
    { month: "Aug", revenue: 62000 },
    { month: "Sep", revenue: 59000 },
    { month: "Oct", revenue: 64000 },
    { month: "Nov", revenue: 67000 },
    { month: "Dec", revenue: 70000 },
  ],
};

const RevenueChart = () => {
  const chartRef = useRef(null);
  const [year, setYear] = useState("2024");
  const chartObj = useRef({});

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        paddingTop: 0,
        paddingBottom: 0,
      })
    );

    chart.get("colors").set("step", 2);
    chart.get("colors").setAll([am5.color("#3B82F6")]);

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
      fill: am5.color("#64748B"),
    });
    yAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
      fill: am5.color("#94A3B8"),
    });

    yAxis.get("renderer").grid.template.setAll({ strokeOpacity: 0.05 });
    xAxis.get("renderer").grid.template.setAll({ visible: false });

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Revenue",
        xAxis,
        yAxis,
        valueYField: "revenue",
        categoryXField: "month",
      })
    );

    // Style the bars
    series.columns.template.setAll({
      width: am5.percent(20),
      cornerRadiusTL: 999,
      cornerRadiusTR: 999,
      cornerRadiusBL: 999,
      cornerRadiusBR: 999,
    });

    xAxis.data.setAll(yearlyData[year]);
    series.data.setAll(yearlyData[year]);

    chart.appear(1000, 100);
    series.appear(1000);

    chartObj.current = { root, xAxis, series };

    return () => root.dispose();
  }, []);

  useEffect(() => {
    if (chartObj.current?.xAxis && chartObj.current?.series) {
      chartObj.current.xAxis.data.setAll(yearlyData[year]);
      chartObj.current.series.data.setAll(yearlyData[year]);
    }
  }, [year]);

  return (
    <section className="grow px-4 min-h-[390px] max-md:max-w-full">
      <article className="w-full bg-white rounded-xl shadow-[0px_5px_5px_rgba(82,63,105,0.05)] max-md:max-w-full">
        <header className="flex flex-wrap justify-between items-center px-8 pt-6 w-full rounded-xl max-md:px-5 max-md:max-w-full">
          <h2 className="pb-2 text-lg font-semibold text-black">Total Revenue</h2>
          <div className="flex gap-2">
            {Object.keys(yearlyData).map((y) => (
              <button
                key={y}
                className={`text-sm px-3 py-1 rounded-full ${
                  y === year ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-700"
                }`}
                onClick={() => setYear(y)}
              >
                {y}
              </button>
            ))}
          </div>
        </header>

        <div className="px-8 pt-2 w-full max-md:px-5 max-md:max-w-full">
          <div className="flex flex-wrap items-center justify-between w-full max-md:max-w-full">
            <h3 className="text-3xl font-semibold text-black whitespace-nowrap">
              ${year === "2024" ? "678,345" : "612,900"}
            </h3>
            <p className="text-sm text-zinc-500">last year ${year === "2024" ? "563,443" : "500,100"}</p>
          </div>

          {/* Chart */}
          <div className="pt-6 pb-4 w-full min-h-[250px]">
            <div ref={chartRef} className="w-full h-[250px]" />
          </div>
        </div>
      </article>
    </section>
  );
};

export default RevenueChart;
