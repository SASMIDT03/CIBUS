import SplitText from './assets/SplitText.tsx';
import { MealPlan } from './interfaces/MealPlan.ts';
import "./assets/Day.css";
import TrashIcon from './assets/trash_icon.svg';

interface DayProps {
    dayOfWeek: string;
    date: string;
    plannedMeal?: MealPlan;
    onOpenMealSelector: (date: string) => void;
    onDeleteMeal: () => void;
}

export function Day({ dayOfWeek, date, plannedMeal, onOpenMealSelector, onDeleteMeal }: DayProps) {

    return (
        <div className="day">
            <div className="header">
                <SplitText
                    text={dayOfWeek.toUpperCase()}
                    className="text-2xl font-semibold text-center"
                    tag="h1"
                />
                <SplitText
                    key={date}
                    text={date}
                    className="text-2xl font-semibold text-center"
                    tag="h4"
                />
            </div>

            <div className="meal">
                <div className="hline"></div>
                {plannedMeal ? (
                    <div className="dinner">
                        <p
                            className={"plannedMealTitle"}
                            onClick={() => console.log("Meal was pressed: ", plannedMeal.meals?.name)}
                        >
                            <strong>{plannedMeal.meals?.name}</strong>
                        </p>
                        {plannedMeal.notes && <p><strong>Noter:</strong> {plannedMeal.notes}</p>}
                        <div className="mealFooter">
                            <img onClick={onDeleteMeal} className="trashIcon" src={TrashIcon} />
                        </div>
                    </div>
                ) : <p></p>}
            </div>

            <button onClick={() => onOpenMealSelector(date)}>
                <div className="plusIcon">+</div>
            </button>
        </div>
    );
}
