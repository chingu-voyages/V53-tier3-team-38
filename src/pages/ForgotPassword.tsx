import React, { useState } from "react";
import { ChefHat, Check } from "lucide-react";
import { CustomInput } from "@/components/reusableComponents/customInput";
import { CustomButton } from "@/components/reusableComponents/customButton";
import supabase from "@/supabase-client";
import { useAuth } from "@/context/AuthContext";

const features = [
  {
    title: "Menu Planning Made Easy",
    description:
      "Create and manage your menus efficiently with our intuitive scheduling tools.",
  },
  {
    title: "Dietary Management",
    description:
      "Track and manage dietary restrictions and allergies with ease.",
  },
  {
    title: "Team Collaboration",
    description: "Work seamlessly with your kitchen staff and management team.",
  },
  {
    title: "Inventory Control",
    description:
      "Keep track of ingredients and supplies with automated inventory management.",
  },
];

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [stateSuccess, setStateSuccess] = useState("");
  const [stateError, setStateError] = useState("");
  const [stateLoading, setStateLoading] = useState(false);
  const { validateEmail } = useAuth();

  async function handleResetPassword() {
    if (!validateEmail(email)) {
      setStateError("Please enter a valid email");
      return;
    }

    try {
      setStateLoading(true);
      let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${import.meta.env.VITE_APP_URL}/reset-password`,
      });

      if (error) {
        setStateError(error.message);
      } else if (data) {
        setStateSuccess("Reset email has been sent to your inbox.");
      }
    } catch (error) {
      // Run any email validation here
      console.error(error);
      setStateError("Error from Supabase");
    } finally {
      setStateLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center py-12"
      style={{
        backgroundColor: "#ECF0F1",
      }}
    >
      <div className="w-full max-w-3xl p-8 mx-4">
        <div
          className="rounded-xl shadow-sm flex flex-col justify-center"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            height: "90vh",
          }}
        >
          <div className="grid md:grid-cols-2 gap-8 h-full p-1">
            {/* Left side - Features */}
            <div
              className=" hidden sm:hidden md:flex p-8 gap-6 rounded-r-xl flex-col justify-center h-full"
              style={{
                backgroundColor: "#F8FAFC",
                padding: "0 20px 0 20px",
              }}
            >
              <h3
                className="text-lg font-semibold mb-6"
                style={{
                  color: "#2C3E50",
                  pointerEvents: "none",
                }}
              >
                Why choose Kitchen Manager?
              </h3>
              <div
                className="flex flex-col gap-4"
                style={{ pointerEvents: "none" }}
              >
                {features.map((feature) => (
                  <div key={feature.title} className="flex gap-3">
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "#27AE60",
                        color: "#FFFFFF",
                      }}
                    >
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4
                        className="font-medium mb-1"
                        style={{
                          color: "#2C3E50",
                        }}
                      >
                        {feature.title}
                      </h4>
                      <p
                        className="text-sm"
                        style={{
                          color: "#34495E",
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <CustomButton
                icon="github"
                size="medium"
                style={{ cursor: "pointer" }}
                onClick={() =>
                (window.location.href =
                  "https://github.com/chingu-voyages/V53-tier3-team-38")
                }
              >
                GitHub
              </CustomButton>
            </div>
            {/* Right side - Reset Password Form */}
            <div
              className="p-8 flex flex-col justify-center h-full gap-6"
              style={{ padding: "0 40px 0 20px" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <ChefHat
                  className="w-8 h-8"
                  style={{
                    color: "#27AE60",
                  }}
                />
                <h1
                  className="text-2xl font-semibold"
                  style={{
                    color: "#2C3E50",
                    pointerEvents: "none",
                  }}
                >
                  Kitchen Manager
                </h1>
              </div>
              <h2
                className="text-xl font-semibold mb-6"
                style={{
                  color: "#2C3E50",
                  pointerEvents: "none",
                }}
              >
                Reset Your Password
              </h2>
              <form className="space-y-4">
                <CustomInput
                  label="Email address"
                  type="email"
                  placeholder="Enter your email"
                  style={{ marginBottom: "10px", paddingLeft: "10px" }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {stateSuccess && <p>{stateSuccess}</p>}
                {stateError && <p>{stateError}</p>}
                <CustomButton
                  variantColor="green"
                  size="big"
                  style={{ marginTop: "10px", cursor: "pointer" }}
                  onClick={handleResetPassword}
                  disabled={stateLoading}
                >
                  Submit
                </CustomButton>
              </form>
              <div className="relative mt-8 mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className="w-full"
                    style={{
                      borderTop: "1px solid #E2E8F0",
                    }}
                  />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span
                    className="px-2"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#2C3E50",
                      pointerEvents: "none",
                    }}
                  >
                    Try Your Login Again?
                  </span>
                </div>
              </div>
              <CustomButton
                variantColor="white"
                size="medium"
                style={{ cursor: "pointer" }}
                onClick={() => (window.location.href = "/login")}
              >
                Take me to Login
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
