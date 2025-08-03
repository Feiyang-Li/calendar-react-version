// for the top navigation bar
import styles from "./Nav.module.css"
import { useState } from 'react'
import { Menu as MenuIcon, CalendarDays as CalendarDaysIcon, ChevronLeft, ChevronRight, ChevronDown} from 'lucide-react';
import classNames from 'classnames';
import { MiniCalendar } from "../miniCalendar/MiniCalendar";
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});

export function Nav({selectedDate, setSelectedDate, view, setView}) {

    function openMobileSideBar() {
        // open the mobileSideBar dialog. 
    }

    const mobileSideBar = <dialog>

        
    </dialog>
    return <div className={styles.Nav}>
        <button className={classNames('Cal__button', 'Cal__button--icon', 'Cal__button--secondary', 'mobileOnly')} onClick={() => openMobileSideBar()} >
            <MenuIcon className={'button__icon'}/>
        </button>
        <div className={styles.nav_dateInfo}>
            <button className={classNames('Cal__button', 'Cal__button--secondary', 'desktopOnly')}>Today</button>
            <button className={classNames('Cal__button', 'Cal__button--icon', 'Cal__button--secondary', 'mobileOnly')}><CalendarDaysIcon className={'button__icon'}/></button>
            <div className={styles.nav__arrows}>
                <button className={classNames('Cal__button', 'Cal__button--icon', 'Cal__button--secondary')}>
                    <ChevronLeft className={'button__icon'}/>
                </button>
                <button className={classNames('Cal__button', 'Cal__button--icon', 'Cal__button--secondary')}>
                    <ChevronRight className={'button__icon'}/>
                </button>
            </div>
            <time className={styles.nav__date}>{dateFormatter.format(selectedDate)}</time>
        </div>
        <div className={classNames(styles.Nav__select, 'desktopOnly')}>
            <select className={styles.Nav__select__select}>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
            </select>
            <ChevronDown />
        </div>
    </div>
}