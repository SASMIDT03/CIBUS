import {useState} from "react";
import "./assets/MealNotesDialogBox.css"

type MealSelectorProps = {
    isOpen: boolean;
    onClose: () => void;
    onAddMeal: (notes: string) => void;
}

export function MealNotesDialogBox({isOpen, onClose, onAddMeal}: MealSelectorProps) {

    const [notes, setNotes] = useState<string>("");

    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={() => onClose()}>
            <div className="popup-notesDialog" onClick={(e) => e.stopPropagation()}>
                <div className="mealNotesDialog">
                    <input
                        type={"text"}
                        placeholder={"Tilføjer noter..."}
                        value={notes}
                        onChange={ (e) => setNotes(e.target.value) }
                    />
                    <button onClick={() =>  {
                        onClose();
                        onAddMeal(notes);
                    }}>Tilføj ret</button>
                    <button onClick={() => onClose()}>Luk</button>
                </div>
            </div>
        </div>

    )
}