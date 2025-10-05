import "./assets/MealSelector.css"
import { fetchMeals } from './api/meals.ts';
import { Meal } from './interfaces/Meal.ts';
import { useEffect, useState } from 'react';
import { MealComponent } from './MealCard.tsx';

type MealPopupProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (meal: Meal, date: string) => void;
    date: string;
};



export function MealSelector({ isOpen, onClose, onSelect, date }: MealPopupProps) {

    const [retrievedMeals, setRetrievedMeals ] = useState<Meal[]>([]);

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

    function tellAppToAddMeal(meal: Meal) {
        onSelect(meal, date)
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
                            <MealComponent key={meal.id} meal={meal} onSelect={tellAppToAddMeal} />
                        ))}
                    </div>
                </div>
                <div className="footer">
                    <button onClick={() => console.log("Ny ret")}>Ny ret</button>
                    <button onClick={onClose}>Close</button>
                </div>

            </div>
        </div>
    );
}
