import "./assets/MealSelector.css"
import { fetchMeals } from './api/meals.ts';
import { Meal } from './interfaces/Meal.ts';
import { useEffect, useState } from 'react';
import { MealComponent } from './MealCard.tsx';
import {MealNotesDialogBox} from "./MealNotesDialogBox.tsx";

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

    async function getMeals() {
        try {
            const fetchedMeals: Meal[] = await fetchMeals()

            console.log("fetchedMeals", fetchedMeals)
            setRetrievedMeals(fetchedMeals);
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
                            <MealComponent key={meal.id} meal={meal} onSelect={() => handleOpenMealNotesDialogForMeal(meal)} />
                        ))}
                    </div>
                </div>
                <div className="footer">
                    <button onClick={() => console.log("Ny ret")}>Ny ret</button>
                    <button onClick={onClose}>Close</button>
                </div>

                <MealNotesDialogBox
                    isOpen={openMealNotesDialogBox}
                    onClose={() => setOpenMealNotesDialogBox(false)}
                    onAddMeal={tellAppToAddMeal}
                />
            </div>
        </div>
    );
}
