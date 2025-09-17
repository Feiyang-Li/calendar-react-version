// for the top navigation bar
import styles from "./nav.module.css"
import { useState, useRef } from 'react'
import { Menu as MenuIcon, CalendarDays as CalendarDaysIcon, ChevronLeft, ChevronRight, ChevronDown, Settings as Setter} from 'lucide-react';
import classNames from 'classnames';
import { MiniCalendar } from "../miniCalendar/MiniCalendar";
import Dialog from "../shared/scripts/dialog.jsx"
import {today} from "../shared/scripts/date.js"
import DbConnectionDialog from "../store/DbConnectDialog.jsx"
import SideBar from "../sideBar/SideBar.jsx";
// import DbReconnection from "../store/DbConnection.js"
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});

export function Nav({single, storage, selectedDate, setSelectedDate, view, setView}) {
    const dialogRef = useRef(null)
    const [mobileSideBarOpen, setMobileSideBarOpen] = useState(false);
    const [DbConnectDialogOpen, setDbConnectDialogOpen] = useState(false);
    const numToView = ["day", "week", "month"];
    const viewToNum = {"day": 0, "week": 1, "month": 2};
    const handleViewChange = (e) => {
        const val = e.target.value;
        setView(viewToNum[val] ?? 0);
    }
    function setdayToday() {
        setSelectedDate(today())
    }
    const mobileSideBarV2 = <Dialog open={mobileSideBarOpen} onClose={()=>setMobileSideBarOpen(false)} className={classNames('Cal__dialog', 'Cal__dialog--sidebar')}>

        <div className={"Cal__dialog__wrapper"}>
            <div className={"Cal__dialog__content"}>
                <SideBar single={single} storage={storage} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            </div>
        </div>
    </Dialog>

    return <div className={styles.nav}>
        <button className={classNames('Cal__button', 'Cal__button--icon', 'Cal__button--secondary', 'mobileOnly')} onClick={() => setMobileSideBarOpen(true)} >
            <MenuIcon className={'button__icon'}/>
        </button>
        <div className={styles.nav__dateInfo}>
            <div className={styles.nav__control}>
                <button className={classNames('Cal__button', 'Cal__button--secondary', 'desktopOnly')} onClick={() => setdayToday()}>Today</button>
                <button className={classNames('Cal__button', 'Cal__button--icon', 'Cal__button--secondary', 'mobileOnly')} onClick={() => setdayToday()}><CalendarDaysIcon className={'button__icon'}/></button>
                <div className={styles.nav__arrows}>
                    <button className={classNames('Cal__button', 'Cal__button--icon', 'Cal__button--secondary')}>
                        <ChevronLeft className={'button__icon'}/>
                    </button>
                    <button className={classNames('Cal__button', 'Cal__button--icon', 'Cal__button--secondary')}>
                        <ChevronRight className={'button__icon'}/>
                    </button>
                </div>
            </div>
            <time className={styles.nav__date}>{dateFormatter.format(selectedDate)}</time>
        </div>
        <div className={classNames(styles.nav__options)}>
            <button className={classNames('Cal__button', 'Cal__button--icon', 'Cal__button--secondary')}
                    onClick={() => setDbConnectDialogOpen(true)}
            >
                <Setter className={classNames("button__icon", styles.nav__setter__icon)} />
            </button>
        </div>
        <div className={classNames(styles.nav__select, 'desktopOnly')}>
            <select 
              className={styles.nav__select__select}
              value={numToView[view] ?? "day"}
              onChange={handleViewChange}
            >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
            </select>
            <ChevronDown className={styles.nav__select__icon}/>
        </div>
        {mobileSideBarV2}
        <DbConnectionDialog open={DbConnectDialogOpen} onClose={() => setDbConnectDialogOpen(false)} onSave={(ha) => {console.log(ha)}}/> 
    </div>
}