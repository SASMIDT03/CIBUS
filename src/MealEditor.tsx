import "./assets/MealEditor.css"
import { Meal } from './interfaces/Meal.ts';
import { useEffect, useState } from 'react';

type MealEditorProps = {
    isOpen: boolean;
    onClose: () => void;
    onSaveMeal: (meal: Partial<Meal>) => void;
    currentMeal?: Meal | null
}

export function MealEditor({isOpen, onClose, onSaveMeal, currentMeal}: MealEditorProps) {

    console.log("given meal: ", currentMeal?.name);

    const [mealName, setMealName ] = useState<string | null | undefined>(undefined);
    const [ingredients, setIngredients ] = useState<string | null | undefined>(undefined);
    const [recipe, setRecipe] = useState<string | null | undefined>(undefined);

    useEffect(() => {
        console.log("use effect name: ", currentMeal?.name);
        setMealName(currentMeal?.name);
        setIngredients(currentMeal?.ingredients);
        setRecipe(currentMeal?.recipe);
    }, [currentMeal]);


    function tryToSaveMeal() {

        if (!mealName && !ingredients && !recipe) {
            console.log("Meal is null")
            return;
        }

        const meal: Partial<Meal> = {
            name: mealName!,
            ingredients: ingredients!,
            recipe: recipe!
        }
        onSaveMeal(meal);

        setMealName(null);
        setIngredients(null);
        setRecipe(null);
        
        return;
    }

    if (!isOpen) return null;

    return (
        <div className={"popup-overlay"} onClick={onClose}>
            <div className="popup-mealEditor" onClick={(e) => e.stopPropagation() }>
                <input type={"text"}
                       placeholder={"Navn"}
                       value={mealName || ''}
                       onChange={(e) => setMealName(e.target.value)} />
                <input type={"text"}
                       placeholder={"Ingredienser"}
                       value={ingredients || ''}
                       onChange={(e) => setIngredients(e.target.value)} />
                <textarea placeholder={"Opskrift"}
                          value={recipe || ''}
                          onChange={(e) => setRecipe(e.target.value)} />
                <div className={"footer"}>
                    <button onClick={tryToSaveMeal}>Gem</button>
                    <button onClick={onClose}>Luk</button>
                </div>
            </div>
        </div>
    )
}