import { Meal } from './interfaces/Meal.ts';
import "./assets/MealCard.css"


type MealProps = {
    meal: Meal
    onSelect: (meal: Meal) => void;
}

export function MealComponent({ meal, onSelect }: MealProps) {

    return (
        <div className={"mealCard"} onClick={() => onSelect(meal)}>
            <h3>{meal.name}</h3>
        </div>
    )
}