import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export const DailyMenu: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/dashboard/manage-menus");
  };

  return (
    <div>
      <h2>Daily Menu for Day {id}</h2>
      {/* Render the menu for the specific day */}
      <button onClick={handleBackClick}>{`<-`}</button>
    </div>
  );
};
