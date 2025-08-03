import "../shared/styles/button.css"
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
    const todayDate = today();
    const [monthCalendarDays, setMonthCalendarDays] = useState([]);
    function handleDaysElementClick(day) {
        setSelectedDate(day);
    }
    function handleMonthDecrease(date) {
        setSelectedDate(
            subtractMonths(date, 1)
        )
    }
    function handleMonthIncrease(date) {
        setSelectedDate(
            addMonths(date, 1)
        )
    }
    useEffect(() => {
        // no rerendering if month is the same
        if(monthCalendarDays.length >= 16 && monthCalendarDays[15].getMonth() == selectedDate.getMonth() && monthCalendarDays[15].getFullYear() === selectedDate.getFullYear()) {
            return;
        } 
        setMonthCalendarDays(generateMonthCalendarDays(selectedDate));
    }, [selectedDate])

    const monthCalendarDaysElements = monthCalendarDays.map((day, index) => {
        let classNameVal = [styles.miniCalendar__day, "Cal__button", "Cal__button--sm"];
        if (isTheSameDay(day, todayDate)) {
            classNameVal.push(styles.dayListItem__isToday);
        } 
        if (day.getMonth() != selectedDate.getMonth()) {
            classNameVal.push(styles.dayListItem__isOtherMonth);
        }
        if (isTheSameDay(day, selectedDate)) {
            classNameVal.push(styles.dayListItem__isSelectedDate, "Cal__button--primary")
        } else {
            classNameVal.push("Cal__button--secondary")
        }
        return <li key={index} className={classNames(styles.miniCalendar__dayListItem)}>
                <button className={classNames(...classNameVal)} onClick={() => handleDaysElementClick(day)}>
                    {day.getDate()}
                </button>
        </li>

    })

    return <>
        <div className={styles.miniCalendar}>
            <div className={styles.miniCalendar__header}>
                <time className={styles.miniCalendar__date}>{dateFormatter.format(selectedDate)}</time>
                <div className={styles.miniCalendar__controls}>
                    <button className={classNames('Cal__button', 'Cal__button--icon', 'Cal__button--secondary', 'Cal__button--sm')} onClick={() => handleMonthDecrease(selectedDate)}>
                        <ChevronLeft className={'button__icon'}/>
                    </button>
                    <button className={classNames('Cal__button', 'Cal__button--icon', 'Cal__button--secondary', 'Cal__button--sm')} onClick={() => handleMonthIncrease(selectedDate)}>
                        <ChevronRight className={'button__icon'} />
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
                <ul className={styles.miniCalendar__dayList}>
                    {monthCalendarDaysElements}
                </ul>
            </div>


        </div>
    </>
}