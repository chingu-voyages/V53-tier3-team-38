import React from "react";

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleLoginClick = () => {
    // Perform login logic here
    onLogin();
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
};
