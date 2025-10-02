export interface MealPlan {
    id: string;
    date: string;       // 'YYYY-MM-DD'
    meal_id?: string | null;
    notes?: string | null;
    meals?: { name: string };
}