import "./shared/styles/root.css";
import { useState, useEffect, useMemo} from 'react'
import styles from "./Calendar.module.css"
import classNames from 'classnames';
import {MiniCalendar} from "./miniCalendar/MiniCalendar.jsx";
import { today, subtractMonths, addMonths, generateMonthCalendarDays, isTheSameDay } from "./shared/scripts/date.js"
import { Calendar as CalendarIcon } from 'lucide-react';
import {Nav} from "./nav/Nav.jsx";

function SideBar({selectedDate, setSelectedDate}) {

    return <>
        <div className={styles.sideBar}>
           <div className={styles.sideBar__logo}>
                <CalendarIcon />
                <span className={styles.sideBar_title}>Calendar</span>
           </div>
        </div>
        <MiniCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </>
}
export function Calendar() {
    // const [device, setDevice] = useState(0) // 0 is desktop, 1 phone
    const [view, setView] = useState(0) // 0: months view, 1: weeks view, 2 days view
    const [selectedDate, setSelectedDate] = useState(today());

    return (
        <div className={styles.CalendarApp}>
            <SideBar className={'desktopOnly'} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            <main className={styles.main}>
                <Nav selectedDate={selectedDate} setSelectedDate={setSelectedDate}  
                    view={view} setView={view} className={styles.Nav}/>
            </main>
        </div>
    )
}