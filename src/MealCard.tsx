import { Meal } from './interfaces/Meal.ts';
import "./assets/MealCard.css"
import EditIcon from "./assets/edit_icon.svg"


type MealProps = {
    meal: Meal
    onSelect: (meal: Meal) => void;
}

export function MealComponent({ meal, onSelect }: MealProps) {

    return (
        <div className={"mealCard"} >
            <div className="mainSide" onClick={() => onSelect(meal)}>
                <h3>{meal.name}</h3>
            </div>
            <div className={"secondarySide"}>
                <img className={"editIcon"} src={EditIcon} onClick={() => console.log("Edit meal was pressed")} />
            </div>
        </div>
    )
}