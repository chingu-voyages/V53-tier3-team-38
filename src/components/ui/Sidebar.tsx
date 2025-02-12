import {
  AlertCircle,
  Calendar,
  ChefHat,
  CookingPot,
  LogOut,
  Settings,
  Utensils,
} from "lucide-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const Sidebar: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside
      className="hidden md:flex w-64 flex-col"
      style={{ backgroundColor: "#FFFFFF", padding: "1rem" }}
    >
      <div className="flex items-center gap-2 mb-8 p-4">
        <ChefHat className="w-8 h-8" style={{ color: "#27AE60" }} />
        <h1
          className="text-xl font-semibold"
          style={{ color: "#2C3E50", pointerEvents: "none" }}
        >
          Menu Manager
        </h1>
      </div>
      <nav
        className="px-4 flex flex-col flex-1"
        style={{ marginTop: "2rem", gap: "1rem" }}
      >
        <NavLink
          to="/dashboard/home"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg transition-colors ${
              isActive
                ? "bg-[#27AE60] text-[#F8F9F9]"
                : "hover:bg-gray-400 text-[#2C3E50]"
            }`
          }
          style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
        >
          <Calendar className="w-5 h-5" />
          Dashboard
        </NavLink>
        <NavLink
          to="/dashboard/manage-menus"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg transition-colors ${
              isActive
                ? "bg-[#27AE60] text-[#F8F9F9]"
                : "hover:bg-gray-400 text-[#2C3E50]"
            }`
          }
          style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
        >
          <Utensils className="w-5 h-5" />
          Manage Menus
        </NavLink>
        <NavLink
          to="/dashboard/browse-dishes"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg transition-colors ${
              isActive
                ? "bg-[#27AE60] text-[#F8F9F9]"
                : "hover:bg-gray-400 text-[#2C3E50]"
            }`
          }
          style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
        >
          <CookingPot className="w-5 h-5" />
          Browse Dishes
        </NavLink>
        <NavLink
          to="/dashboard/allergies"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg transition-colors ${
              isActive
                ? "bg-[#27AE60] text-[#F8F9F9]"
                : "hover:bg-gray-400 text-[#2C3E50]"
            }`
          }
          style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
        >
          <AlertCircle className="w-5 h-5" />
          Allergies
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg transition-colors ${
              isActive
                ? "bg-[#27AE60] text-[#F8F9F9]"
                : "hover:bg-gray-400 text-[#2C3E50]"
            }`
          }
          style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </nav>
      <div className="p-4 space-y-2">
        <button
          className="flex items-center gap-2 w-full rounded-lg cursor-pointer"
          style={{
            color: "#27AE60",
            paddingInline: "1rem",
            paddingBlock: "0.5rem",
          }}
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};
