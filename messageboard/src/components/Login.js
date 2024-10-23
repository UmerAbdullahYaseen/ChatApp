import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Ajv from "ajv";
import addFormats from "ajv-formats";

const Login = ({ setLoggedInUser, handleLogin, loginSchema }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  const validate = ajv.compile(loginSchema);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    const credentials = { email, password };

    const isValid = validate(credentials);

    if (!isValid) {
      setError(ajv.errorsText(validate.errors));
      return;
    }

    try {
      const response = await handleLogin(credentials);
      setLoggedInUser(response.user);
      localStorage.setItem("token", response.token);
      navigate("/main");
      console.log("login successfully");
    } catch (error) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")}>Sign up</button>
      </p>
    </div>
  );
};

export default Login;
