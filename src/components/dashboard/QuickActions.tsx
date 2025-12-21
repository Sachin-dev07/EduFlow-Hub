import { useState } from "react";
import { Plus, FileText, Users, MessageSquare, Calendar, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CreateCourseModal from "@/components/courses/CreateCourseModal";
import CreateAssignmentModal from "@/components/assignments/CreateAssignmentModal";
import { useToast } from "@/hooks/use-toast";

export function QuickActions() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);

  const handleCourseCreated = () => {
    // Optionally refresh data or navigate
    window.location.reload(); // Simple refresh for now
  };

  const handleAssignmentCreated = () => {
    // Optionally refresh data or navigate
    window.location.reload(); // Simple refresh for now
  };

  const actions = [
    {
      label: "Create Course",
      icon: Plus,
      variant: "gradient" as const,
      onClick: () => setShowCourseModal(true),
    },
    {
      label: "New Assignment",
      icon: FileText,
      variant: "outline" as const,
      onClick: () => setShowAssignmentModal(true),
    },
    {
      label: "Add Student",
      icon: Users,
      variant: "outline" as const,
      onClick: () => navigate("/students"),
    },
    {
      label: "Send Message",
      icon: MessageSquare,
      variant: "outline" as const,
      onClick: () => navigate("/messages"),
    },
    {
      label: "Schedule Event",
      icon: Calendar,
      variant: "outline" as const,
      onClick: () => {
        toast({
          title: "Coming Soon",
          description: "Event scheduling feature will be available soon!",
        });
      },
    },
    {
      label: "Upload Content",
      icon: Upload,
      variant: "outline" as const,
      onClick: () => {
        toast({
          title: "Coming Soon",
          description: "Content upload feature will be available soon!",
        });
      },
    },
  ];

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {actions.map((action, index) => (
            <Button
              key={action.label}
              variant={action.variant}
              className="h-auto flex-col gap-2 py-4"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={action.onClick}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Modals */}
      <CreateCourseModal
        open={showCourseModal}
        onClose={() => setShowCourseModal(false)}
        onCreated={handleCourseCreated}
      />
      <CreateAssignmentModal
        open={showAssignmentModal}
        onClose={() => setShowAssignmentModal(false)}
        onCreated={handleAssignmentCreated}
      />
    </>
  );
}
