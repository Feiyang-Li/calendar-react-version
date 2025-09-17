import styles from "./mainCalendar.module.css"

import {useState, useEffect} from 'react'
import DayCal from "./dayCal"
import WeekCal from "./weekCal"
import YearCal from "./yearCal"




export default function MainCalendar({single, storage, view, setView, selectedDate, setSelectedDate}) {
    const [calendar, setCalendar] = useState(<WeekCal single={single} storage={storage} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />)
    useEffect(() => {
        switch(view) {
            case 0:
                setCalendar(<DayCal single={single} storage={storage} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />)
                break; 
            case 1:
                setCalendar(<WeekCal single={single} storage={storage} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />)
                break;
            case 2:
                setCalendar(<YearCal single={single} storage={storage} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />)
                break;
            default:
                throw("View must be 0,1,2");
        }
    }, [view, selectedDate, single[0]])

    return <>
        {calendar}
    </>
}