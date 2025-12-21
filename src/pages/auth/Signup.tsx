import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { signup } from "@/api/authApi";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"teacher" | "parent" | "student">("parent");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const data = await signup({ name, email, password, role });

      toast({
        title: "Account created!",
        description: "Welcome to EduFlow Hub",
      });

      // ✅ Save user + token using AuthContext
      login(data.user, data.token);

      // ✅ Redirect by role
      if (data.user.role === "teacher") navigate("/");
      else if (data.user.role === "parent") navigate("/parent");
      else navigate("/student");

    } catch (err: any) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Signup failed";
      setError(errorMsg);
      toast({
        title: "Signup failed",
        description: errorMsg,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 border rounded-xl bg-card">
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <div className="space-y-4">
          <input
            className="w-full p-3 border rounded-lg"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-3 border rounded-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 border rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full p-3 border rounded-lg"
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
          >
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="student">Student</option>
          </select>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
