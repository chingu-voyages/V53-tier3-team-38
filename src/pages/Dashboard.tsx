import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { WeeklyMenus } from "./WeeklyMenus";
import { BrowseDishes } from "./BrowseDishes";
import { Allergies } from "./Allergies";
import { Settings } from "./Settings";
import { DailyMenu } from "./DailyMenu";
import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";
import { UserManagement } from "./UserManagement";

export const Dashboard: React.FC = () => {
  return (
    <div
      className="flex w-screen h-screen"
      style={{ backgroundColor: "#ECF0F1" }}
    >
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main
          className="flex flex-1 overflow-y-scroll"
          style={{ backgroundColor: "#ECF0F1" }}
        >
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="manage-menus" element={<WeeklyMenus />} />
            <Route path="manage-menus/daily/:id" element={<DailyMenu />} />
            <Route path="browse-dishes" element={<BrowseDishes />} />
            <Route path="allergies" element={<Allergies />} />
            <Route path="settings" element={<Settings />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="*" element={<Navigate to="/dashboard/home" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
