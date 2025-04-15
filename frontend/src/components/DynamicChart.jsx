import Image from 'next/image';
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    ComposedChart
} from 'recharts';

const DynamicChart = ({
    data = [],
    lines = [],
    xKey = 'name',
    title = '',
    icon = '',
    unitType = '',
    unitFigures = 100
}) => {
    return (
        <div className="w-full flex flex-col gap-4 bg-white shadow-md rounded-lg p-4 min-h-[400px]">
            <div className='flex justify-between items-start'>
                <div className='flex flex-col gap-1'>
                    {title && <p className="text-xl text-gray-600 font-semibold">{title}</p>}
                    <div className='flex gap-1 items-center'>
                        {icon && (
                            <Image src={icon} alt='alt' width={60} height={60} />
                        )}
                        {
                            unitType && (
                                <div className='flex flex-col '>
                                    <p className="text-sm text-gray-400 font-medium">{unitType}</p>
                                    <p className='text-lg text-gray-700 font-semibold'> {unitFigures} units</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div>
                    <button className="px-4 py-2 cursor-pointer text-indigo-700 font-semibold text-center whitespace-nowrap rounded-xl border border-solid bg-transparent border-indigo-700">
                        Download CSV
                    </button>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#600cf9" stopOpacity={1} />
                            <stop offset="100%" stopColor="#600cf9" stopOpacity={0.3} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={1} />
                            <stop offset="100%" stopColor="#82ca9d" stopOpacity={0.3} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend verticalAlign="top" height={30}/> */}
                    {lines.map((line, index) => (
                        <Area
                            key={index}
                            type="monotone"
                            dataKey={line.key || 900}
                            strokeWidth={3}
                            stroke={line.color}
                            fill={line.fill}
                        // activeDot={{ r: 6 }}
                        />
                    ))}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DynamicChart;
