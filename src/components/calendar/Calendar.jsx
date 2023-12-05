import { useState } from "react"
import ReactDatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";

function Calendar() {
    const [selectedDate, setDate] = useState(null)

    return(
        <>
            <ReactDatePicker selected={selectedDate} onChange={date=>setDate(date)} showTimeSelect/>
        </>
    )
}

export default Calendar