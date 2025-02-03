import type React from "react";
import { CustomButton } from "./customButton";

type WeeklyCardContent =
  | { type: "empty" }
  | { type: "meals"; meals: Array<{ name: string; calories: number }> }
  | { type: "dayOff" };

interface WeeklyCardProps {
  dayOfWeek: string;
  date: string;
  content: WeeklyCardContent;
}

export const WeeklyCard: React.FC<WeeklyCardProps> = ({
  dayOfWeek,
  date,
  content,
}) => {
  return (
    <div className="relative bg-white border border-gray-200 rounded-lg p-4 h-[212.4px] w-[238.66px]">
      <div className="absolute top-2 right-2">
        <CustomButton size="small" variantColor="green">
          Open
        </CustomButton>
      </div>
      <div className="mb-2">
        <div className="font-semibold">{dayOfWeek}</div>
        <div className="text-sm text-gray-500">{date}</div>
      </div>
      <div className="mt-4">
        {content.type === "empty" && (
          <p className="text-gray-500">No dishes assigned</p>
        )}
        {content.type === "meals" && (
          <ul className="space-y-2">
            {content.meals.map((meal, index) => (
              <li key={index}>
                <div>{meal.name}</div>
                <div className="text-sm text-gray-500">
                  {meal.calories} calories
                </div>
              </li>
            ))}
          </ul>
        )}
        {content.type === "dayOff" && (
          <p className="text-xl font-semibold">Day Off</p>
        )}
      </div>
    </div>
  );
};
