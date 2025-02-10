import React, { useState } from "react";
import supabase from "@/supabase-client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CustomInput } from "@/components/reusableComponents/customInput";
import { CustomButton } from "@/components/reusableComponents/customButton";

export const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  async function handleUpdatePassword() {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully!");
      // Redirect to login page after successful update
      navigate("/login");
    }
    setLoading(false);
  }

  return (
    <form className="space-y-4">
      <CustomInput
        label="New Password"
        type="password"
        placeholder="Enter your new password"
        style={{ marginBottom: "10px", paddingLeft: "10px" }}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
        required
      />
      <CustomInput
        label="Confirm Password"
        type="password"
        placeholder="Confirm new password"
        style={{ marginBottom: "10px", paddingLeft: "10px" }}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        required
      />
      <CustomButton
        variantColor="green"
        size="big"
        style={{ marginTop: "10px", cursor: "pointer" }}
        onClick={handleUpdatePassword}
        disabled={loading}
      >
        Update Password
      </CustomButton>
      {message && <p>{message}</p>}
      <p>{searchParams.get("access_token")}</p>
    </form>
  );
};
