import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onSearch = (value) => {
        setSearchTerms(value)
        
        props.refreshFunction(value)

    }


    const onChange = (event) => {
        
        setSearchTerms(event.currentTarget.value)

        

    }

    return (
        <div>
            <Search placeholder="Search Video" value={SearchTerms} onChange={onChange} onSearch={onSearch} enterButton />
    
        </div>
    )
}

export default SearchFeature
