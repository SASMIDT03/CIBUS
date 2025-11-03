export interface Meal {
    id: string;
    name: string;
    ingredients?: string | null;
    recipe?: string | null;
    tags?: string[] | null;
}