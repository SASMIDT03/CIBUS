import SplitText from './assets/SplitText.tsx';
import { setPlanForDate} from './api/mealPlans.ts';
import { useEffect, useState } from 'react';
import { MealPlan } from './interfaces/MealPlan.ts';
import "./assets/Day.css"

interface DayProps {
    dayOfWeek: string;
    date: string;
}

export function Day({ dayOfWeek, date }: DayProps) {

    const [plannedMeal, setPlannedMeal] = useState<MealPlan>();

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

    useEffect(() => {
        if (plannedMeal) {
            console.log("Updated planed meal: ", plannedMeal);
        }
    }, [plannedMeal]);

    // Return
    return (
        <div className="day">
            <div className="header">
                <SplitText
                    text={dayOfWeek}
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
                {plannedMeal ? (
                    <div className="dinner">
                        <p>{plannedMeal.meals?.name}</p>
                        {plannedMeal.notes && (
                            <p><strong>Notes:</strong> {plannedMeal.notes}</p>
                        )}
                    </div>
                ) : (
                    <p>No meal planned yet.</p>
                )}
            </div>
            <button onClick={addMeal}>Add Meal</button>
        </div>
    )
}