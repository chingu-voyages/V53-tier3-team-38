import { Bell, MenuIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import userService from "@/services/userManagement";
import { UserData } from "@/types/database.types";

export const Header: React.FC = () => {
  const { session } = useAuth();
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      const data = await userService.getCurrentUserAllergenInfo();
      setUserInfo(data);
    }

    fetchUserData();
  }, []);

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
            {userInfo?.avatar_url ? (
              <img
                src={userInfo?.avatar_url}
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center w-8 h-8 rounded-full object-cover border-2 border-gray-200 bg-gray-200">
                <div className="text-sm text-black">
                  {userInfo?.name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            <span
              className="font-medium"
              style={{ color: "#2C3E50", pointerEvents: "none" }}
            >
              {session?.user?.user_metadata &&
              session?.user?.user_metadata.display_name
                ? session?.user?.user_metadata.display_name
                : session?.user?.email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
