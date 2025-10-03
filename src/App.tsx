import "./assets/App.css"
import { useState } from "react";
import { Day } from './Day.tsx';
import { DayName } from './DayName.ts';
import { getWeekNumber} from './util/dateUtil.ts';

export default function App() {
    const [currentDate, setCurrentDate] = useState(new Date());

    function getMonday(d: Date): Date {
        const diffToLatestMonday = (d.getDay() + 6) % 7;
        return new Date(d.getFullYear(), d.getMonth(), (d.getDate() - diffToLatestMonday));
    }


    function prevWeek() {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() - 7);
            return newDate;
        });
    }

    function nextWeek() {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() + 7);
            return newDate;
        });
    }

    function thisWeek() {
        console.log("Maybe this week?: ", getWeekNumber(new Date()));
        setCurrentDate(new Date()); // resets to today
    }


    const monday: Date = getMonday(currentDate);
    const weekDays: { name: DayName; date: Date}[] = [];
    const dayOrder: DayName[] = [
        DayName.Monday,
        DayName.Tuesday,
        DayName.Wednesday,
        DayName.Thursday,
        DayName.Friday,
        DayName.Saturday,
        DayName.Sunday,
    ];

    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        weekDays.push({name: dayOrder[i], date})
    }

    return (
        <div>
            <div className="mainHeader">
                <h1>CIBUS</h1>
            </div>
            <div className="navWeekBar">
                <button onClick={prevWeek}>SIDSTE UGE</button>
                <button onClick={thisWeek}>DENNE UGE</button>
                <button onClick={nextWeek}>NÆSTE UGE</button>
            </div>
            <div className="week">
                {weekDays.map((day) => (
                    <Day key={day.date.toLocaleDateString()} dayOfWeek={day.name} date={day.date.toLocaleDateString()} />
                ))}
            </div>
        </div>
    );
}