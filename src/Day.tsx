import SplitText from './assets/SplitText.tsx';
import {getPlanByDate, removePlanByDate} from './api/mealPlans.ts';
import { useEffect, useState } from 'react';
import { MealPlan } from './interfaces/MealPlan.ts';
import "./assets/Day.css"
import TrashIcon from './assets/trash_icon.svg';

interface DayProps {
    dayOfWeek: string;
    date: string;
    onAddMeal: (date: string) => void;
}

export function Day({ dayOfWeek, date, onAddMeal }: DayProps) {

    const [plannedMeal, setPlannedMeal] = useState<MealPlan>();

    /*
    async function addMeal() {
        try {
            const mealId = "521c8d97-c3c6-48e7-9020-a27d10b5379e"

            const plan: MealPlan = await setPlanForDate(date, mealId, "Skal være klar klokken 17:00");

            console.log("Added meal to: ", typeof plan);
            setPlannedMeal(plan)
        } catch (error: any) {
            console.error("Error while adding meal: ", error.message);
        }
    }
     */

    async function getMeal() {
        try {
            const plannedMeal: MealPlan | null = await getPlanByDate(date);
            if (!plannedMeal) { return; }
            setPlannedMeal(plannedMeal!);
            console.log("Got meal from: ", date, " : ", plannedMeal);
        }
        catch (error: any) {
            console.error("Error while getting meal: ", error.message);
        }
    }

    async function deleteMeal() {
        await removePlanByDate(date);
        setPlannedMeal(undefined);
    }

    useEffect(() => {
        if (!plannedMeal) {
            getMeal().then();
        }
        if (plannedMeal) {
            console.log("Updated planed meal: ", plannedMeal);
        }
    }, [plannedMeal]);

    // Return
    return (
        <div className="day">
            <div className="header">
                <SplitText
                    text={dayOfWeek.toUpperCase()}
                    className="text-2xl font-semibold text-center"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                    tag="h1"
                    //onLetterAnimationComplete={handleAnimationComplete}
                />
                <SplitText
                    key={date}
                    text={date}
                    className="text-2xl font-semibold text-center"
                    delay={100}
                    duration={0.3}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                    tag="h4"
                    //onLetterAnimationComplete={handleAnimationComplete}
                />
            </div>

            <div className="meal">
                <div className="hline"></div>
                {plannedMeal ? (
                    <div className="dinner">
                        <p><strong>{plannedMeal.meals?.name}</strong></p>
                        {plannedMeal.notes && (
                            <p><strong>Noter:</strong> {plannedMeal.notes}</p>
                        )}
                        <div className="mealFooter">
                            <img onClick={deleteMeal} className="trashIcon" src={TrashIcon} />
                        </div>
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
            <button onClick={() => onAddMeal(date)}><div className="plusIcon">+</div> </button>
        </div>
    )
}