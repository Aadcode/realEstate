"use client";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";

export default function CircularUsageInsights({ progress }) {
    useEffect(() => {
        let root = am5.Root.new("chartdiv");

        root.setThemes([am5themes_Animated.new(root)]);

        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout,
                innerRadius: am5.percent(80),
                startAngle: 180,
                endAngle: 540,
            })
        );

        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: "value",
                categoryField: "category",
                startAngle: 180,
                endAngle: 540,
                innerRadius: am5.percent(80),
            })
        );

        const usageColor = am5.color(0x3b4cca);
        const insightColor = am5.color(0xd46cfa);
        const bgColor = am5.color(0xf0f0f0);

        const halfProgress = progress / 2;
        const remaining = 100 - progress;

        series.data.setAll([
            { category: "Usage", value: halfProgress, fill: usageColor },
            { category: "Insight", value: halfProgress, fill: insightColor },
            { category: "Remaining", value: remaining, fill: bgColor },
        ]);

        series.slices.template.setAll({
            stroke: am5.color(11111111),
            strokeWidth: 5,
            tooltipText: "{category}: {value}%",
        });

        series.slices.template.adapters.add("fill", (fill, target) => {
            return target.dataItem.dataContext.fill;
        });

        chart.seriesContainer.children.push(
            am5.Label.new(root, {
                text: `${progress}%`,
                fontSize: 32,
                fontWeight: "600",
                centerX: am5.percent(50),
                centerY: am5.percent(50),
            })
        );

        return () => {
            root.dispose();
        };
    }, [progress]);

    return <div id="chartdiv" className="w-50 h-50 mx-auto" />;
}
