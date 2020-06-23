import React, { useState } from 'react'
import { Collapse, Radio } from 'antd';
import { combineReducers } from 'redux';
const { Panel } = Collapse;


function RadioBox(props) {

    const [Value, setValue] = useState('12')

    const renderRadioBox = () => (
        props.list &&  props.list.map((value) => (
            <Radio key={value.number} value={`${value.number}`}>{value.name}</Radio>
        ))
    )

    const handleChange = (event) => {
        
        setValue(event.target.value)
        props.handleFilters(event.target.value)
    }

    return (
        <div>
            <Collapse defaultActiveKey={['12']}>
                <Panel header="Select Number of videos" key="1">
                    <Radio.Group onChange={handleChange} value={Value}>

                        {renderRadioBox()}

                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
