import SplitText from './assets/SplitText.tsx';
import { setPlanForDate} from './api/mealPlans.ts';

interface DayProps {
    dayOfWeek: string;
    date: string;
}



export default function Day({ dayOfWeek, date}: DayProps) {
    async function addMeal() {
        try {
            const mealId = "521c8d97-c3c6-48e7-9020-a27d10b5379e"

            const plan = await setPlanForDate(date, mealId, "Skal være klar klokken 17:00");

            console.log("Added meal to: ", plan);
        }
        catch (error: any) {
            console.error("Error while adding meal: ", error.message);
        }

    }

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
                    key ={date}
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
            <p>This is some day text, bla, bla, bla, etc. etc.</p>
            <button onClick={addMeal}>Add Meal</button>
        </div>
    )
}