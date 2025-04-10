"use client";

import React, { useRef, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const PieChart = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: 0,
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Users",
        valueField: "value",
        categoryField: "category",
      })
    );

    series.data.setAll([
      { category: "Agent", value: 38 },
      { category: "Customers", value: 62 },
    ]);

    series.appear(1000, 100);

    series.get("colors").set("colors", [
      am5.color("#FDBA74"), // orange-400
      am5.color("#A855F7"), // purple-500
    ]);

    series.labels.template.setAll({
      text: "{value.percent.formatNumber('0.')}%",
      fill: am5.color(0xffffff),
      fontWeight: "500",
    });

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 0,
      })
    );

    legend.data.setAll(series.dataItems);

    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} className="w-full h-[400px]" />;
};

export default PieChart;
