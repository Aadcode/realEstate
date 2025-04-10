"use client";

import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { MoreHorizontal } from "lucide-react";

const SalesRentChart = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    // Axis Colors
    root.interfaceColors.set("grid", am5.color("#E5E7EB")); // Tailwind gray-200
    root.interfaceColors.set("text", am5.color("#6B7280")); // Tailwind gray-500

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
        antialiasing: true,
      })
    );

    const data = [
      { month: "Jan", sale: 300000, rent: 150000 },
      { month: "Feb", sale: 450000, rent: 180000 },
      { month: "Mar", sale: 600000, rent: 220000 },
      { month: "Apr", sale: 800000, rent: 200000 },
      { month: "May", sale: 500000, rent: 300000 },
      { month: "Jun", sale: 400000, rent: 150000 },
      { month: "Jul", sale: 550000, rent: 280000 },
      { month: "Aug", sale: 450000, rent: 190000 },
      { month: "Sep", sale: 700000, rent: 260000 },
      { month: "Oct", sale: 350000, rent: 210000 },
      { month: "Nov", sale: 300000, rent: 500000 },
      { month: "Dec", sale: 600000, rent: 320000 },
    ];

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30,
        }),
      })
    );
    xAxis.data.setAll(data);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        min: 0,
        max: 1000000,
        extraMax: 0.1,
        numberFormat: "#a", // Shows as 200k, 400k, etc.
      })
    );

    const saleSeries = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Total Sale",
        xAxis,
        yAxis,
        valueYField: "sale",
        categoryXField: "month",
        fill: am5.color("#6366F1"),
        stroke: am5.color("#4338CA"),
        tension: 0.7,
      })
    );

    saleSeries.fills.template.setAll({
      visible: true,
      fillOpacity: 0.2,
    });

    saleSeries.strokes.template.setAll({
      strokeWidth: 3,
    });

    const rentSeries = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Total Rent",
        xAxis,
        yAxis,
        valueYField: "rent",
        categoryXField: "month",
        fill: am5.color("#10B981"),
        stroke: am5.color("#047857"),
        tension: 0.7,
      })
    );

    rentSeries.fills.template.setAll({
      visible: true,
      fillOpacity: 0.2,
    });

    rentSeries.strokes.template.setAll({
      strokeWidth: 3,
    });

    saleSeries.data.setAll(data);
    rentSeries.data.setAll(data);

    chart.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-lg font-semibold text-black">Overview</h2>
        <button className="text-gray-500 hover:text-gray-800">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Stats row */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center">
            <span className="text-white text-xs">🏠</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Sale</p>
            <p className="font-semibold text-black">2,346 Unit</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-xs">🏘️</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Rent</p>
            <p className="font-semibold text-black">1,252 Unit</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div
        ref={chartRef}
        className="w-full"
        style={{ height: "300px", minHeight: "280px" }}
      />
    </div>
  );
};

export default SalesRentChart;
