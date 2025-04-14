import InputStyles from '../../components/DataEntry/InputStyles'
import Breadcrombs from '../../components/Breadcrombs'
import Layout from '../../components/Layout/Layout'
import React from 'react'
import Checkboxes from '../../components/DataEntry/Checkboxes'
import TextArea from '../../components/DataEntry/TextArea'
import InputSizes from '../../components/DataEntry/InputSizes'
import CustomSelects from '../../components/DataEntry/CustomSelects'
import HorizontalForm from '../../components/FormElements/HorizontalForm'
import SelectList from '../../components/DataEntry/SelectList'
import VerticalForm from '../../components/FormElements/VerticalForm'
import CheckboxVariants from '../../components/DataEntry/CheckboxVariants'
import InlineCheckboxes from '../../components/FormElements/InlineCheckboxes'

const page = () => {

    const breadcrumbData = {
        pathArray: [
            {
                text: 'Form',
                href: '/'
            },
            {
                text: 'Element',
                href: '/dataEntry'
            },
        ],
    }

    return (
        <Layout>
            <div className="bg-white shadow-md rounded-lg p-4 flex justify-between">
                <Breadcrombs props={breadcrumbData} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                    <InputStyles />
                    <TextArea />
                    <CustomSelects />
                    <HorizontalForm/>
                    <CheckboxVariants />
                </div>
                <div className="flex flex-col gap-6">
                    <Checkboxes />
                    <InputSizes />
                    <SelectList />
                    <VerticalForm/>
                    <InlineCheckboxes/>
                </div>
            </div>
        </Layout>
    )
}

export default page