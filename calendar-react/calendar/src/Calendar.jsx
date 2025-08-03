import "./shared/styles/root.css";
import { useState, useEffect, useMemo} from 'react'
import styles from "./Calendar.module.css"
import classNames from 'classnames';
import {MiniCalendar} from "./miniCalendar/MiniCalendar.jsx"
import { today, subtractMonths, addMonths, generateMonthCalendarDays, isTheSameDay } from "./shared/scripts/date.js"
import { Calendar as CalendarIcon } from 'lucide-react';


function SideBar({selectedDate, setSelectedDate}) {

    return <>
        <div className={styles.sideBar}>
           <div className={styles.sideBar__logo}>
                <CalendarIcon />
           </div>
           <span className={styles.sideBar_title}>Calendar</span>
        </div>
        <MiniCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </>
}

function MultiSelect() {

}
export function Calendar() {
    const [device, setDevice] = useState(0) // 0 is desktop, 1 phone
    const [selectedDate, setSelectedDate] = useState(today());

    let side;
    if (!side) {
        side = <SideBar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>;
    } else {
        side = <MultiSelect />;
    }
    return (
        <>  
        {side}

        </>
    )
}