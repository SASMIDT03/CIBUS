// src/api/plans.ts
import { supabase } from "../lib/supabase";
import type { MealPlan } from "../interfaces/MealPlan.ts";

export async function getPlanByDate(dateIso: string): Promise<MealPlan | null> {
    const { data, error } = await supabase.from("meal_plans").select("*").eq("date", dateIso).maybeSingle();
    if (error) throw error;
    return (data as MealPlan) ?? null;
}

export async function setPlanForDate(dateIso: string, mealId: string | null, notes?: string) {
    // Upsert: insert or update existing
    const { data, error } = await supabase
        .from("meal_plans")
        .upsert({ date: dateIso, meal_id: mealId, notes }, { onConflict: "date" })
        .select(`
            *, meals(name)
        `)
        .single();
    if (error) throw error;
    return data as MealPlan;
}

export async function removePlanByDate(dateIso: string) {
    const { error } = await supabase.from("meal_plans").delete().eq("date", dateIso);
    if (error) throw error;
}
