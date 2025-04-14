'use client'
import Layout from '../../components/Layout/Layout'
import React, { useState } from 'react'
import Breadcrombs from '../../components/Breadcrombs'
import DynamicChart from '../../components/DynamicChart'
import RevenueChart from '../../components/RevenueChart'
import CircularProgress from '../../components/CircularProgress'
import DynamicLineGraph from '../../components/DynamicLineGraph'
import LineProgress from '../../components/LineProgress'
import PropertiesMap from '../../components/PropertiesMap'
import CircularUsageInsights from '../../components/CircularUsageInsights'

const Analytics = () => {

    const breadcrumbData = {
        pathArray: [
            {
                text: 'Property',
                href: '/property'
            },
            {
                text: 'Analytics',
                href: '/analytics'
            },
        ],
    }

    const sampleData = [
        { name: 'April', rent: 200000, sale: 50000 },
        { name: 'May', rent: 320000, sale: 80000 },
        { name: 'June', rent: 150000, sale: 45000 },
        { name: 'July', rent: 310000, sale: 60000 },
        { name: 'Aug', rent: 170000, sale: 40000 },
        { name: 'Sep', rent: 300000, sale: 70000 },
        { name: 'Oct', rent: 120000, sale: 20000 },
        { name: 'Nov', rent: 650000, sale: 100000 },
        { name: 'Dec', rent: 300000, sale: 90000 },
    ];

    const rentProgress = {
        numberFigures: 2783,
        text: 'Properties for Rent',
        tagetValue: 3000,
        timeInterval: 'month',
        color: '#600cf9',
    };

    const tagetLineData = {
        percentage: 70,
        text: 'Target This Month',
    }

    const tagetLineData2 = {
        percentage: 5,
        text: 'Customers',
    };


    const saleProgress = {
        numberFigures: 2483,
        text: 'Properties for Sale',
        tagetValue: 3000,
        timeInterval: 'month',
        color: '#82ca9d',
    }

    const viewProgress = {
        percentage: 70,
        title: 'Product Viewed',
        value: '567/day',
    };

    const listProgress = {
        percentage: 54,
        title: 'Product Listed',
        value: '767/day',
    };

    // State to simulate data refresh
    const [refreshing, setRefreshing] = useState(false);

    // Handle refresh action
    const handleRefresh = () => {
        setRefreshing(true);

        // Simulate an API call or data reload
        setTimeout(() => {
            setRefreshing(false);
            console.log("Data refreshed!");
            // You can call your data fetching or update logic here
        }, 2000); // Simulate a 2-second delay
    };

    return (
        <Layout>
            {/* Analytics Header */}
            <div className="bg-white shadow-md rounded-lg p-4 flex justify-between">
                <div className="">
                    <p className="text-indigo-700 text-xl font-semibold">Analytics</p>
                    <Breadcrombs props={breadcrumbData} />
                </div>
                <div className="">
                    <button
                        onClick={handleRefresh}
                        className="px-5 py-3 text-indigo-600 text-center whitespace-nowrap rounded-xl border border-solid bg-indigo-100 bg-opacity-10 border-indigo-400 border-opacity-10"
                        disabled={refreshing}
                    >
                        {refreshing ? "Refreshing..." : "Refresh"}
                    </button>
                </div>
            </div>


            {/* Graph Section-1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                <DynamicChart
                    data={sampleData}
                    lines={[
                        { key: 'rent', color: '#600cf9', fill: 'url(#colorUv)' },
                    ]}
                    xKey="name"
                    title="Rent Statics"
                    // icon = '' //add icon path 
                    unitType='Total Rent'
                    unitFigures={1234}
                />
                <DynamicChart
                    data={sampleData}
                    lines={[
                        { key: 'sale', color: '#82ca9d', fill: 'url(#colorPv)' },
                    ]}
                    xKey="name"
                    title="Sale Statics"
                    // icon = '' //add icon path 
                    unitType='Total Sale'
                    unitFigures={1234}
                />
            </div>

            {/* Graph Section-2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart />
                <div className="grid grid-cols-2 gap-6">
                    <CircularProgress props={rentProgress} />
                    <CircularProgress props={saleProgress} />
                    <DynamicLineGraph props={tagetLineData} />
                    <DynamicLineGraph props={tagetLineData2} />
                </div>
            </div>

            {/* Graph Section-3 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="col-span-1 flex flex-col gap-6">
                    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-4">
                        <LineProgress props={viewProgress} />
                        <LineProgress props={listProgress} />
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-4">
                        <CircularUsageInsights progress={56} />
                    </div>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-md max-[1280px]:col-span-4 col-span-3">
                    <PropertiesMap />
                </div>
            </div>
        </Layout>
    )
}

export default Analytics