import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { session, signInUser, signInUserGoogle } = useAuth();
  console.log(session);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInUser(email, password);

      if (result?.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(`Error on handleSignIn ${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleLoginWithGoogle() {
    setLoading(true);

    try {
      const result = await signInUserGoogle();

      if (result?.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(`Error on handleSignIn ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Sign in</h2>
        <p>
          Do not have an account?{" "}
          <Link to="/register">Sign up with email!</Link>
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
            Sign in
          </button>
          {error && <p>{error}</p>}
        </div>
      </form>
      <p>
        Instead you can use{" "}
        <button onClick={handleLoginWithGoogle}>Google Sign-in</button>
      </p>
    </div>
  );
};
