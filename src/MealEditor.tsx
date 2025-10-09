import "./assets/MealEditor.css"
import { Meal } from './interfaces/Meal.ts';

type MealEditorProps = {
    isOpen: boolean;
    onClose: () => void;
    onSaveMeal: (meal: Partial<Meal>) => void
}

export function MealEditor({isOpen, onClose, onSaveMeal}: MealEditorProps) {

    let mealName: string | null = null;
    let ingredientsList: string[] | null = null;
    let recipe1: string | null = null;

    function tryToSaveMeal() {

        if (!mealName) {
            console.log("Meal is null")
            return;
        }

        const meal: Partial<Meal> = {
            name: mealName!,
            ingredients: ingredientsList,
            recipe: recipe1
        }
        onSaveMeal(meal);
        return;
    }

    if (!isOpen) return null;

    return (
        <div className={"popup-overlay"}>
            <div className="popup-mealEditor">
                <input type={"text"} placeholder={"Navn"} onChange={(e) => mealName = e.target.value} />
                <input type={"text"} placeholder={"Ingredienser"} onChange={(e) => recipe1 = e.target.value} />
                <input type={"text"} placeholder={"Opskrift"} onChange={(e) => recipe1 = e.target.value} />
                <div className={"footer"}>
                    <button onClick={tryToSaveMeal}>Gem</button>
                    <button onClick={() => onClose()}>Luk</button>
                </div>
            </div>
        </div>
    )
}