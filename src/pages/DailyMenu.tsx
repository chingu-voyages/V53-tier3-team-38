import React, { useEffect, useState } from "react";
import { Save, ChevronLeft, AlertCircle, Check, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
const mockDishes = [
  {
    id: 1,
    name: "Grilled Salmon",
    ingredients: ["Salmon", "Lemon", "Herbs"],
    calories: 450,
    allergens: ["Fish"],
  },
  {
    id: 2,
    name: "Vegetable Stir Fry",
    ingredients: ["Broccoli", "Carrots", "Tofu", "Soy Sauce"],
    calories: 300,
    allergens: ["Soy"],
  },
  {
    id: 4,
    name: "Quinoa Bowl",
    ingredients: ["Quinoa", "Vegetables", "Olive Oil"],
    calories: 400,
    allergens: [],
  },
  {
    id: 5,
    name: "Grilled Chicken",
    ingredients: ["Chicken", "Herbs", "Olive Oil"],
    calories: 350,
    allergens: [],
  },
];
const mockWorkerAllergies = [
  {
    workerId: 1,
    name: "Sarah Johnson",
    allergies: ["Fish", "Shellfish"],
  },
  {
    workerId: 2,
    name: "Mike Chen",
    allergies: ["Dairy"],
  },
];
interface Dish {
  id: number;
  name: string;
  ingredients: string[];
  calories: number;
  allergens: string[];
}
export const DailyMenu: React.FC = () => {
  const [selectedDate] = useState(new Date());
  const [menuDishes, setMenuDishes] = useState<Dish[]>([
    {
      id: 4,
      name: "Quinoa Bowl",
      ingredients: ["Quinoa", "Vegetables", "Olive Oil"],
      calories: 400,
      allergens: [],
    },
    {
      id: 5,
      name: "Grilled Chicken",
      ingredients: ["Chicken", "Herbs", "Olive Oil"],
      calories: 350,
      allergens: [],
    },
  ]);
  const [safeDishes, setSafeDishes] = useState<Dish[]>([]);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  useEffect(() => {
    const workerAllergens = mockWorkerAllergies.flatMap(
      (worker) => worker.allergies,
    );
    const safe = mockDishes.filter(
      (dish) =>
        !dish.allergens.some((allergen) => workerAllergens.includes(allergen)),
    );
    setSafeDishes(safe);
  }, []);
  const handleAddDish = (dishId: string) => {
    const dish = safeDishes.find((d) => d.id === parseInt(dishId));
    if (dish && !menuDishes.some((d) => d.id === dish.id)) {
      setMenuDishes((prev) => [...prev, dish]);
    }
  };
  const handleRemoveDish = (dishId: number) => {
    setMenuDishes((prev) => prev.filter((dish) => dish.id !== dishId));
  };
  const handleSave = () => {
    setMessage({
      type: "success",
      text: "Menu saved successfully!",
    });
    setTimeout(() => setMessage(null), 3000);
  };
  const navigate = useNavigate();
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: "#ECF0F1",
        padding: "1rem",
      }}
    >
      <div
        className="mx-auto"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-lg border border-gray-200"
          style={{ padding: "1rem" }}
        >
          <div className="flex items-center" style={{ gap: "0.75rem" }}>
            <button
              onClick={() => {
                navigate("/dashboard/manage-menus");
              }}
              className="hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              style={{ padding: "0.5rem" }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Daily Menu
              </h1>
              <p className="text-sm text-gray-500">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 rounded-lg bg-green-600 text-white hover:opacity-90 transition-opacity cursor-pointer"
            style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
          >
            <Save className="w-5 h-5" />
            <span>Save Menu</span>
          </button>
        </div>
        {message && (
          <div
            className={`rounded-lg flex items-center gap-2 ${message.type === "success" ? "bg-green-50 border border-green-200 text-green-600" : "bg-red-50 border border-red-200 text-red-600"}`}
            style={{ padding: "0.75rem" }}
          >
            {message.type === "success" ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {message.text}
          </div>
        )}
        <div
          className="bg-white rounded-lg border border-gray-200"
          style={{ padding: "1rem" }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              className="flex-1 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
              onChange={(e) => handleAddDish(e.target.value)}
              value=""
            >
              <option value="" disabled>
                Select a dish to add...
              </option>
              {safeDishes.map((dish) => (
                <option
                  key={dish.id}
                  value={dish.id}
                  disabled={menuDishes.some((d) => d.id === dish.id)}
                >
                  {dish.name} ({dish.calories} cal)
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200" style={{ padding: "1rem" }}>
            <h2 className="font-medium text-gray-900">Menu Items</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {menuDishes.length > 0 ? (
              menuDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="flex items-center justify-between"
                  style={{ padding: "1rem" }}
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{dish.name}</h3>
                    <p className="text-sm text-gray-500">
                      {dish.ingredients.join(", ")}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-600"
                      style={{ marginTop: "0.25rem" }}
                    >
                      {dish.calories} calories
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveDish(dish.id)}
                    className="text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    style={{ padding: "0.5rem" }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div
                className="text-center text-gray-500"
                style={{ padding: "2rem" }}
              >
                No dishes added to the menu yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
