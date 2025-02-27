import supabase from "@/supabase-client";
import {
  Allergen,
  CustomResponse,
  Role,
  UserAllergen,
  UserData,
  UserDetails,
  UserRole,
} from "@/types/database.types";

class UserService {
  async getRoles(): Promise<Role[]> {
    const { data, error } = await supabase.from("roles").select("*");

    if (error) throw error;
    return data || [];
  }

  async createRole(role: Role): Promise<Role> {
    const { data, error } = await supabase
      .from("roles")
      .insert(role)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateRole(oldName: string, newName: string): Promise<Role> {
    const { data, error } = await supabase
      .from("roles")
      .update({ name: newName })
      .eq("name", oldName)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteRole(name: string): Promise<void> {
    const { error } = await supabase.from("roles").delete().eq("name", name);

    if (error) throw error;
  }

  async getUserRole(userId: string): Promise<UserRole[]> {
    const { data, error } = await supabase
      .from("user_roles")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return data || [];
  }

  async assignUserRole(userRole: UserRole): Promise<UserRole> {
    const { data, error } = await supabase
      .from("user_roles")
      .insert(userRole)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async removeUserRole(userId: string, roleName: string): Promise<void> {
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role_name", roleName);

    if (error) throw error;
  }

  async getUserAllergens(userId: string): Promise<UserAllergen[]> {
    const { data, error } = await supabase
      .from("user_allergens")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return data || [];
  }

  async addUserAllergen(
    userName: string,
    allergen: Allergen,
  ): Promise<CustomResponse | UserAllergen> {
    const user_id = await UserService.prototype.getUserId(userName);

    const results = await supabase
      .from("user_allergens")
      .insert({
        user_id: user_id,
        allergen_name: allergen.name,
        notes: allergen.notes,
      })
      .select()
      .single();

    if (results.error) throw results.error;
    return results.data;
  }

  async getUserId(userName: string) {
    const { data, error } = await supabase
      .from("user_details")
      .select("user_id")
      .eq("display_name", userName)
      .single();

    if (error) {
      console.error("Error finding user:", error);
      return { success: false, error: error };
    }

    if (!data) {
      return { success: false, error: "User not found" };
    }

    return data.user_id;
  }

  async updateUserAllergen(
    userName: string,
    allergen: Allergen,
  ): Promise<CustomResponse | UserAllergen> {
    const user_id = await UserService.prototype.getUserId(userName);
    console.log(user_id);
    const notes = allergen.notes;

    const result = await supabase
      .from("user_allergens")
      .update({ notes })
      .eq("user_id", user_id)
      .eq("allergen_name", allergen.name)
      .select()
      .single();

    if (result.error) throw result.error;
    return result.data;
  }

  async removeUserAllergen(
    userName: string,
    allergenName: string,
  ): Promise<CustomResponse | void> {
    const user_id = await UserService.prototype.getUserId(userName);

    const result = await supabase
      .from("user_allergens")
      .delete()
      .eq("user_id", user_id)
      .eq("allergen_name", allergenName);

    if (result.error) throw result.error;
  }

  async getUserDetails(userId: string): Promise<UserDetails> {
    const { data, error } = await supabase
      .from("user_details")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 is "row not found" error
    return data || { user_id: userId, display_name: null, avatar_url: null };
  }

  async updateUserDetails(userDetails: UserDetails): Promise<UserDetails> {
    // Check if user details already exist
    const { data: existingData } = await supabase
      .from("user_details")
      .select("*")
      .eq("user_id", userDetails.user_id);

    let data;
    let error;

    if (existingData && existingData.length > 0) {
      // Update existing record
      ({ data, error } = await supabase
        .from("user_details")
        .update({
          display_name: userDetails.display_name,
          avatar_url: userDetails.avatar_url,
        })
        .eq("user_id", userDetails.user_id)
        .select()
        .single());
    } else {
      // Insert new record
      ({ data, error } = await supabase
        .from("user_details")
        .insert(userDetails)
        .select()
        .single());
    }

    if (error) throw error;
    return data;
  }

  async getUserAllergensView(): Promise<UserData[]> {
    const { data, error } = await supabase
      .from("user_allergen_view")
      .select("*");

    if (error) throw error;
    return data || [];
  }

  async getCurrentUserAllergenInfo(): Promise<UserData | null> {
    const { data: user } = await supabase.auth.getUser();

    if (!user.user) return null;

    const { data, error } = await supabase
      .from("user_allergen_view")
      .select("*")
      .eq("user_id", user.user.id)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  }

  addAllergenForWorker(
    workers: UserData[],
    workerName: string,
    allergen: Allergen,
  ): UserData[] {
    // Return a new array with the modified worker
    return workers.map((worker) => {
      // If this is not the target worker, return it unchanged
      if (worker.name !== workerName) {
        return worker;
      }

      // This is the target worker - create a new object with filtered allergen_info
      return {
        ...worker,
        allergen_info: worker.allergen_info.concat(allergen),
      };
    });
  }

  updateAllergenForWorker(
    workers: UserData[],
    workerName: string,
    allergen: Allergen,
  ): UserData[] {
    // Return a new array with the modified worker
    return workers.map((worker) => {
      // If this is not the target worker, return it unchanged
      if (worker.name !== workerName) {
        return worker;
      }

      // This is the target worker - create a new object with filtered allergen_info
      const removedAllergen = worker.allergen_info.filter(
        (info) => info.name.toLowerCase() !== allergen.name.toLowerCase(),
      );
      return {
        ...worker,
        allergen_info: removedAllergen.concat(allergen),
      };
    });
  }

  removeAllergenForWorker(
    workers: UserData[],
    workerName: string,
    allergenName: string,
  ): UserData[] {
    // Return a new array with the modified worker
    return workers.map((worker) => {
      // If this is not the target worker, return it unchanged
      if (worker.name !== workerName) {
        return worker;
      }

      // This is the target worker - create a new object with filtered allergen_info
      return {
        ...worker,
        allergen_info: worker.allergen_info.filter(
          (info) => info.name.toLowerCase() !== allergenName.toLowerCase(),
        ),
      };
    });
  }

  getWorkerWithoutAllergen(
    workers: UserData[],
    workerName: string,
    allergenName: string,
  ): UserData | null {
    // Find the worker by name
    const worker = workers.find((w) => w.name === workerName);

    // If worker not found, return null
    if (!worker) {
      return null;
    }

    // Return a new worker object with the allergen filtered out
    return {
      ...worker,
      allergen_info: worker.allergen_info.filter(
        (info) => info.name.toLowerCase() !== allergenName.toLowerCase(),
      ),
    };
  }
}

const userService = new UserService();
export default userService;
