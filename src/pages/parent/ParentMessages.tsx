import { ParentLayout } from "@/components/layout/ParentLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const teachers = [
  {
    id: 1,
    name: "Ms. Sarah Johnson",
    subject: "Mathematics",
    avatar: "SJ",
    lastMessage: "Emma is doing great in class!",
    time: "2 hours ago",
    unread: 0,
  },
  {
    id: 2,
    name: "Mr. David Smith",
    subject: "Biology",
    avatar: "DS",
    lastMessage: "Lab report received, will grade soon",
    time: "1 day ago",
    unread: 1,
  },
  {
    id: 3,
    name: "Mrs. Emily Davis",
    subject: "English Literature",
    avatar: "ED",
    lastMessage: "Great essay submission!",
    time: "2 days ago",
    unread: 0,
  },
  {
    id: 4,
    name: "Mr. Robert Brown",
    subject: "World History",
    avatar: "RB",
    lastMessage: "Please review the midterm study guide",
    time: "3 days ago",
    unread: 1,
  },
];

const messages = [
  {
    id: 1,
    sender: "Ms. Sarah Johnson",
    content: "Hello Mr. Davis! I wanted to reach out about Emma's progress in Algebra.",
    time: "10:00 AM",
    isSelf: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Hi Ms. Johnson, thank you for reaching out. How is Emma doing?",
    time: "10:15 AM",
    isSelf: true,
  },
  {
    id: 3,
    sender: "Ms. Sarah Johnson",
    content: "Emma is doing great! She scored 95% on the last quiz and is very engaged in class discussions. She's been asking excellent questions about the material.",
    time: "10:20 AM",
    isSelf: false,
  },
  {
    id: 4,
    sender: "You",
    content: "That's wonderful to hear! We've been practicing extra problems at home. Is there anything specific we should focus on?",
    time: "10:25 AM",
    isSelf: true,
  },
  {
    id: 5,
    sender: "Ms. Sarah Johnson",
    content: "Emma is doing great in class! The extra practice at home is definitely showing. I'd suggest focusing on word problems for the upcoming chapter.",
    time: "10:30 AM",
    isSelf: false,
  },
];

const ParentMessages = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ParentLayout>
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-border bg-card shadow-card animate-fade-in">
        {/* Teacher List */}
        <div className="w-80 flex-shrink-0 border-r border-border">
          <div className="border-b border-border p-4">
            <h2 className="mb-3 text-lg font-semibold text-card-foreground">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="divide-y divide-border overflow-y-auto">
            {filteredTeachers.map((teacher) => (
              <button
                key={teacher.id}
                onClick={() => setSelectedTeacher(teacher)}
                className={cn(
                  "flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-muted/50",
                  selectedTeacher.id === teacher.id && "bg-accent/5"
                )}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-accent text-sm font-medium text-accent-foreground">
                  {teacher.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-card-foreground truncate">
                      {teacher.name}
                    </p>
                    {teacher.unread > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
                        {teacher.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-accent font-medium">{teacher.subject}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground truncate">
                    {teacher.lastMessage}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{teacher.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-accent text-sm font-medium text-accent-foreground">
                {selectedTeacher.avatar}
              </div>
              <div>
                <p className="font-medium text-card-foreground">
                  {selectedTeacher.name}
                </p>
                <p className="text-sm text-accent">{selectedTeacher.subject}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="text-center">
              <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                Today
              </span>
            </div>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.isSelf ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-3",
                    msg.isSelf
                      ? "bg-accent text-accent-foreground rounded-br-md"
                      : "bg-muted text-card-foreground rounded-bl-md"
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p
                    className={cn(
                      "mt-1 text-right text-xs",
                      msg.isSelf
                        ? "text-accent-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Responses */}
          <div className="border-t border-border p-3">
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                "Thank you!",
                "When can we schedule a meeting?",
                "How can I help at home?",
              ].map((response) => (
                <Button
                  key={response}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setMessageInput(response)}
                >
                  {response}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-border p-4">
            <div className="flex items-end gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 flex-shrink-0"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Textarea
                placeholder="Type a message to the teacher..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="min-h-[44px] max-h-32 resize-none"
                rows={1}
              />
              <Button variant="accent" size="icon" className="h-10 w-10 flex-shrink-0">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default ParentMessages;
