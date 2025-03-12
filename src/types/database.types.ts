// Sample database schema following documentation https://supabase.com/docs/reference/javascript/typescript-support
// TODO: update schema once design is complete

import { PostgrestError } from "@supabase/supabase-js";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      TodoList: {
        Row: {
          // the data expected from .select()
          id: number;
          created_at: string;
          name: string;
          isCompleted: boolean;
        };
        Insert: {
          // the data to be passed to .insert()
          id?: never; // generated columns must not be supplied
          created_at: never;
          name: string; // `not null` columns with no default must be supplied
          isCompleted?: boolean;
        };
        Update: {
          // the data to be passed to .update()
          id?: never;
          created_at: never;
          name?: string; // `not null` columns are optional on .update()
          isCompleted?: boolean;
        };
      };
    };
  };
}

// Type definitions based on your database schema
export type Role = {
  name: string;
};

export type Allergen = {
  name: string;
  notes?: string | null;
};

export type Ingredient = {
  name: string;
  name_allergens: string | null;
};

export type Dish = {
  name: string;
  calories: number;
  ingredients?: string[];
  allergens?: string[];
};

export type DishIngredient = {
  dish_name: string;
  ingredient_name: string;
};

export type MealCalendar = {
  date: string;
  is_day_off: boolean;
  meal_title: string | null;
};

export type MealDish = {
  meal_date: string;
  dish_name: string;
};

export type UserRole = {
  role_name: string;
  user_id: string;
};

export type UserAllergen = {
  user_id: string;
  allergen_name: string;
  notes: string | null;
};

export type UserDetails = {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
};

export type DailyCardProps = {
  day: string;
  date: string;
  mealTitle: string;
  dishCount: number;
};

export type UserData = {
  user_id: string;
  name: string;
  email: string;
  avatar_url: string;
  allergen_info: Array<Allergen>;
  isAdmin: boolean;
};

export type CustomResponse = {
  success: boolean;
  error?: PostgrestError | string | null;
};

export type DaySchedule = {
  date: string;
  dishes: Dish[] | null;
  isDayOff: boolean;
};
