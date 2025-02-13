import supabase from "@/supabase-client";

export async function getDishes() {
  const { data, error } = await supabase.from("dishes").select("*");
  if (error) throw error;
  return data;
}
