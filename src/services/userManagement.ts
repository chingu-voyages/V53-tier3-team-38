import supabase from "@/supabase-client";

export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data;
}

export async function getRoles() {
  const { data, error } = await supabase.from("roles").select("*");
  if (error) throw error;
  return data;
}

// export async function addRole(user_id: string, role_name: string) {}

// export async function removeRole(user_id: string, role_name: string) {}
