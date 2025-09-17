// Reusable module for the sideBar

import styles from "./SideBar.module.css"
import classNames from 'classnames';
import { Calendar as CalendarIcon } from 'lucide-react';
import { MiniCalendar } from "../miniCalendar/MiniCalendar";
import StorePromp from "../StorePromp/StorePromp";
import {useState} from 'react';

export default function SideBar({storage, selectedDate, setSelectedDate, single}) {
    const [storePrompOpen, setStorePrompOpen] = useState(false);
    function invocationCreation(selectedDate) {
        setStorePrompOpen(true);
    }
    return (
        <div className={classNames(styles.sideBar)}>
           <div className={styles.sideBar__logo}>
                <CalendarIcon />
                <span className={styles.sideBar_title}>Calendar</span>
           </div>
           {/* storage pop up */}
           <button className={classNames("Cal__button", "Cal__button--primary", "Cal__button--lg")} onClick={() => invocationCreation(selectedDate)}>Create event</button>
            <MiniCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <StorePromp selectedDate={selectedDate} open={storePrompOpen} onClose={() => setStorePrompOpen(false)} storage={storage}  single={single}/>
        </div>
    )
}