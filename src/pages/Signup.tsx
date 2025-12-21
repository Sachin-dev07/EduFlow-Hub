import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "@/api/authApi";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"teacher" | "parent" | "student">("parent");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const data = await signup({ name, email, password, role });

      login(data.user, data.token);

      if (data.user.role === "teacher") navigate("/");
      else if (data.user.role === "parent") navigate("/parent");
      else navigate("/student");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h2 className="mb-6 text-3xl font-bold">Create Account</h2>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <input
          className="mb-3 w-full rounded border p-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />

        <input
          type="email"
          className="mb-3 w-full rounded border p-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />

        <input
          type="password"
          className="mb-3 w-full rounded border p-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <select
          className="mb-5 w-full rounded border p-3"
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
        >
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
          <option value="student">Student</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full rounded bg-primary py-3 text-white hover:bg-primary/90 transition-colors"
        >
          Create Account
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-semibold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
