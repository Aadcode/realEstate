'use client'
import React, { useEffect, useRef } from 'react'
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const CircularProgress = ({ props }) => {

    const { numberFigures, text, tagetValue, timeInterval, color } = props;

    const chartRef = useRef(null);
    const percentage = Math.round(((numberFigures - tagetValue) / tagetValue) * 100);

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
            cornerRadius: 20,
            strokeWidth: 2,
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

    return (
        <div className='flex justify-between items-start bg-white shadow-md rounded-lg p-4'>
            <div>
                <p className='text-black text-2xl font-bold'>{numberFigures}</p>
                <p className='text-gray-700 font-semibold'>{text}</p>
                <p className='text-gray-400'>Target {tagetValue}/{timeInterval}</p>
            </div>
            <div>
                <div ref={chartRef} className="w-30 h-30" />
            </div>
        </div>
    )
}

export default CircularProgress


