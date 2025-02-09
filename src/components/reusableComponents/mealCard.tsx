import type React from "react";

interface MealCardProps {
  title: string;
  ingredients: string[];
  calories: number;
  allergens: string[];
}

export const MealCard: React.FC<MealCardProps> = ({
  title,
  ingredients,
  calories,
  allergens,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-[125.6px] w-[244.66px]">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">
        Ingredients: {ingredients.join(", ")}
      </p>
      <p className="text-sm mb-2">{calories} calories</p>
      <p className="text-sm">
        <span className="font-medium">Allergens:</span>{" "}
        {allergens.length > 0 ? allergens.join(", ") : "None"}
      </p>
    </div>
  );
};
