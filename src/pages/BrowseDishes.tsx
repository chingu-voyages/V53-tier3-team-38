import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, AlertCircle, Check } from "lucide-react";
import dishService from "@/services/dish";
import { Dish } from "@/types/database.types";

export const BrowseDishes: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingDish, setDeletingDish] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  useEffect(() => {
    async function fetchDishes() {
      const data = await dishService.getDishes();
      setDishes(data);
    }

    fetchDishes();
  }, []);
  const handleSave = (dish: Dish) => {
    if (editingDish) {
      setDishes((prev) => prev.map((d) => (d.name === dish.name ? dish : d)));
      setMessage({
        type: "success",
        text: "Dish updated successfully!",
      });
    } else {
      setDishes((prev) => [
        ...prev,
        {
          ...dish,
        },
      ]);
      setMessage({
        type: "success",
        text: "Dish created successfully!",
      });
    }
    setEditingDish(null);
    setIsCreating(false);
    setTimeout(() => setMessage(null), 3000);
  };
  const handleDelete = (name: string) => {
    setDishes((prev) => prev.filter((dish) => dish.name !== name));
    setDeletingDish(null);
    setMessage({
      type: "success",
      text: "Dish deleted successfully!",
    });
    setTimeout(() => setMessage(null), 3000);
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
        className="max-w-7xl mx-auto"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-lg border border-gray-200"
          style={{ padding: "1rem", marginBottom: "1rem" }}
        >
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-gray-900">
              Browse Dishes
            </h1>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 rounded-lg bg-green-600 text-white hover:opacity-90 transition-opacity cursor-pointer"
            style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
          >
            <Plus className="w-5 h-5" />
            <span>New Dish</span>
          </button>
        </div>
        {/* Messages */}
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
        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dishes.map((dish) => (
            <div
              key={dish.name}
              className="bg-white rounded-lg border border-gray-200"
            >
              <div style={{ padding: "1rem" }}>
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {dish.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingDish(dish)}
                      className="text-gray-600 hover:bg-gray-100 rounded-lg transition-colors  cursor-pointer"
                      style={{ padding: "0.5rem" }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingDish(dish.name)}
                      className="text-red-600 hover:bg-red-50 rounded-lg transition-colors  cursor-pointer"
                      style={{ padding: "0.5rem" }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p
                  className="text-sm text-gray-500"
                  style={{ marginTop: "0.5rem" }}
                >
                  {dish.ingredients?.join(", ")}
                </p>
                <div
                  className="flex items-center gap-2"
                  style={{ marginTop: "0.75rem" }}
                >
                  <span className="text-sm font-medium text-gray-600">
                    {dish.calories} calories
                  </span>
                  {dish.allergens && dish.allergens.length > 0 && (
                    <span
                      className="text-xs bg-yellow-100 text-yellow-800 rounded-full"
                      style={{
                        paddingInline: "0.5rem",
                        paddingBlock: "0.125rem",
                      }}
                    >
                      Contains allergens
                    </span>
                  )}
                </div>
                {dish.allergens && dish.allergens.length > 0 && (
                  <p
                    className="text-sm text-yellow-600"
                    style={{ marginTop: "0.5rem" }}
                  >
                    Allergens: {dish.allergens.join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Edit/Create Modal */}
        {(editingDish || isCreating) && (
          <DishFormModal
            dish={editingDish}
            onClose={() => {
              setEditingDish(null);
              setIsCreating(false);
            }}
            onSave={handleSave}
          />
        )}
        {/* Delete Confirmation Modal */}
        {deletingDish && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50"
            style={{
              zIndex: 50,
            }}
          >
            <div
              className="bg-white rounded-xl max-w-md w-full"
              style={{ padding: "1.5rem", marginInline: "1rem" }}
            >
              <h3
                className="text-lg font-semibold text-gray-900"
                style={{ marginBottom: "0.5rem" }}
              >
                Confirm Deletion
              </h3>
              <p className="text-gray-500">
                Are you sure you want to delete this dish? This action cannot be
                undone.
              </p>
              <div
                className="flex justify-end gap-3"
                style={{ marginTop: "1.5rem" }}
              >
                <button
                  onClick={() => setDeletingDish(null)}
                  className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                  style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deletingDish)}
                  className="rounded-lg bg-red-600 text-white hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
function DishFormModal({
  dish,
  onClose,
  onSave,
}: {
  dish: Dish | null;
  onClose: () => void;
  onSave: (dish: Dish) => void;
}) {
  const [formData, setFormData] = useState<Omit<Dish, "id">>({
    name: dish?.name || "",
    ingredients: dish?.ingredients || [],
    calories: dish?.calories || 0,
    allergens: dish?.allergens || [],
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
    });
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      style={{
        zIndex: 50,
      }}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full"
        style={{ marginInline: "1rem", padding: "1.5rem" }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "1.5rem" }}
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {dish ? "Edit Dish" : "New Dish"}
          </h3>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-lg transition-colors  cursor-pointer"
            style={{ padding: "0.5rem" }}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ marginBottom: "0.25rem" }}
            >
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ marginBottom: "0.25rem" }}
            >
              Ingredients (comma-separated)
            </label>
            <input
              type="text"
              value={formData.ingredients?.toString()}
              onChange={(e) => {
                const value = e.target.value;
                const ingredientsArray = value.split(",");
                setFormData((prev) => ({
                  ...prev,
                  ingredients: ingredientsArray,
                }));
              }}
              className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ marginBottom: "0.25rem" }}
            >
              Calories
            </label>
            <input
              type="text"
              value={formData.calories}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  calories: Number(e.target.value),
                }))
              }
              className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
              required
              min="0"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ marginBottom: "0.25rem" }}
            >
              Allergens (comma-separated)
            </label>
            <input
              type="text"
              value={formData.allergens?.toString()}
              onChange={(e) => {
                const value = e.target.value;
                const allergensArray = value.split(",");
                setFormData((prev) => ({
                  ...prev,
                  allergens: allergensArray,
                }));
              }}
              className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
            />
          </div>
          <div
            className="flex justify-end gap-3"
            style={{ marginTop: "1.5rem" }}
          >
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-green-600 text-white hover:opacity-90 transition-opacity cursor-pointer"
              style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
            >
              {dish ? "Save Changes" : "Create Dish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
