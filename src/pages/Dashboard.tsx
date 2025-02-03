import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { WeeklyMenus } from "./WeeklyMenus";
import { BrowseDishes } from "./BrowseDishes";
import { Allergies } from "./Allergies";
import { Settings } from "./Settings";
import { DailyMenu } from "./DailyMenu";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const Dashboard: React.FC = () => {
  const { session, signOut } = useAuth();
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
    <div id="dashboard">
      {/* <Header /> */}
      <>
        <h2>Welcome, {session?.user?.email}</h2>
        <div>
          <button onClick={handleSignOut} className="sign-out-button">
            Sign out
          </button>
        </div>
      </>
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
