import supabase from "@/supabase-client";
import { Ingredient } from "@/types/database.types";

class IngredientService {
  async getIngredients(): Promise<Ingredient[]> {
    const { data, error } = await supabase.from("ingredients").select("*");

    if (error) throw error;
    return data || [];
  }

  async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
    const { data, error } = await supabase
      .from("ingredients")
      .insert(ingredient)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateIngredient(
    oldName: string,
    ingredient: Partial<Ingredient>,
  ): Promise<Ingredient> {
    const { data, error } = await supabase
      .from("ingredients")
      .update(ingredient)
      .eq("name", oldName)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteIngredient(name: string): Promise<void> {
    const { error } = await supabase
      .from("ingredients")
      .delete()
      .eq("name", name);

    if (error) throw error;
  }
}

const ingredientsService = new IngredientService();
export default ingredientsService;
