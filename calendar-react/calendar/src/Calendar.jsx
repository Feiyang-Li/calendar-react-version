import "./shared/styles/root.css";
import { useState, useEffect, useMemo, useRef} from 'react'
import styles from "./Calendar.module.css"
import classNames from 'classnames';
import {MiniCalendar} from "./miniCalendar/MiniCalendar.jsx";
import { today, subtractMonths, addMonths, generateMonthCalendarDays, isTheSameDay } from "./shared/scripts/date.js"
import {Nav} from "./nav/Nav.jsx";
import { mainTest } from "./shared/scripts/testOperate.js";
import MainCalendar from "./mainCalendar/mainCalendar.jsx";
import { LocalStorage } from "./store/localStore.js"
import SideBar from "./sideBar/SideBar.jsx";
import { useWindowSize } from "./shared/scripts/windows.js";

export function Calendar() {
    // const [device, setDevice] = useState(0) // 0 is desktop, 1 phone
    const [view, setView] = useState(0) // 0: months view, 1: weeks view, 2 days view
    const [selectedDate, setSelectedDate] = useState(today());
    const storeKey = useRef("EventStore");
    const { width } = useWindowSize();

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
    const [storeSingle, setStoreSingle] = useState(true);
    return (
        <div className={styles.CalendarApp}>
            {
                width > 768 && (
                    <SideBar single = {[storeSingle, setStoreSingle]} storage={eventStore} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                )
            }
            <main className={styles.main}>
                <Nav storage={eventStore} single = {[storeSingle, setStoreSingle]} selectedDate={selectedDate} setSelectedDate={setSelectedDate}  
                    view={view} setView={setView} className={styles.Nav}/>
                <MainCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}  
                    view={view} setView={setView} storage={eventStore} single = {[storeSingle, setStoreSingle]} />
            </main>
        </div>
    )
}