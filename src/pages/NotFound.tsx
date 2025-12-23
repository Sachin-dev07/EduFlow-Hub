import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Ghost } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-black overflow-hidden selection:bg-indigo-500/30 font-sans">

      {/* Animated Background Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] animate-pulse delay-1000" />
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[100px] animate-pulse delay-2000" />

      <div className="relative z-10 w-full max-w-lg p-6 text-center animate-fade-in-up">

        {/* Floating 404 Visual */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" />
          <div className="relative glass-card rounded-full p-8 border border-white/20 bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-2xl animate-float">
            <Ghost className="h-24 w-24 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="absolute -bottom-4 right-0 bg-white dark:bg-zinc-800 text-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/10 rotate-12">
            Page Not Found
          </div>
        </div>

        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 mb-2 tracking-tighter drop-shadow-sm">
          404
        </h1>

        <h2 className="text-2xl font-bold text-foreground mb-4">
          Lost in Space?
        </h2>

        <p className="text-muted-foreground text-lg mb-8 max-w-sm mx-auto leading-relaxed">
          The page you are looking for doesn't exist or has been moved to another dimension.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            className="h-12 px-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="h-12 px-8 rounded-full border-white/20 bg-white/40 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60 backdrop-blur-sm transition-all hover:scale-105"
          >
            <Link to={-1 as any} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-muted-foreground">
            Error Code: 404 • Path: {location.pathname}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
