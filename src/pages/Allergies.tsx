import React, { useState } from "react";
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
interface Allergy {
  id: string;
  workerId: string;
  type: string;
  notes?: string;
}
interface Worker {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
const mockWorkers: Worker[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@kitchenmanager.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.c@kitchenmanager.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@kitchenmanager.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.w@kitchenmanager.com",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "5",
    name: "Alice Thompson",
    email: "alice.t@kitchenmanager.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "6",
    name: "David Park",
    email: "david.p@kitchenmanager.com",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "7",
    name: "Sofia Martinez",
    email: "sofia.m@kitchenmanager.com",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "8",
    name: "Robert Kim",
    email: "robert.k@kitchenmanager.com",
    avatar:
      "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
const mockAllergies: Allergy[] = [
  {
    id: "1",
    workerId: "1",
    type: "Shellfish",
    notes: "Avoid all seafood contact",
  },
  {
    id: "2",
    workerId: "1",
    type: "Peanuts",
    notes: "Including peanut oil",
  },
  {
    id: "3",
    workerId: "2",
    type: "Dairy",
    notes: "Lactose intolerant",
  },
  {
    id: "4",
    workerId: "3",
    type: "Tree Nuts",
    notes: "All types of tree nuts",
  },
  {
    id: "5",
    workerId: "5",
    type: "Soy",
    notes: "Including soy sauce",
  },
];
export const Allergies = () => {
  const [allergies, setAllergies] = useState<Allergy[]>(mockAllergies);
  const [workers] = useState<Worker[]>(mockWorkers);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingAllergy, setEditingAllergy] = useState<Allergy | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingAllergy, setDeletingAllergy] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleSave = (allergy: Allergy) => {
    const isDuplicate = allergies.some(
      (a) =>
        a.workerId === allergy.workerId &&
        a.type.toLowerCase() === allergy.type.toLowerCase() &&
        a.id !== allergy.id,
    );
    if (isDuplicate) {
      setMessage({
        type: "error",
        text: "This worker already has this allergy recorded",
      });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    if (editingAllergy) {
      setAllergies((prev) =>
        prev.map((a) => (a.id === allergy.id ? allergy : a)),
      );
      setMessage({
        type: "success",
        text: "Allergy updated successfully!",
      });
    } else {
      setAllergies((prev) => [
        ...prev,
        {
          ...allergy,
          id: Math.random().toString(36).substr(2, 9),
        },
      ]);
      setMessage({
        type: "success",
        text: "Allergy added successfully!",
      });
    }
    setEditingAllergy(null);
    setIsCreating(false);
    setTimeout(() => setMessage(null), 3000);
  };
  const handleDelete = (id: string) => {
    setAllergies((prev) => prev.filter((allergy) => allergy.id !== id));
    setDeletingAllergy(null);
    setMessage({
      type: "success",
      text: "Allergy deleted successfully!",
    });
    setTimeout(() => setMessage(null), 3000);
  };
  const allergiesByWorker = filteredWorkers.map((worker) => ({
    worker,
    allergies: allergies.filter((a) => a.workerId === worker.id),
  }));
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
            Allergy Management
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
              <span>Add Allergy</span>
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
          {allergiesByWorker.length > 0 ? (
            allergiesByWorker.map(({ worker, allergies }) => (
              <div
                key={worker.id}
                className="bg-white rounded-lg border border-gray-200"
              >
                <div
                  className="border-b border-gray-200"
                  style={{ padding: "1rem" }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={worker.avatar}
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
                  {allergies.length > 0 ? (
                    allergies.map((allergy) => (
                      <div
                        key={allergy.id}
                        className="flex items-center justify-between"
                        style={{ padding: "1rem" }}
                      >
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900">
                            {allergy.type}
                          </div>
                          {allergy.notes && (
                            <p className="text-sm text-gray-500">
                              {allergy.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingAllergy(allergy)}
                            className="text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            style={{ padding: "0.5rem" }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingAllergy(allergy.id)}
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
          workers={workers}
          onClose={() => {
            setEditingAllergy(null);
            setIsCreating(false);
          }}
          onSave={handleSave}
        />
      )}
      {deletingAllergy && (
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
                onClick={() => setDeletingAllergy(null)}
                className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingAllergy)}
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
  workers,
  onClose,
  onSave,
}: {
  allergy: Allergy | null;
  workers: Worker[];
  onClose: () => void;
  onSave: (allergy: Allergy) => void;
}) {
  const [formData, setFormData] = useState<Omit<Allergy, "id">>({
    workerId: allergy?.workerId || workers[0].id,
    type: allergy?.type || "",
    notes: allergy?.notes || "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: allergy?.id || "temp-id",
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
        style={{ padding: "1.5rem", marginInline: "1rem" }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "1.5rem" }}
        >
          <h3 className="text-lg font-semibold text-gray-900 pointer-events-none">
            {allergy ? "Edit Allergy" : "Add Allergy"}
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
              value={formData.workerId}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  workerId: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
              required
            >
              {workers.map((worker) => (
                <option key={worker.id} value={worker.id}>
                  {worker.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="text"
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  type: e.target.value,
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
              value={formData.notes}
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
            >
              {allergy ? "Save Changes" : "Add Allergy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
