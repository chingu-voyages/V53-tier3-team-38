import React, { useState } from "react";
import {
  Search,
  Trash2,
  Edit2,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "staff";
  status: "active" | "inactive";
  avatar: string;
}
const mockUsers: User[] = [
  {
    id: "1",
    name: "Emily Rodriguez",
    email: "emily.r@kitchenmanager.com",
    role: "admin",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "2",
    name: "David Chen",
    email: "david.c@kitchenmanager.com",
    role: "manager",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "3",
    name: "Sophie Williams",
    email: "sophie.w@kitchenmanager.com",
    role: "staff",
    status: "inactive",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const handleRoleChange = (userId: string, newRole: User["role"]) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
            ...user,
            role: newRole,
          }
          : user,
      ),
    );
  };
  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    setShowDeleteConfirm(null);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().startsWith(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full" style={{ padding: "1.5rem" }}>
      <div
        className="rounded-xl shadow-sm"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
        }}
      >
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{
            borderBottom: "1px solid #E2E8F0",
            padding: "1.5rem"
          }}
        >
          <h2
            className="text-lg font-semibold pointer-events-none"
            style={{
              color: "#2C3E50",
            }}
          >
            User Management
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div
              className="flex items-center gap-2 rounded-lg"
              style={{
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                paddingInline: "0.75rem",
                paddingBlock: "0.5rem",
              }}
            >
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="bg-transparent border-none focus:outline-none"
                style={{
                  color: "#34495E",
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div style={{ padding: "1.5rem" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid #E2E8F0",
                  }}
                >
                  <th
                    className="text-left font-medium"
                    style={{
                      color: "#34495E",
                      paddingBottom: "1rem",
                    }}
                  >
                    User
                  </th>
                  <th
                    className="text-left font-medium"
                    style={{
                      color: "#34495E",
                      paddingBottom: "1rem",
                    }}
                  >
                    Role
                  </th>
                  <th
                    className="text-left font-medium"
                    style={{
                      color: "#34495E",
                      paddingBottom: "1rem",
                    }}
                  >
                    Status
                  </th>
                  <th
                    className="text-right font-medium"
                    style={{
                      color: "#34495E",
                      paddingBottom: "1rem",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ?
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="group"
                      style={{
                        borderBottom: "1px solid #E2E8F0",
                      }}
                    >
                      <td style={{ paddingBlock: "1rem" }}>
                        <div className="flex items-center gap-3" style={{ paddingLeft: "0.25rem" }}>
                          <img
                            src={user.avatar}
                            alt=""
                            className="w-10 h-10 rounded-full ring-2"
                            style={{
                              borderColor: "#145A32",
                            }}
                          />
                          <div>
                            <div
                              className="font-medium pointer-events-none"
                              style={{
                                color: "#34495E",
                              }}
                            >
                              {user.name}
                            </div>
                            <div
                              className="text-sm pointer-events-none"
                              style={{
                                color: "#A3A3A3",
                              }}
                            >
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ paddingBlock: "1rem" }}>
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(
                              user.id,
                              e.target.value as User["role"],
                            )
                          }
                          className="rounded-lg text-sm cursor-pointer"
                          style={{
                            backgroundColor: "#F8FAFC",
                            color: "#34495E",
                            border: "1px solid #E2E8F0",
                            paddingInline: "0.75rem",
                            paddingBlock: "0.25rem",
                          }}
                        >
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="staff">Staff</option>
                        </select>
                      </td>
                      <td style={{ paddingBlock: "1rem" }}>
                        <div className="flex items-center gap-2">
                          {user.status === "active" ? (
                            <CheckCircle
                              className="w-4 h-4"
                              style={{
                                color: "#145A32",
                              }}
                            />
                          ) : (
                            <AlertCircle
                              className="w-4 h-4"
                              style={{
                                color: "#F39C12",
                              }}
                            />
                          )}
                          <span
                            className="capitalize text-sm pointer-events-none"
                            style={{
                              color: "#34495E",
                            }}
                          >
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td style={{ paddingBlock: "1rem" }}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingUser(user)}
                            className="text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            style={{ padding: "0.5rem" }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(user.id)}
                            className="text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            style={{ padding: "0.5rem" }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-500" style={{ padding: "1rem" }}>
                        No users found
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          style={{
            zIndex: 50,
          }}
        >
          <div
            className="rounded-xl max-w-md w-full"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              padding: "1.5rem",
              marginInline: "1rem"
            }}
          >
            <h3
              className="text-lg font-semibold pointer-events-none"
              style={{
                color: "#2C3E50",
                marginBottom: "0.5rem",
              }}
            >
              Confirm Deletion
            </h3>
            <p
              style={{
                color: "#A3A3A3",
              }}
            >
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3" style={{ marginTop: "1.5rem" }}>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(showDeleteConfirm)}
                className="rounded-lg bg-red-600 text-white hover:bg-red-300 transition-opacity cursor-pointer"
                style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {editingUser && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          style={{
            zIndex: 50,
          }}
        >
          <div
            className="rounded-xl max-w-md w-full"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              padding: "1.5rem",
              marginInline: "1rem"
            }}
          >
            <div className="flex items-center justify-between">
              <h3
                className="text-lg font-semibold"
                style={{
                  color: "#2C3E50",
                  marginBottom: "1.5rem",
                }}
              >
                Edit User
              </h3>
              <button
                onClick={() => setEditingUser(null)}
                className="hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                style={{ padding: "0.5rem" }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <label
                  className="block text-sm pointer-events-none"
                  style={{
                    color: "#2C3E50",
                    marginBottom: "0.5rem",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser((prev) =>
                      prev ? { ...prev, name: e.target.value } : prev,
                    )
                  }
                  className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm pointer-events-none"
                  style={{
                    color: "#2C3E50",
                    marginBottom: "0.5rem",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser((prev) =>
                      prev ? { ...prev, email: e.target.value } : prev,
                    )
                  }
                  className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm pointer-events-none"
                  style={{
                    color: "#2C3E50",
                    marginBottom: "0.5rem",
                  }}
                >
                  Status
                </label>
                <select
                  value={editingUser.status}
                  onChange={(e) =>
                    setEditingUser((prev) =>
                      prev ? { ...prev, status: e.target.value as User["status"] } : prev,
                    )
                  }
                  className="text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  style={{ padding: "0.5rem" }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3" style={{ marginTop: "1.5rem" }}>
              <button
                onClick={() => setEditingUser(null)}
                className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-green-600 text-white hover:opacity-90 transition-opacity cursor-pointer"
                style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
