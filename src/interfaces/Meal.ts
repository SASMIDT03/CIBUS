export interface Meal {
    name: string;
    ingredients?: string[] | null;
    recipe?: string | null;
    tags?: string[] | null;
}