// src/api/meals.ts
import { supabase } from "../lib/supabase";
import type { Meal } from "../interfaces/Meal.ts";

export async function fetchMeals(): Promise<Meal[]> {
    const { data, error } = await supabase
        .from("meals")
        .select("*")
        .order("name", { ascending: false });
    if (error) throw error;
    return data as Meal[];
}

export async function createMeal(payload: Partial<Meal>): Promise<Meal> {
    const { data, error } = await supabase.from("meals").insert([payload]).select().single();
    if (error) throw error;
    return data as Meal;
}

export async function updateMeal(id: string, updates: Partial<Meal>): Promise<Meal> {
    const { data, error } = await supabase.from("meals").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data as Meal;
}

export async function deleteMeal(id: string): Promise<void> {
    const { error } = await supabase.from("meals").delete().eq("id", id);
    if (error) throw error;
}
