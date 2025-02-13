import supabase from "@/supabase-client";

export async function getAllergens() {
  const { data, error } = await supabase.from("allergens").select("*");
  if (error) throw error;
  return data;
}
