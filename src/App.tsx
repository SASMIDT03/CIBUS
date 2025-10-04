import "./assets/App.css"
import { useState } from "react";
import { Day } from './Day.tsx';
import { DayName } from './DayName.ts';
import { getWeekNumber} from './util/dateUtil.ts';
import { MealSelector} from './MealSelector.tsx';

export default function App() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [mealSelectorOpen, setMealSelectorOpen] = useState(false);
    const [selectDate, setSelectedDate] = useState<string>();

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

    // TODO
    function thisWeek() {
        console.log("Maybe this week?: ", getWeekNumber(new Date()));
        setCurrentDate(new Date()); // resets to today
    }

    function openMealSelector(date: string) {
        console.log("Opening meal selector with date: ", date);
        setSelectedDate(date);
        setMealSelectorOpen(true);
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
                <h1>SKRÅNINGEN</h1>
            </div>
            <div className="navWeekBar">
                <button onClick={prevWeek}>SIDSTE UGE</button>
                <button onClick={thisWeek}>DENNE UGE</button>
                <button onClick={nextWeek}>NÆSTE UGE</button>
            </div>
            <div className="week">
                {weekDays.map((day) => (
                    <Day key={day.date.toLocaleDateString()} dayOfWeek={day.name} date={day.date.toLocaleDateString()} onAddMeal={openMealSelector} />
                ))}
            </div>

            <MealSelector
                isOpen={mealSelectorOpen}
                onClose={() => setMealSelectorOpen(false)}
                onSelect={() => console.log("onSelect")}
                date={selectDate ?? ""}
            />
        </div>
    );
}