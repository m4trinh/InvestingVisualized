import React, { useState } from 'react'

interface Props {
    initialYear: number,
    endYear: number,
    startYear: number,
    onChange: Function
}

const YearPickerSelect = (props: Props) => {
    const [year, setYear] = useState(props.initialYear);
    const handleChange = e => {
        const targetValue = e.target.value;
        let year = props.initialYear;
        if (!isNaN(targetValue)){
            year = parseInt(targetValue);
        }
        setYear(year);
        props.onChange(year);
    }
    return (
        <select className="form-control" style={{width: '85px'}} value={year} onChange={handleChange}>
            {[...Array(props.endYear - props.startYear)].map( (x, i) => <option key={i} value={i + props.startYear}> {i + props.startYear} </option> )}
        </select>
    )
}

export default YearPickerSelect;