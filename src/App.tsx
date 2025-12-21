import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Assignments from "./pages/Assignments";
import Students from "./pages/Students";
import Grades from "./pages/Grades";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

import ParentPortal from "./pages/parent/ParentPortal";
import ParentGrades from "./pages/parent/ParentGrades";
import ParentAssignments from "./pages/parent/ParentAssignments";
import ParentMessages from "./pages/parent/ParentMessages";

import Login from "./pages/Login";
import Signup from "./pages/auth/Signup";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Auth Guard
import RequireAuth from "@/components/auth/RequireAuth";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ================= TEACHER ROUTES ================= */}
        <Route element={<RequireAuth roles={["teacher"]} />}>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/students" element={<Students />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* ================= PARENT ROUTES ================= */}
        <Route element={<RequireAuth roles={["parent"]} />}>
          <Route path="/parent" element={<ParentPortal />} />
          <Route path="/parent/grades" element={<ParentGrades />} />
          <Route path="/parent/assignments" element={<ParentAssignments />} />
          <Route path="/parent/messages" element={<ParentMessages />} />
        </Route>

        {/* ================= STUDENT ROUTES ================= */}
        <Route element={<RequireAuth roles={["student"]} />}>
          <Route path="/student" element={<Index />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
    <Toaster />
  </AuthProvider>
);

export default App;
