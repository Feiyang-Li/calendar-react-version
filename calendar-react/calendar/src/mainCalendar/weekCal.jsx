import styles from "./weekCal.module.css";
import classNames from "classnames";
import {today} from "../shared/scripts/date.js"
import { useEffect} from 'react'
function DayOfWeek({date, week}) {
    // return a buttom with 
    const rep = {0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat"};
    <li className={styles.weekCalendar__dayofWeek__item}>
        <button className={styles.weekCalendar__dayOfWeek__button}>
            <span className={styles.weekCalendar__dayOfWeek__day}>{rep[week]}</span>
            <span className={styles.weekCalendar__dayOfWeek__date}>{date}</span>
        </button>
    </li>
}

export default function WeekCal({ storage, selectedDate, setSelectedDate }) {
    const clocks = ["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", 
                    "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
                    "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"];
                    
    useEffect(() => {

    }, [])
    return (
    <>
      <div className={styles.weekCalendar}>
        <ul className={styles.weekCalendar__dayOfWeekList}>


        </ul>
        <ul className={styles.weekCalendar__allDayList}>


        </ul>
        <div className={styles.weekCalendar__content}>
          <div className={styles.weekCalendar__content_inner}>
            <ul className={styles.weekCalendar__timeList}>
                {
                    clocks.map((ele, idx) => (<li className={styles.weekCalendar__timeItem} key={idx}>
                        <time className={styles.weekCalendar__time}>{ele}</time>
                    </li>))
                }
            </ul>
            <div className={styles.weekCalendar__columns}>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
