import { Meal } from './interfaces/Meal.ts';
import "./assets/MealCard.css"


type MealProps = {
    meal: Meal
}

export function MealComponent({ meal }: MealProps) {
    return (
        <div className={"mealCard"}>
            <h3>{meal.name}</h3>
        </div>
    )
}