import { cn } from "@/lib/utils";
import { Users, Clock, BookOpen, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CourseCardProps {
  title: string;
  subject: string;
  students: number;
  progress: number;
  lessons: number;
  duration: string;
  color: string;
  image?: string;
}

export function CourseCard({
  title,
  subject,
  students,
  progress,
  lessons,
  duration,
  color,
  image,
}: CourseCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Header with gradient */}
      <div
        className={cn(
          "relative h-32 overflow-hidden",
          color
        )}
      >
        {image && (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Badge */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            {subject}
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 text-white/80 hover:bg-white/20 hover:text-white"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-2 text-lg font-semibold text-card-foreground line-clamp-1">
          {title}
        </h3>

        {/* Stats */}
        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{students} students</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>{lessons} lessons</span>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-card-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Duration */}
        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}
