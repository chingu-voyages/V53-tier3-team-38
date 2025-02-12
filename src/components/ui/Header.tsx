import { Bell, MenuIcon } from "lucide-react";
import React from "react";
import { useAuth } from "@/context/AuthContext";

export const Header: React.FC = () => {
  const { session } = useAuth();

  return (
    <header
      className="flex items-center justify-between"
      style={{ backgroundColor: "#FFFFFF", height: "3.5rem" }}
    >
      <div
        className="flex items-center justify-between"
        style={{ marginLeft: "1rem" }}
      >
        <button className="md:hidden p-2" style={{ color: "#F8F9F9" }}>
          <MenuIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-4">
          <button
            className="relative"
            style={{ color: "#2C3E50", padding: "0.5rem" }}
          >
            <Bell className="w-6 h-6" />
            <span
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: "#F39C12",
                top: "0.25rem",
                right: "0.25rem",
              }}
            ></span>
          </button>
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <span
              className="font-medium"
              style={{ color: "#2C3E50", pointerEvents: "none" }}
            >
              {session?.user?.email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
