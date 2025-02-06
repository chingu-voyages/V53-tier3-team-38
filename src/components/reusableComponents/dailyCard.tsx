import type React from "react";
import { CustomButton } from "./customButton";

interface DailyCardProps {
  day: string;
  date: number;
  mealTitle: string;
  dishCount: number;
}

export const DailyCard: React.FC<DailyCardProps> = ({
  day,
  date,
  mealTitle,
  dishCount,
}) => {
  return (
    <div
      className="flex items-center justify-between bg-[#ECF0F1] rounded-lg w-full max-w-sm"
      style={{ padding: "1rem" }}
    >
      <div
        className="flex items-center"
        style={{ marginInlineStart: "1rem", gap: "1rem" }}
      >
        <div className="text-center pointer-events-none">
          <div className="font-semibold">{day}</div>
          <div className="text-large">{date}</div>
        </div>
        <div className="pointer-events-none">
          <div className="font-medium">{mealTitle}</div>
          <div className="text-large text-gray-600">{dishCount} Dishes</div>
        </div>
      </div>
      <CustomButton size="small" variantColor="green">
        Edit
      </CustomButton>
    </div>
  );
};
