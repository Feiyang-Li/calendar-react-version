import "./shared/styles/root.css";
import { useState, useEffect, useMemo, useRef} from 'react'
import styles from "./Calendar.module.css"
import classNames from 'classnames';
import {MiniCalendar} from "./miniCalendar/MiniCalendar.jsx";
import { today, subtractMonths, addMonths, generateMonthCalendarDays, isTheSameDay } from "./shared/scripts/date.js"
import { Calendar as CalendarIcon } from 'lucide-react';
import {Nav} from "./nav/Nav.jsx";
import { mainTest } from "./shared/scripts/testOperate.js";
import MainCalendar from "./mainCalendar/mainCalendar.jsx";
import { LocalStorage } from "./store/localStore.js"
function SideBar({selectedDate, setSelectedDate}) {

    return <>
        <div className={classNames(styles.sideBar, 'desktopOnly')}>
           <div className={styles.sideBar__logo}>
                <CalendarIcon />
                <span className={styles.sideBar_title}>Calendar</span>
           </div>
            <MiniCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
    </>
}
export function Calendar() {
    // const [device, setDevice] = useState(0) // 0 is desktop, 1 phone
    const [view, setView] = useState(0) // 0: months view, 1: weeks view, 2 days view
    const [selectedDate, setSelectedDate] = useState(today());
    const storeKey = useRef("EventStore");
    const eventStore = useMemo(() => {
        return new LocalStorage({
            "uid": Number,
            "date": Date,
            "start": Number,
            "end": Number,
            "title": String,
            "type": String,
            "color": String,
            "comment": String,
            "recordDate": Date
        }, 0, "EventStore")}, []);

    return (
        <div className={styles.CalendarApp}>
            <SideBar className={'desktopOnly'} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            <main className={styles.main}>
                <Nav selectedDate={selectedDate} setSelectedDate={setSelectedDate}  
                    view={view} setView={setView} className={styles.Nav}/>
                <MainCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}  
                    view={view} setView={setView} storage={eventStore} />
            </main>
        </div>
    )
}