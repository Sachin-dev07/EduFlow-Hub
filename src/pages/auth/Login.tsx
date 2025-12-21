import { useState } from "react";
import { login } from "@/api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      // After login success
if (res.user.role === "teacher") {
  navigate("/");
} else if (res.user.role === "parent") {
  navigate("/parent");
} else if (res.user.role === "student") {
  navigate("/student");
}

    } catch (err) {
      console.log("Login error:", err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
