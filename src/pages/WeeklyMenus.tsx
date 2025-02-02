import React from "react";
import { Link } from "react-router-dom";

export const WeeklyMenus: React.FC = () => {
  return (
    <div>
      <h2>Weekly Menus</h2>
      <ul>
        <li>
          <Link to="daily/1">Monday</Link>
        </li>
        <li>
          <Link to="daily/2">Tuesday</Link>
        </li>
        <li>
          <Link to="daily/3">Wednesday</Link>
        </li>
        <li>
          <Link to="daily/4">Thursday</Link>
        </li>
        <li>
          <Link to="daily/5">Friday</Link>
        </li>
        <li>
          <Link to="daily/6">Saturday</Link>
        </li>
        <li>
          <Link to="daily/7">Sunday</Link>
        </li>
      </ul>
    </div>
  );
};
