import styles from "./MiniCalendar.module.css"
import classNames from 'classnames';
import { today, subtractMonths, addMonths, generateMonthCalendarDays, isTheSameDay } from "../shared/scripts/date.js"
import {useEffect, useState} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: 'long',
  year: 'numeric'
});

export function MiniCalendar({selectedDate, setSelectedDate}) {
    const [monthCalendarDays, setmonthCalendarDays] = useState([]);
    useEffect(() => {
        setmonthCalendarDays(generateMonthCalendarDays(selectedDate));
    }, [selectedDate])


    return <>
        <div className={styles.miniCalendar}>
            <div className={styles.miniCalendar__header}>
                <time className={styles.miniCalendar__date}>{dateFormatter.format(selectedDate)}</time>
                <div className={styles.miniCalendar__controls}>
                    <button className={classNames('Cal__button', 'Cal__button--icon', 'Cal__button--secondary', 'Cal__button--sm')}>
                        <ChevronLeft className={styles.button__icon}/>
                    </button>
                    <button className={classNames('Cal__button', 'Cal__button--icon', 'Cal__button--secondary', 'Cal__button--sm')}>
                        <ChevronRight className={styles.button__icon} />
                    </button>
                </div>
            </div>
            <div className={styles.miniCalendar__content}>
                <ul className={styles.miniCalendar__dayOfWeekList}>
                    <li className={styles.miniCalendar__dayOfWeek}>S</li>
                    <li className={styles.miniCalendar__dayOfWeek}>M</li>
                    <li className={styles.miniCalendar__dayOfWeek}>T</li>
                    <li className={styles.miniCalendar__dayOfWeek}>W</li>
                    <li className={styles.miniCalendar__dayOfWeek}>T</li>
                    <li className={styles.miniCalendar__dayOfWeek}>F</li>
                    <li className={styles.miniCalendar__dayOfWeek}>S</li>
                </ul>
            </div>

        </div>
    </>
}