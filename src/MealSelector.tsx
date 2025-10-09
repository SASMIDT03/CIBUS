import "./assets/MealSelector.css"
import { createMeal, deleteMeal, fetchMeals } from './api/meals.ts';
import { Meal } from './interfaces/Meal.ts';
import { useEffect, useState } from 'react';
import { MealComponent } from './MealCard.tsx';
import {MealNotesDialogBox} from "./MealNotesDialogBox.tsx";
import {MealEditor} from "./MealEditor.tsx";

type MealPopupProps = {
    isOpen: boolean;
    onClose: () => void;
    onAddMeal: (meal: Meal, date: string, notes: string) => void;
    date: string;
};

export function MealSelector({ isOpen, onClose, onAddMeal, date }: MealPopupProps) {

    const [retrievedMeals, setRetrievedMeals ] = useState<Meal[]>([]);
    const [openMealNotesDialogBox, setOpenMealNotesDialogBox] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

    const [openMealEditor, setOpenMealEditor] = useState(false);

    async function getMeals() {
        try {
            const fetchedMeals: Meal[] = await fetchMeals()

            console.log("fetchedMeals", fetchedMeals)
            setRetrievedMeals(fetchedMeals);
            retrievedMeals.sort();
        }
        catch (error: any) {
            console.error("Error while fetching meals: ", error);
        }
    }

    useEffect(() => {
        if (!isOpen) return;
        getMeals().then();
    }, [isOpen]);

    if (!isOpen) return null;

    function tellAppToAddMeal(notes: string) {
        onAddMeal(selectedMeal!, date, notes);
    }

    function handleOpenMealNotesDialogForMeal(meal: Meal) {
        setSelectedMeal(meal);
        setOpenMealNotesDialogBox(true);
    }

    function saveMeal(meal: Partial<Meal>) {
        createMeal(meal).then(getMeals);
        setOpenMealEditor(false);
    }

    function deleteMealById(mealId: string) {
        deleteMeal(mealId).then(getMeals);
    }


    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="header">

                </div>
                <div className="body">
                    <div className={"navigation"}>
                        <input type={"text"} placeholder={"Søg.."}/>
                    </div>
                    <div className={"main"}>
                        {retrievedMeals.map((meal) => (
                            <MealComponent
                                key={meal.id}
                                meal={meal}
                                onSelect={() => handleOpenMealNotesDialogForMeal(meal)}
                                onDeleteMeal={deleteMealById}
                            />
                        ))}
                    </div>
                </div>
                <div className="footer">
                    <button onClick={() => setOpenMealEditor(true)}>Ny ret</button>
                    <button onClick={onClose}>Close</button>
                </div>

                <MealNotesDialogBox
                    isOpen={openMealNotesDialogBox}
                    onClose={() => setOpenMealNotesDialogBox(false)}
                    onAddMeal={tellAppToAddMeal}
                />
                <MealEditor
                    isOpen={openMealEditor}
                    onClose={() => setOpenMealEditor(false)}
                    onSaveMeal={saveMeal}
                />
            </div>
        </div>
    );
}
