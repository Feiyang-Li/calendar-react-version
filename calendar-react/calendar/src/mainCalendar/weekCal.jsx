import styles from "./weekCal.module.css";
import classNames from "classnames";
import {generateWeekDays} from "../shared/scripts/date.js"
import { useEffect, useState, useRef, useMemo} from 'react'
import {today, isTheSameDay} from "../shared/scripts/date.js"
import StorePromp from "../StorePromp/StorePromp.jsx";
function DayOfWeek({date, idx, selectedDate, setSelectedDate}) {
    // return a buttom with 
    const rep = {0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat"};

    let itemClass = []
    function processDate(date) {
      setSelectedDate(date);
    }
    if (isTheSameDay(today(), date)) {
      itemClass = [styles.weekCalendar__dayOfWeek__button, styles.weekCalendar__dayOfWeek__button__highlight];
    } else {
      itemClass = [styles.weekCalendar__dayOfWeek__button]
    }
    if(isTheSameDay(date, selectedDate)) {
      itemClass.push(styles.weekCalendar__dayOfWeek__button__selected);
    }
    return(
      <li className={
        classNames(styles.weekCalendar__dayofWeek__item)
        } key={idx}>
          <button className={classNames(...itemClass)} onClick={() => processDate(date)}>
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
          <div className={classNames(styles.weekCalendar__cell)} key={idx} > 
              {/* By clicking within the cell we would initiate creation event storage*/}
          </div>
        ))
      } 
    </div>
  )
}



export default function WeekCal({ single, storage, selectedDate, setSelectedDate }) {
    const clocks = ["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", 
                    "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
                    "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"];
    const dayOfWeeks = useMemo(() => generateWeekDays(selectedDate), [selectedDate]);
    const [storeSingle, setStoreSingle] = single;
    const events = useMemo(() => {
      return dayOfWeeks.flatMap(d =>
        storage.extractByDate("date", d, { mode: "day" })
      );
    }, [dayOfWeeks, storage, storeSingle]);
  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const suffix = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    const displayMin = mins === 0 ? "00" : mins.toString().padStart(2, "0");

    return `${displayHour}:${displayMin} ${suffix}`;
  }
  function returnEventBlock(v,i){
    // v is a dictionary hold color, comment, date, id, recordDate, start, title, type, uid
    function determineBlockNums(date, start, end) {
      // 
      const nDate = new Date(date);
      const dateI = dayOfWeeks.findIndex(d => isTheSameDay(d, nDate));
      return [[dateI, start / 30 + 1], [dateI, end / 30 + 1]];
    }
    const [blockStartNum, blockEndNum] = determineBlockNums(v.date, v.start, v.end);
    console.log(v);
    return (
      <div idx={i} key={i} className={styles.weekCalendar__events} style={{gridRow: `${blockStartNum[1]} / ${blockEndNum[1]}`, gridColumn: `${blockStartNum[0]} / ${blockEndNum[0]}`, backgroundColor: `${v.color}`}}>
        <div className={styles.weekCalendar__event}>
          <h2 className={styles.event__title}>{v.title}</h2>
          <time>{formatTime(v.start)}</time> <span>-</span> <time>{formatTime(v.end)}</time>
          <p>{v.type}</p>
          <p className={styles.event__comment}>{v.comment}</p>
        </div>
      </div>

    )
  }
    return (
    <>
      <div className={styles.weekCalendar}>
        <ul className={styles.weekCalendar__dayOfWeekList}>
            <li className={styles.weekCalendar__dol__PlaceHolder}></li>
            {dayOfWeeks.map((ele, idx) => (
              <DayOfWeek date={ele} key={idx} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
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
                {/* <Cell />
                <Cell />
                <Cell />
                <Cell />
                <Cell />
                <Cell />
                <Cell />*/}
                  {Array.from({length: 336}).map((_, i) => {
                    
                    if(i % 2 === 0) {
                      return (
                        <div idx={i} 
                             className={classNames(styles.weekCalendar__block, styles.block__even)} 
                             style={{gridRow: `${i % 48 + 1}`, gridColumn : `${Math.floor(i / 48) + 1}`}}>
                          
                        </div>
                      )
                    } else {
                      return(
                        <div idx={i} className={classNames(styles.weekCalendar__block, styles.block__odd)} style={{gridRow: `${i % 48 + 1}`, gridColumn : `${Math.floor(i / 48) + 1}`}}>
                          
                        </div>
                      )
                    }

                  })}
              { 
                events.map((v, i) => returnEventBlock(v, i))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
