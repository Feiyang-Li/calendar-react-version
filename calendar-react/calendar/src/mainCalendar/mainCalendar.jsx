import styles from "./mainCalendar.module.css"

import {useState, useEffect} from 'react'
import DayCal from "./dayCal"
import WeekCal from "./weekCal"
import YearCal from "./yearCal"

export default function MainCalendar({storage, view, setView, selectedDate, setSelectedDate}) {
    const [calendar, setCalendar] = useState(<WeekCal storage={storage} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />)
    
    useEffect(() => {
        switch(view) {
            case 0:
                setCalendar(<DayCal storage={storage} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />)
                break; 
            case 1:
                setCalendar(<WeekCal storage={storage} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />)
                break;
            case 2:
                setCalendar(<YearCal storage={storage} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />)
                break;
            default:
                throw("View must be 0,1,2");
        }
    }, [view])

    return <>
        {calendar}
    </>
}