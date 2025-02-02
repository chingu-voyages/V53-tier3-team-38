import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { WeeklyMenus } from "./WeeklyMenus";
import { BrowseDishes } from "./BrowseDishes";
import { Allergies } from "./Allergies";
import { Settings } from "./Settings";
import { DailyMenu } from "./DailyMenu";

export const Dashboard: React.FC = () => {
  return (
    <div id="dashboard">
      {/* <Header /> */}
      {/* <Sidebar /> */}
      <div id="content">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="manage-menus" element={<WeeklyMenus />} />
          <Route path="manage-menus/daily/:id" element={<DailyMenu />} />
          <Route path="dishes" element={<BrowseDishes />} />
          <Route path="allergies" element={<Allergies />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard/home" />} />
        </Routes>
      </div>
    </div>
  );
};
