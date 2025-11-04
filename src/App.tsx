import "./assets/App.css";
import { useState, useEffect } from "react";
import { Day } from './Day.tsx';
import { DayName } from './DayName.ts';
import { getWeekNumber } from './util/dateUtil.ts';
import { MealSelector } from './MealSelector.tsx';
import { Meal } from './interfaces/Meal.ts';
import { setPlanForDate, getPlanByDate, removePlanByDate } from './api/mealPlans.ts';
import { MealPlan } from './interfaces/MealPlan.ts';

export default function App() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [mealSelectorOpen, setMealSelectorOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>();
    const [plansByDate, setPlansByDate] = useState<Record<string, MealPlan | undefined>>({});

    function getMonday(d: Date): Date {
        const diffToLatestMonday = (d.getDay() + 6) % 7;
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() - diffToLatestMonday);
    }

    function prevWeek() {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() - 7);
            return newDate;
        });
    }

    function nextWeek() {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() + 7);
            return newDate;
        });
    }

    function thisWeek() {
        console.log("Maybe this week?: ", getWeekNumber(new Date()));
        setCurrentDate(new Date());
    }

    function openMealSelector(date: string) {
        setSelectedDate(date);
        setMealSelectorOpen(true);
    }

    // Add a meal for a specific date
    async function addMealAtDate(meal: Meal, date: string, notes?: string) {
        try {
            const plannedMeal: MealPlan = await setPlanForDate(date, meal.id, notes);
            setPlansByDate(prev => ({
                ...prev,
                [date]: plannedMeal,
            }));
            setMealSelectorOpen(false);
        } catch (error) {
            console.error("Error while adding a meal to the DB: ", error);
        }
    }

    // Delete meal for a specific date
    async function deleteMealAtDate(date: string) {
        try {
            await removePlanByDate(date);
            setPlansByDate(prev => ({ ...prev, [date]: undefined }));
        } catch (error) {
            console.error("Error while deleting a meal: ", error);
        }
    }

    // Load meals from DB when component mounts
    useEffect(() => {
        async function loadWeekMeals() {
            const monday = getMonday(currentDate);
            const newPlans: Record<string, MealPlan | undefined> = {};
            for (let i = 0; i < 7; i++) {
                const date = new Date(monday);
                date.setDate(monday.getDate() + i);
                const key = date.toISOString().split("T")[0];
                const meal = await getPlanByDate(key);
                if (meal) newPlans[key] = meal;
            }
            setPlansByDate(newPlans);
        }
        loadWeekMeals();
    }, [currentDate]);

    const monday: Date = getMonday(currentDate);
    const weekDays: { name: DayName; date: Date }[] = [];
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
        weekDays.push({ name: dayOrder[i], date });
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
                {weekDays.map(day => {
                    const key = day.date.toISOString().split("T")[0];
                    return (
                        <Day
                            key={key}
                            dayOfWeek={day.name}
                            date={key}
                            plannedMeal={plansByDate[key]}
                            onOpenMealSelector={openMealSelector}
                            onDeleteMeal={() => deleteMealAtDate(key)}
                        />
                    );
                })}
            </div>

            <MealSelector
                isOpen={mealSelectorOpen}
                onClose={() => setMealSelectorOpen(false)}
                onAddMeal={(meal: Meal, date: string, notes: string) => addMealAtDate(meal, date, notes)}
                date={selectedDate ?? ""}
            />

        </div>
    );
}
