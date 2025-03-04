import React, { useEffect, useState } from "react";
import { DailyCard } from "@/components/reusableComponents/dailyCard";
import { StatusCard } from "@/components/reusableComponents/statusCard";
import { AlertCircle, Calendar, ChefHat, Settings } from "lucide-react";
import mealCalendarService from "@/services/mealCalendar";
import { DailyCardProps } from "@/types/database.types";

const quickButtons = [
  {
    icon: ChefHat,
    label: "Add Dish",
  },
  {
    icon: AlertCircle,
    label: "Update Allergies",
  },
  {
    icon: Calendar,
    label: "Schedule",
  },
  {
    icon: Settings,
    label: "Settings",
  },
];

export const Home: React.FC = () => {
  const [dailyData, setDailyData] = useState<DailyCardProps[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await mealCalendarService.getDashboardData();
      setDailyData(data);
    }

    fetchData();
  }, []);

  return (
    <section style={{ padding: "1rem" }}>
      <div className="flex flex-wrap gap-6">
        <div
          className="flex flex-col lg:flex-2 rounded-xl"
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1rem",
          }}
        >
          <div
            style={{
              paddingBottom: "1rem",
            }}
          >
            <h2
              className="text-lg font-semibold"
              style={{
                color: "#2C3E50",
                pointerEvents: "none",
              }}
            >
              Weekly Menu Overview
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dailyData.map((day) => (
              <DailyCard
                date={day.date}
                day={day.day}
                mealTitle={day.mealTitle}
                dishCount={day.dishCount}
                key={day.day}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:w-1/3">
          <div
            className="rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              padding: "1rem",
            }}
          >
            <div>
              <h2
                className="text-lg font-semibold"
                style={{
                  color: "#2C3E50",
                  marginBottom: "1rem",
                  pointerEvents: "none",
                }}
              >
                Dietary Alerts
              </h2>
            </div>
            <div
              className="p-6 flex flex-col gap-4 items-center"
              style={{ marginBlockStart: "0.75rem" }}
            >
              <StatusCard type="alert" message="Nut Allergy Alert" />
              <StatusCard type="warning" message="Gluten-Free Options Needed" />
            </div>
          </div>
          <div
            className="rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              padding: "1rem",
            }}
          >
            <div>
              <h2
                className="text-lg font-semibold"
                style={{
                  color: "#2C3E50",
                  marginBottom: "1rem",
                  pointerEvents: "none",
                }}
              >
                Quick Links
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {quickButtons.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex flex-col gap-2 text-center items-center justify-center rounded-lg transition-colors hover:shadow-md cursor-pointer"
                    style={{
                      backgroundColor: "#ECF0F1",
                      padding: "1rem",
                    }}
                  >
                    <Icon
                      className="w-6 h-6 mx-auto mb-1 transition-colors"
                      style={{
                        color: "#16A085",
                      }}
                    />
                    <span
                      style={{
                        color: "#2C3E50",
                      }}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
