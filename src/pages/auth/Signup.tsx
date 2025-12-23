import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { signup } from "@/api/authApi";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Mail, Lock, User, Shield, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

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

  const handleSignup = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const data = await signup({ name, email, password, role });

      toast({
        title: "Welcome!",
        description: "Account created successfully.",
        className: "bg-green-500/90 text-white border-none",
      });

      login(data.user, data.token);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden font-sans">

      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden text-clip">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-emerald-400/30 blur-[120px] animate-pulse mix-blend-multiply" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-400/30 blur-[100px] animate-pulse delay-1000 mix-blend-multiply" />
        <div className="absolute top-[30%] left-[30%] w-[400px] h-[400px] rounded-full bg-cyan-400/30 blur-[120px] animate-pulse delay-2000 mix-blend-multiply" />
      </div>

      <Card className="w-full max-w-md border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10 animate-fade-in-up ring-1 ring-white/60">
        <CardHeader className="space-y-3 text-center pb-6 pt-8">
          <div className="flex justify-center mb-2">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20 ring-4 ring-white/50">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-800">Create Account</CardTitle>
            <CardDescription className="text-slate-500 text-base">
              Join EduFlow Hub to get started
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-4">
          <form onSubmit={handleSignup} className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700 font-medium ml-1">Full Name</Label>
              <div className="relative group">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 z-10" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-10 h-11 bg-white/70 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500/20 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium ml-1">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 z-10" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@school.edu"
                  className="pl-10 h-11 bg-white/70 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500/20 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium ml-1">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 z-10" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="pl-10 h-11 bg-white/70 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500/20 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-slate-700 font-medium ml-1">I am a...</Label>
              <div className="relative group">
                <Shield className="absolute left-3 top-3.5 h-4 w-4 text-slate-400 z-10" />
                <Select value={role} onValueChange={(val: any) => setRole(val)} disabled={loading}>
                  <SelectTrigger className="pl-10 h-11 bg-white/70 border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-teal-500/20">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 font-medium flex items-center animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:scale-[1.02] mt-2 font-semibold tracking-wide"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-600 hover:text-teal-700 font-medium hover:underline transition-colors">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>

      <div className="absolute bottom-6 text-center w-full text-xs font-medium text-slate-500 tracking-wide opacity-80">
        © 2024 EduFlow Hub. All rights reserved.
      </div>
    </div>
  );
};

export default Signup;
