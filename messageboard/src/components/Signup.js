import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const Signup = ({ handleRegister, registerSchema }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  const validate = ajv.compile(registerSchema);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const userData = { email, username, password };
    const isValid = validate(userData);

    if (!isValid) {
      setError(ajv.errorsText(validate.errors));
      return;
    }
    try {
      await handleRegister(userData);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>Login</button>
      </p>
    </div>
  );
};

export default Signup;
