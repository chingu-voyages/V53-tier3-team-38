import type React from "react";
import { CustomButton } from "./customButton";
import { DailyCardProps } from "@/types/database.types";

export const DailyCard: React.FC<DailyCardProps> = ({
  day,
  date,
  mealTitle,
  dishCount,
}) => {
  const formatDate = new Date(date);

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
          <div className="whitespace-nowrap text-md">
            {`${formatDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
          </div>
        </div>
        <div className="pointer-events-none">
          <div className="font-medium">{mealTitle}</div>
          <div className="text-sm text-gray-600">{dishCount} Dishes</div>
        </div>
      </div>
      <CustomButton size="small" variantColor="green">
        Edit
      </CustomButton>
    </div>
  );
};
