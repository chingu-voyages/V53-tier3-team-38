import React, { useEffect, useState } from "react";
import {
  Calendar,
  RefreshCw,
  AlertCircle,
  Check,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// import { format, addDays, startOfWeek } from "date-fns";
import { format } from "date-fns";
import { CustomButton } from "@/components/reusableComponents/customButton";
import { useNavigate } from "react-router-dom";
import dishService from "@/services/dish";
import { DaySchedule, Dish, UserData } from "@/types/database.types";
import userService from "@/services/userManagement";
import mealCalendarService from "@/services/mealCalendar";

export const WeeklyMenus: React.FC = () => {
  const [workerData, setWorkerData] = useState<UserData[]>([]);
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [safeDishes, setSafeDishes] = useState<Dish[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSafeDishes() {
      const userData = await userService.getUserAllergensView();
      setWorkerData(userData);

      const dishData = await dishService.getDishes();
      const userAllergens = workerData.flatMap((user) =>
        user.allergen_info.map((a) => a.name),
      );

      const safe = dishData.filter(
        (dish) =>
          !dish.allergens?.some((allergen) => userAllergens.includes(allergen)),
      );
      setSafeDishes(safe);
    }

    fetchSafeDishes();
  }, []);

  useEffect(() => {
    // const weekStart = startOfWeek(currentWeek, {
    //   weekStartsOn: 1,
    // });
    async function fetchWeeklyMenus() {
      const latestSchedule = await mealCalendarService.getWeeklyMenuPlan();
      setSchedule(latestSchedule);
    }

    fetchWeeklyMenus();
  }, [currentWeek, safeDishes]);
  const generateWeeklyMenu = () => {
    if (safeDishes.length === 0) {
      setError("Unable to generate menu at this time");
      setTimeout(() => setError(null), 3000);
      return;
    }
    const newSchedule = schedule.map((day) => {
      if (day.isDayOff) return day;
      const randomIndex = Math.floor(Math.random() * safeDishes.length);
      return {
        ...day,
        dish: safeDishes[randomIndex],
      };
    });
    setSchedule(newSchedule);
    setSuccess("Weekly menu generated successfully!");
    setTimeout(() => setSuccess(null), 3000);
  };
  const navigateDay = (date: string) => {
    navigate(`/dashboard/manage-menus/daily/${date}`);
  };
  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    if (newDate < new Date()) {
      setError("Cannot schedule for past weeks");
      setTimeout(() => setError(null), 3000);
      return;
    }
    setCurrentWeek(newDate);
  };
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: "#ECF0F1",
        padding: "1rem",
      }}
    >
      <div
        className="max-w-[1400px] mx-auto space-y-6"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-lg border border-gray-200"
          style={{ padding: "1rem", gap: "1rem" }}
        >
          <h1 className="text-xl font-semibold text-gray-900 pointer-events-none">
            Weekly Menu Planning
          </h1>
          <div className="flex items-center" style={{ gap: "0.5rem" }}>
            <button
              onClick={() => navigateWeek("prev")}
              className="rounded-lg hover:bg-gray-50 border-gray-200 cursor-pointer"
              style={{ padding: "0.5rem" }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div
              className="bg-white rounded-lg flex items-center pointer-events-none"
              style={{
                gap: "0.5rem",
                paddingInline: "1rem",
                paddingBlock: "0.5rem",
              }}
            >
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {format(currentWeek, "MMMM d, yyyy")}
              </span>
            </div>
            <button
              onClick={() => navigateWeek("next")}
              className="rounded-lg hover:bg-gray-50 border-gray-200 cursor-pointer"
              style={{ padding: "0.5rem" }}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        {error && (
          <div
            className="rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-600"
            style={{ padding: "0.75rem" }}
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}
        {success && (
          <div
            className="rounded-lg bg-green-50 border border-green-200 flex items-center gap-2 text-green-600"
            style={{ padding: "0.75rem" }}
          >
            <Check className="w-5 h-5" />
            {success}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {schedule.map((day, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg ${day.isDayOff ? "bg-gray-50" : ""}`}
            >
              <div
                className="border-b border-gray-200"
                style={{ padding: "1rem" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold text-gray-900">
                      {format(day.date, "EEEE")}
                    </span>
                    <div
                      className="text-sm text-gray-500"
                      style={{ marginTop: "0.125rem" }}
                    >
                      {format(day.date, "MMMM d, yyyy")}
                    </div>
                  </div>
                  <button
                    onClick={() => navigateDay(day.date)}
                    className={
                      "rounded-full text-sm font-medium bg-green-600 text-white hover:opacity-90 transition-opacity cursor-pointer"
                    }
                    style={{
                      cursor: "pointer",
                      paddingInline: "0.75rem",
                      paddingBlock: "0.375rem",
                    }}
                  >
                    Open
                  </button>
                </div>
              </div>
              <div style={{ padding: "1rem" }}>
                {!day.isDayOff &&
                  (day.dishes ? (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {day.dishes[0].name}
                      </h3>
                      <p
                        className="text-sm text-gray-500"
                        style={{ marginTop: "0.25rem" }}
                      >
                        {day.dishes[0].ingredients
                          ? day.dishes[0].ingredients.join(", ")
                          : ""}
                      </p>
                      <p
                        className="text-sm font-medium text-gray-600"
                        style={{ marginTop: "0.5rem" }}
                      >
                        {day.dishes[0].calories} calories
                      </p>
                    </div>
                  ) : (
                    <div className="h-24 flex items-center justify-center">
                      <p className="text-sm text-gray-500">No dish assigned</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className="flex items-center justify-between gap-4 bg-white rounded-lg border border-gray-200"
          style={{ padding: "1rem" }}
        >
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <Info className="w-5 h-5" />
            <p>All menu items are safe for staff consumption</p>
          </div>
          <CustomButton
            size="medium"
            type="submit"
            variantColor="green"
            onClick={generateWeeklyMenu}
            style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
          >
            <RefreshCw className="w-5 h-5" />
            Generate Menu
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
