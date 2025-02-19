import supabase from "@/supabase-client";

export async function getMealCalendar() {
  const { data, error } = await supabase
    .from("fetch_dashboard_data")
    .select("*")
    .order("date");
  if (error) throw error;
  return data;
}

// export async function addDishToCalendar(dish_name, menu_date) {}

// export async function removeDishFromCalendar(dish_name, menu_date) {}
