import supabase from "@/supabase-client";
import { Allergen } from "@/types/database.types";

class AllergenService {
  async getAllergens(): Promise<Allergen[]> {
    const { data, error } = await supabase.from("allergens").select("*");

    if (error) throw error;
    return data || [];
  }

  async createAllergen(allergen: Allergen): Promise<Allergen> {
    const { data, error } = await supabase
      .from("allergens")
      .insert(allergen)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateAllergen(oldName: string, newName: string): Promise<Allergen> {
    const { data, error } = await supabase
      .from("allergens")
      .update({ name: newName })
      .eq("name", oldName)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteAllergen(name: string): Promise<void> {
    const { error } = await supabase
      .from("allergens")
      .delete()
      .eq("name", name);

    if (error) throw error;
  }
}

const allergensService = new AllergenService();
export default allergensService;
