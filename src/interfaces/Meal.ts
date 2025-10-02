export interface Meal {
    id: string;
    name: string;
    description?: string | null;
    tags?: string[] | null;
}