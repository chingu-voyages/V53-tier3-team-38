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
    <div className="flex items-center justify-between p-4 bg-[#E2E8F0] rounded-lg w-full max-w-sm">
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <div className="font-semibold">{day}</div>
          <div className="text-sm">{date}</div>
        </div>
        <div>
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
