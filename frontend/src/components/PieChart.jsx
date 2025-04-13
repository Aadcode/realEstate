"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const PieChart = () => {
  const chartRef = useRef(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/users");
        const data = await response.json();
        
        if (data.success) {
          // Count agents and customers
          let agentCount = 0;
          let customerCount = 0;
          
          data.data.forEach((user) => {
            if (user.role === "AGENT") {
              agentCount++;
            } else if (user.role === "CUSTOMER") {
              customerCount++;
            }
          });

          // Calculate percentages
          const total = agentCount + customerCount;
          const agentPercentage = Math.round((agentCount / total) * 100);
          const customerPercentage = 100 - agentPercentage;

          setUserData([
            { category: "Agent", value: agentPercentage },
            { category: "Customers", value: customerPercentage }
          ]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  useLayoutEffect(() => {
    if (userData.length === 0) return;

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

    series.data.setAll(userData);
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
  }, [userData]);

  return <div ref={chartRef} className="w-full h-[400px]" />;
};

export default PieChart;