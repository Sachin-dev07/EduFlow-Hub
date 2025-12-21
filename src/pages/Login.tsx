import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { login as loginApi } from "@/api/authApi";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const data = await loginApi({ email, password });

      toast({
        title: "Welcome back!",
        description: "Login successful",
      });

      // ✅ save user + token
      login(data.user, data.token);

      // ✅ redirect by role
      if (data.user.role === "teacher") navigate("/");
      else if (data.user.role === "parent") navigate("/parent");
      else navigate("/student");

    } catch (err: any) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Login failed";
      setError(errorMsg);
      toast({
        title: "Login failed",
        description: errorMsg,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    /* SAME UI STRUCTURE — NOT CHANGED */
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground mb-8">
            Login to continue to EduFlow
          </p>

          {error && (
            <p className="mb-4 text-red-500 font-medium">{error}</p>
          )}

          <div className="space-y-5">
            <input
              className="w-full p-4 border rounded-xl bg-background"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />

            <input
              className="w-full p-4 border rounded-xl bg-background"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-xl hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-primary hover:underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
