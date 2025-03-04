import supabase from "@/supabase-client";
import { DailyCardProps, MealCalendar, MealDish } from "@/types/database.types";

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

// MealsService class for handling all CRUD operations
class MealCalendarService {
  async getMealCalendar(
    startDate?: string,
    endDate?: string,
  ): Promise<MealCalendar[]> {
    let query = supabase.from("meals_calendar").select("*");

    if (startDate) {
      query = query.gte("date", startDate);
    }

    if (endDate) {
      query = query.lte("date", endDate);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  async getMealDishes(date: string): Promise<MealDish[]> {
    const { data, error } = await supabase
      .from("meal_dishes")
      .select("*")
      .eq("meal_date", date);

    if (error) throw error;
    return data || [];
  }

  async createMeal(meal: MealCalendar, dishes?: string[]): Promise<void> {
    // Insert meal calendar entry
    const { error: mealError } = await supabase
      .from("meals_calendar")
      .insert(meal);

    if (mealError) throw mealError;

    // Insert meal dishes if provided
    if (dishes && dishes.length > 0) {
      const mealDishes = dishes.map((dish) => ({
        meal_date: meal.date,
        dish_name: dish,
      }));

      const { error: dishesError } = await supabase
        .from("meal_dishes")
        .insert(mealDishes);

      if (dishesError) throw dishesError;
    }
  }

  async updateMeal(
    date: string,
    meal: Partial<MealCalendar>,
    dishes?: string[],
  ): Promise<void> {
    // Update meal calendar entry
    const { error: mealError } = await supabase
      .from("meals_calendar")
      .update(meal)
      .eq("date", date);

    if (mealError) throw mealError;

    // If dishes provided, update meal dishes
    if (dishes) {
      // Delete current dishes
      const { error: deleteDishesError } = await supabase
        .from("meal_dishes")
        .delete()
        .eq("meal_date", date);

      if (deleteDishesError) throw deleteDishesError;

      // Add new dishes if array isn't empty
      if (dishes.length > 0) {
        const mealDishes = dishes.map((dish) => ({
          meal_date: date,
          dish_name: dish,
        }));

        const { error: dishesError } = await supabase
          .from("meal_dishes")
          .insert(mealDishes);

        if (dishesError) throw dishesError;
      }
    }
  }

  async deleteMeal(date: string): Promise<void> {
    // Meal_dishes will be cascade deleted due to foreign key constraint
    const { error } = await supabase
      .from("meals_calendar")
      .delete()
      .eq("date", date);

    if (error) throw error;
  }

  async getDashboardData(): Promise<DailyCardProps[]> {
    const { data, error } = await supabase
      .from("fetch_dashboard_data")
      .select("*");

    if (error) throw error;
    return data || [];
  }
}

const mealCalendarService = new MealCalendarService();
export default mealCalendarService;
