import React, { useEffect, useState } from "react";
import {
  Users,
  Lock,
  AlertCircle,
  Check,
  Edit2,
  Upload,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "@/components/reusableComponents/customInput";
import { CustomButton } from "@/components/reusableComponents/customButton";
import userService from "@/services/userManagement";
import { UserData } from "@/types/database.types";

type EditingSection = "profile" | "password" | null;

export const Settings: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [editingSection, setEditingSection] = useState<EditingSection>(null);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      const data = await userService.getCurrentUserAllergenInfo();
      setUserInfo(data);
    }

    fetchUserData();
  }, []);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({
      type: "success",
      text: "Personal information updated successfully!",
    });
    setEditingSection(null);
    setTimeout(() => setMessage(null), 3000);
  };
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setMessage({
        type: "error",
        text: "New passwords don't match!",
      });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    setMessage({
      type: "success",
      text: "Password updated successfully!",
    });
    setPasswords({
      current: "",
      new: "",
      confirm: "",
    });
    setEditingSection(null);
    setTimeout(() => setMessage(null), 3000);
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            avatar_url: reader.result as string,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "#ECF0F1",
        padding: "1rem",
      }}
    >
      <div className="w-full mx-auto">
        <div
          className="bg-white p-4 rounded-lg border border-gray-200"
          style={{ marginBottom: "1rem", padding: "1rem" }}
        >
          <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
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
        <div className="bg-white rounded-lg border border-gray-200">
          <div style={{ padding: "1rem", borderBottom: "1px solid #E5E7EB" }}>
            <div className="flex flex-col items-center" style={{ gap: "1rem" }}>
              <div className="relative">
                <img
                  src={userInfo?.avatar_url}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
                <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  <Upload className="w-4 h-4 text-gray-600" />
                </label>
              </div>
              <div className="text-sm text-gray-500">
                Click the icon to upload a new profile picture
              </div>
            </div>
          </div>
          <div style={{ padding: "1rem", borderBottom: "1px solid #E5E7EB" }}>
            <div
              className="flex justify-between items-start"
              style={{ marginBottom: "1rem" }}
            >
              <h2 className="font-medium text-gray-900">
                Personal Information
              </h2>
              {editingSection !== "profile" && (
                <CustomButton
                  type="button"
                  variantColor="white"
                  onClick={() => setEditingSection("profile")}
                  className="text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  style={{
                    cursor: "pointer",
                    padding: "0.5rem",
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </CustomButton>
              )}
            </div>
            {editingSection === "profile" ? (
              <form
                onSubmit={handleProfileSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <CustomInput
                  type="text"
                  label="Full Name"
                  className="rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={userInfo?.name}
                  onChange={(e) =>
                    setUserInfo((prev) => {
                      if (!prev) return null;
                      return {
                        ...prev,
                        name: e.target.value,
                      };
                    })
                  }
                  style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
                  required
                />
                <CustomInput
                  type="email"
                  label="Email Address"
                  className="rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={userInfo?.email}
                  onChange={(e) =>
                    setUserInfo((prev) => {
                      if (!prev) return null;
                      return {
                        ...prev,
                        email: e.target.value,
                      };
                    })
                  }
                  style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
                  required
                />
                <CustomInput
                  type="text"
                  label="Allergies (comma-separated)"
                  className="rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={userInfo?.allergen_info.map((a) => a.name).join(", ")}
                  onChange={(e) =>
                    setUserInfo((prev) => {
                      if (!prev) return null;

                      return {
                        ...prev,
                        allergen_info: e.target.value
                          .split(",")
                          .map((i) => i.trim())
                          .filter(Boolean)
                          .map((name) => ({
                            name,
                            notes: null,
                          })),
                      };
                    })
                  }
                  style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
                  placeholder="e.g. Peanuts, Shellfish, Dairy"
                />
                <div className="flex justify-end gap-3">
                  <CustomButton
                    type="button"
                    variantColor="white"
                    onClick={() => setEditingSection(null)}
                    className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    style={{
                      cursor: "pointer",
                      paddingInline: "1rem",
                      paddingBlock: "0.5rem",
                    }}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    type="submit"
                    variantColor="green"
                    className="flex items-center gap-2 rounded-lg bg-green-600 text-white hover:opacity-90 transition-opacity"
                    style={{
                      cursor: "pointer",
                      paddingInline: "1rem",
                      paddingBlock: "0.5rem",
                    }}
                  >
                    <Save />
                    Save Changes
                  </CustomButton>
                </div>
              </form>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <span className="text-sm text-gray-500">Full Name</span>
                <span className="text-gray-900">{userInfo?.name}</span>
                <span className="text-sm text-gray-500">Email Address</span>
                <span className="text-gray-900">{userInfo?.email}</span>
                <span className="text-sm text-gray-500">Allergies</span>
                <span className="text-gray-900">
                  {userInfo?.allergen_info && userInfo?.allergen_info.length > 0
                    ? userInfo?.allergen_info.map((a) => a.name).join(", ")
                    : "No allergies specified"}
                </span>
              </div>
            )}
          </div>
          <div style={{ padding: "1rem", borderBottom: "1px solid #E5E7EB" }}>
            <div
              className="flex justify-between items-start"
              style={{ marginBottom: "1rem" }}
            >
              <h2 className="font-medium text-gray-900">Password</h2>
              {editingSection !== "password" && (
                <CustomButton
                  type="button"
                  variantColor="white"
                  onClick={() => setEditingSection("password")}
                  className="text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  style={{
                    cursor: "pointer",
                    padding: "0.5rem",
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </CustomButton>
              )}
            </div>
            {editingSection === "password" ? (
              <form
                onSubmit={handlePasswordSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <CustomInput
                  type="password"
                  label="Current Password"
                  className="rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      current: e.target.value,
                    }))
                  }
                  style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
                  required
                />
                <CustomInput
                  type="password"
                  label="New Password"
                  className="rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, new: e.target.value }))
                  }
                  style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
                  required
                />
                <CustomInput
                  type="password"
                  label="Confirm New Password"
                  className="rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      confirm: e.target.value,
                    }))
                  }
                  style={{ paddingInline: "0.75rem", paddingBlock: "0.5rem" }}
                  required
                />
                <div className="flex justify-end gap-3">
                  <CustomButton
                    type="button"
                    variantColor="white"
                    onClick={() => setEditingSection(null)}
                    className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    style={{
                      cursor: "pointer",
                      paddingInline: "1rem",
                      paddingBlock: "0.5rem",
                    }}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    type="submit"
                    variantColor="green"
                    className="flex items-center gap-2 rounded-lg bg-green-600 text-white hover:opacity-90 transition-opacity"
                    style={{
                      cursor: "pointer",
                      paddingInline: "1rem",
                      paddingBlock: "0.5rem",
                    }}
                  >
                    <Lock />
                    Update Password
                  </CustomButton>
                </div>
              </form>
            ) : (
              <div className="text-sm text-gray-500">●●●●●●●●</div>
            )}
          </div>
          {userInfo?.isAdmin && (
            <div style={{ padding: "1rem" }}>
              <h2
                className="font-medium text-gray-900"
                style={{ marginBottom: "1rem" }}
              >
                Admin Settings
              </h2>
              <CustomButton
                type="button"
                variantColor="white"
                onClick={() => navigate("/dashboard/user-management")}
                className="flex items-center gap-2 rounded-lg bg-gray-900 text-white hover:opacity-90 hover:text-black transition-opacity"
                style={{
                  cursor: "pointer",
                  paddingInline: "1rem",
                  paddingBlock: "0.5rem",
                }}
              >
                <Users className="w-5 h-5" />
                Manage Users
              </CustomButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
