'use client'
import React, { useState } from 'react'
import Layout from "../../components/Layout/Layout";
import AddAgentForm from '../../components/FormElements/AddAgentForm';
import UserTable from '../../components/FormElements/UserTable';

const AddAgent = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const tabs = [
        {
            text: 'Add Agent',
            component: <AddAgentForm />
        },
        {
            text: 'Assign Role',
            component: <UserTable/>
        }
    ];
    return (
        <Layout>
            <div className="flex flex-col relative rounded-lg bg-white rounded-b-lg border-r border-gray-100 shadow-sm p-4">
                <div className="flex flex-col gap-4 divide-y-2">
                    <div className="flex">
                        {tabs?.map((tab, index) => (
                            <div className="flex flex-col gap-1 cursor-pointer" key={index} onClick={() => setSelectedIndex(index)}>
                                <p className={`${selectedIndex === index ? 'text-indigo-700' : 'text-[#c2c2c2]'} mx-4 font-semibold`}>{tab.text}</p>
                                {selectedIndex === index && (
                                    <span className="bg-indigo-700 h-[2px]" />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="">
                        {tabs[selectedIndex].component}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AddAgent