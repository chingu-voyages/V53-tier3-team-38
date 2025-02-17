import {
  AlertCircle,
  Calendar,
  ChefHat,
  CookingPot,
  LogOut,
  Menu,
  Settings,
  Utensils,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const Sidebar: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  async function handleSignOut(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <>
      <button
        className="md:hidden fixed top-2 right-4 z-50 cursor-pointer"
        onClick={toggleSidebar}
        style={{
          backgroundColor: "#FFFFFF",
          padding: "0.5rem",
          borderRadius: "0.25rem",
        }}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
        style={{
          backgroundColor: "#FFFFFF",
          padding: "1rem",
          height: "100vh",
          overflowY: "auto",
        }}
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
            onClick={closeSidebar}
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
            onClick={closeSidebar}
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
            onClick={closeSidebar}
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
            onClick={closeSidebar}
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
            onClick={closeSidebar}
          >
            <Settings className="w-5 h-5" />
            Settings
          </NavLink>
        </nav>
        <div className="p-4 space-y-2 fixed bottom-4">
          <button
            className="flex items-center gap-2 w-full rounded-lg cursor-pointer"
            style={{
              color: "#27AE60",
              paddingInline: "1rem",
              paddingBlock: "0.5rem",
            }}
            onClick={(e) => {
              handleSignOut(e);
              closeSidebar();
            }}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};
