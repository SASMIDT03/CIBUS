import "./assets/MealEditor.css"

type MealEditorProps = {
    isOpen: boolean;
    onClose: () => void;
    onSaveMeal: () => void
}

export function MealEditor({isOpen, onClose, onSaveMeal}: MealEditorProps) {
    if (!isOpen) return null;

    return (
        <div className={"popup-overlay"}>
            <div className="popup-mealEditor">
                <input type={"text"} placeholder={"Navn"} />
                <input type={"text"} placeholder={"Ingredienser"} />
                <input type={"text"} placeholder={"Opskrift"} />
                <div className={"footer"}>
                    <button onClick={() => onSaveMeal()}>Gem</button>
                    <button onClick={() => onClose()}>Luk</button>
                </div>
            </div>
        </div>
    )
}