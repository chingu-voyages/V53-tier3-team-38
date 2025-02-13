import supabase from "@/supabase-client";

export async function getIngredients() {
  const { data, error } = await supabase.from("ingredients").select("*");
  if (error) throw error;
  return data;
}
