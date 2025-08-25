import styles from "./weekCal.module.css";
import classNames from "classnames";
import {generateWeekDays} from "../shared/scripts/date.js"
import { useEffect, useState, useRef} from 'react'
import {today, isTheSameDay} from "../shared/scripts/date.js"
function DayOfWeek({date, idx}) {
    // return a buttom with 
    const rep = {0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat"};
    let itemClass = []
    if (isTheSameDay(today(), date)) {
      itemClass = [styles.weekCalendar__dayOfWeek__button, styles.weekCalendar__dayOfWeek__button__highlight];
    } else {
      itemClass = [styles.weekCalendar__dayOfWeek__button]
    }
    return(
      <li className={
        classNames(styles.weekCalendar__dayofWeek__item)
        } key={idx}>
          <button className={classNames(...itemClass)}>
              <span className={styles.weekCalendar__dayOfWeek__day}>{rep[date.getDay()]}</span>
              <span className={styles.weekCalendar__dayOfWeek__date}>{date.getDate()}</span>
          </button>
      </li>
    )
}

function Cell() {
const r = useRef(
  [...Array(1380 / 60 + 1)].map((_, i) => String(i * 60))
);

  return (
    <div className={styles.weekCalendar__column} >
      {
        r.current.map((ele, idx) => (
          <div className={classNames(styles.weekCalendar__cell)} key={idx} dateWeekCalendarCell={ele}> </div>
        ))
      } 
    </div>
  )
}
export default function WeekCal({ storage, selectedDate, setSelectedDate }) {
    const clocks = ["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", 
                    "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
                    "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"];
    const [dayOfWeeks, setDayOfWeeks] = useState(generateWeekDays(selectedDate));
    useEffect(() => {
        setDayOfWeeks(generateWeekDays(selectedDate));
    }, [selectedDate]);
    return (
    <>
      <div className={styles.weekCalendar}>
        <ul className={styles.weekCalendar__dayOfWeekList}>
            {dayOfWeeks.map((ele, idx) => (
              <DayOfWeek date={ele} idx={idx} />
            ))}

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
                <Cell />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
