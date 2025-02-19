import supabase from "@/supabase-client";

export async function getDishes() {
  const { data, error } = await supabase.from("fetch_dish_data").select("*");
  if (error) throw error;
  return data;
}
