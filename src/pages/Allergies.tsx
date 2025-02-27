import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  Check,
  AlertTriangle,
  Search,
} from "lucide-react";
import userService from "@/services/userManagement";
import { Allergen, UserData } from "@/types/database.types";

export const Allergies = () => {
  const [workerAllergies, setWorkerAllergies] = useState<UserData[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [editingWorker, setEditingWorker] = useState<UserData | null>(null);
  const [editingAllergy, setEditingAllergy] = useState<Allergen | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingWorker, setDeletingWorker] = useState<UserData | null>(null);
  const [deletingAllergy, setDeletingAllergy] = useState<Allergen | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    async function fetchAllergenData() {
      const data = await userService.getUserAllergensView();
      setWorkerAllergies(data);
    }

    fetchAllergenData();
  }, []);

  const filteredWorkers = workerAllergies.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleSave = async (worker: UserData, allergen: Allergen) => {
    const isDuplicate = worker.allergen_info.some(
      (a) =>
        a.name.toLowerCase() === allergen.name.toLowerCase() &&
        (!editingAllergy ||
          a.name.toLowerCase() !== editingAllergy.name.toLowerCase()),
    );
    if (isDuplicate) {
      setMessage({
        type: "error",
        text: "This worker already has this allergy recorded",
      });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    try {
      const response = editingAllergy
        ? await userService.updateUserAllergen(worker.name, allergen)
        : await userService.addUserAllergen(worker.name, allergen);
      if ("success" in response && !response.success) {
        setMessage({
          type: "error",
          text: "Ran into a problem adding allergy",
        });
        return;
      }
    } catch (error) {
      console.error(
        `There was an error trying to ${editingAllergy ? "update" : "add"} allergen %s for worker %s: %s`,
        allergen.name,
        worker.name,
        error,
      );
      setMessage({
        type: "error",
        text: "Ran into a problem adding allergy",
      });
      return;
    }
    const updatedWorkerAllergies = editingAllergy
      ? userService.updateAllergenForWorker(
          workerAllergies,
          worker.name,
          allergen,
        )
      : userService.addAllergenForWorker(
          workerAllergies,
          worker.name,
          allergen,
        );
    setWorkerAllergies(updatedWorkerAllergies);
    setMessage({
      type: "success",
      text: `Allergen ${editingAllergy ? "updated" : "added"} successfully!`,
    });
    setEditingAllergy(null);
    setIsCreating(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = async (worker: UserData, allergen: Allergen) => {
    try {
      await userService.removeUserAllergen(worker.name, allergen.name);
    } catch (error) {
      console.error(
        "There was an error trying to remove allergen %s for worker %s: %s",
        allergen.name,
        worker.name,
        error,
      );
    }
    setWorkerAllergies(
      userService.removeAllergenForWorker(
        workerAllergies,
        worker.name,
        allergen.name,
      ),
    );
    setDeletingWorker(null);
    setDeletingAllergy(null);
    setMessage({
      type: "success",
      text: "Allergen deleted successfully!",
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
      <div className="w-full mx-auto">
        <div
          className="flex bg-white p-4 rounded-lg border border-gray-200"
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 className="text-xl font-semibold text-gray-900">
            Allergen Management
          </h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={{
                  paddingInline: "0.75rem",
                  paddingBlock: "0.5rem",
                  paddingLeft: "2.25rem",
                }}
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 rounded-lg bg-green-600 text-white hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{
                cursor: "pointer",
                paddingInline: "1rem",
                paddingBlock: "0.5rem",
              }}
            >
              <Plus className="w-5 h-5" />
              <span>Add Allergen</span>
            </button>
          </div>
        </div>
        {message && (
          <div
            className={`p-3 rounded-lg flex items-center gap-2 ${message.type === "success" ? "bg-green-50 border border-green-200 text-green-600" : "bg-red-50 border border-red-200 text-red-600"}`}
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ paddingBottom: "1rem" }}
        >
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => (
              <div
                key={worker.name}
                className="bg-white rounded-lg border border-gray-200"
              >
                <div
                  className="border-b border-gray-200"
                  style={{ padding: "1rem" }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={worker.avatar_url}
                      alt={worker.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h2 className="font-medium text-gray-900">
                        {worker.name}
                      </h2>
                      <p className="text-sm text-gray-500">{worker.email}</p>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {worker.allergen_info.length > 0 ? (
                    worker.allergen_info.map((allergen) => (
                      <div
                        key={allergen.name}
                        className="flex items-center justify-between"
                        style={{ padding: "1rem" }}
                      >
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900">
                            {allergen.name}
                          </div>
                          {allergen.notes && (
                            <p className="text-sm text-gray-500">
                              {allergen.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingWorker(worker);
                              setEditingAllergy(allergen);
                            }}
                            className="text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            style={{ padding: "0.5rem" }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeletingWorker(worker);
                              setDeletingAllergy(allergen);
                            }}
                            className="text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            style={{ padding: "0.5rem" }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      className="text-center text-gray-500"
                      style={{ padding: "1rem" }}
                    >
                      No allergies recorded
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
              No employees found matching your search
            </div>
          )}
        </div>
      </div>
      {(isCreating || editingAllergy) && (
        <AllergyFormModal
          allergy={editingAllergy}
          worker={editingWorker}
          workers={filteredWorkers}
          onClose={() => {
            setEditingWorker(null);
            setEditingAllergy(null);
            setIsCreating(false);
          }}
          onSave={handleSave}
          onChangeWorker={(new_worker) => {
            if (new_worker) {
              const newWorker = filteredWorkers.filter(
                (w) => w.name.toLowerCase() === new_worker.name.toLowerCase(),
              )[0];
              setEditingWorker(newWorker);
            }
          }}
        />
      )}
      {deletingWorker && deletingAllergy && (
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
            <div
              className="flex items-center gap-3 text-red-600"
              style={{ marginBottom: "1rem" }}
            >
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-semibold text-gray-900 pointer-events-none">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-gray-500 pointer-events-none">
              Are you sure you want to delete this allergy record? This action
              cannot be undone.
            </p>
            <div
              className="flex justify-end gap-3"
              style={{ marginTop: "1.5rem" }}
            >
              <button
                onClick={() => {
                  setDeletingWorker(null);
                  setDeletingAllergy(null);
                }}
                className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingWorker, deletingAllergy)}
                className="rounded-lg bg-red-600 text-white hover:bg-red-300 transition-opacity cursor-pointer"
                style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
function AllergyFormModal({
  allergy,
  worker,
  workers,
  onClose,
  onSave,
  onChangeWorker,
}: {
  allergy: Allergen | null;
  worker: UserData | null;
  workers: UserData[];
  onClose: () => void;
  onSave: (worker: UserData, allergy: Allergen) => void;
  onChangeWorker: Dispatch<SetStateAction<UserData | null>>;
}) {
  const [formData, setFormData] = useState<Allergen>({
    name: allergy?.name || "",
    notes: allergy?.notes || "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (worker) {
      onSave(worker, formData);
    }
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
        style={{ padding: "1.5rem", marginInline: "1rem" }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "1.5rem" }}
        >
          <h3 className="text-lg font-semibold text-gray-900 pointer-events-none">
            {allergy ? "Edit Allergen" : "Add Allergen"}
          </h3>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            style={{ padding: "0.5rem" }}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          style={{}}
        >
          <div>
            <select
              value={worker?.name || ""}
              onChange={(e) => {
                const selectedWorker = workers.find(
                  (w) => w.name === e.target.value,
                );
                onChangeWorker(selectedWorker || null);
              }}
              className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
              required
            >
              <option value="">Select a worker</option>
              {workers.map((worker) => (
                <option key={worker.name} value={worker.name}>
                  {worker.name}
                </option>
              ))}
            </select>
          </div>
          <div>
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
              placeholder="Enter allergy type..."
            />
          </div>
          <div>
            <textarea
              value={formData.notes || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
              rows={3}
              placeholder="Additional notes..."
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
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
              disabled={!worker || !formData.name}
            >
              {allergy ? "Save Changes" : "Add Allergen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
