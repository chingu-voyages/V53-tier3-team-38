import supabase from "@/supabase-client";
import { Dish } from "@/types/database.types";

class DishService {
  async getDishes(): Promise<Dish[]> {
    const { data, error } = await supabase.from("fetch_dish_data").select("*");

    if (error) throw error;
    return data || [];
  }

  async getDishByName(name: string): Promise<Dish> {
    const { data, error } = await supabase
      .from("fetch_dish_data")
      .select("*")
      .eq("name", name)
      .single();

    if (error) throw error;
    return data;
  }

  async createDish(
    dish: { name: string; calories: number },
    ingredients: string[],
  ): Promise<void> {
    // Start a transaction using supabase functions or handle in multiple steps
    // First create the dish
    const { error: dishError } = await supabase
      .from("dishes")
      .insert({ name: dish.name, calories: dish.calories });

    if (dishError) throw dishError;

    // Then create dish-ingredient relationships
    const dishIngredients = ingredients.map((ingredient) => ({
      dish_name: dish.name,
      ingredient_name: ingredient,
    }));

    const { error: ingredientsError } = await supabase
      .from("dish_ingredients")
      .insert(dishIngredients);

    if (ingredientsError) throw ingredientsError;
  }

  async updateDish(
    oldName: string,
    dish: { name: string; calories: number },
    ingredients: string[],
  ): Promise<void> {
    // Update the dish
    const { error: dishError } = await supabase
      .from("dishes")
      .update({ name: dish.name, calories: dish.calories })
      .eq("name", oldName);

    if (dishError) throw dishError;

    // If name changed, need to update dish_ingredients foreign key references
    if (oldName !== dish.name) {
      const { error: updateRefError } = await supabase
        .from("dish_ingredients")
        .update({ dish_name: dish.name })
        .eq("dish_name", oldName);

      if (updateRefError) throw updateRefError;
    }

    // Delete current ingredients
    const { error: deleteIngredientsError } = await supabase
      .from("dish_ingredients")
      .delete()
      .eq("dish_name", dish.name);

    if (deleteIngredientsError) throw deleteIngredientsError;

    // Add new ingredients
    const dishIngredients = ingredients.map((ingredient) => ({
      dish_name: dish.name,
      ingredient_name: ingredient,
    }));

    const { error: ingredientsError } = await supabase
      .from("dish_ingredients")
      .insert(dishIngredients);

    if (ingredientsError) throw ingredientsError;
  }

  async deleteDish(name: string): Promise<void> {
    // Dish_ingredients will be cascade deleted due to foreign key constraint
    const { error } = await supabase.from("dishes").delete().eq("name", name);

    if (error) throw error;
  }
}

const dishService = new DishService();
export default dishService;
