import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { session, signUpNewUser } = useAuth();
  console.log(session);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signUpNewUser(email, password);

      if (result?.success) {
        navigate("/dashboard/");
      }
    } catch (error) {
      setError(`Error on handleSignUp ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <h2>Sign up today!</h2>
        <p>
          Already have an account? <Link to="/login">Sign in!</Link>
        </p>
        <div>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
          <button type="submit" disabled={loading}>
            Sign up
          </button>
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
};
