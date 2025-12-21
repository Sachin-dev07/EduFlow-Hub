import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const conversations = [
  {
    id: 1,
    name: "John Davis (Parent)",
    lastMessage: "Thank you for the update on Emma's progress",
    time: "2 min ago",
    unread: 2,
    avatar: "JD",
    type: "parent",
  },
  {
    id: 2,
    name: "Lisa Chen (Parent)",
    lastMessage: "Can we schedule a meeting next week?",
    time: "1 hour ago",
    unread: 0,
    avatar: "LC",
    type: "parent",
  },
  {
    id: 3,
    name: "Emma Wilson",
    lastMessage: "I submitted my assignment but it shows late",
    time: "3 hours ago",
    unread: 1,
    avatar: "EW",
    type: "student",
  },
  {
    id: 4,
    name: "Michael Brown",
    lastMessage: "Thank you for the extra help session",
    time: "Yesterday",
    unread: 0,
    avatar: "MB",
    type: "student",
  },
  {
    id: 5,
    name: "Staff Announcements",
    lastMessage: "Reminder: Parent-teacher conference next Friday",
    time: "2 days ago",
    unread: 0,
    avatar: "📢",
    type: "group",
  },
];

const messages = [
  {
    id: 1,
    sender: "John Davis",
    content: "Hello Ms. Johnson, I wanted to check in on Emma's progress in your Algebra class.",
    time: "10:30 AM",
    isSelf: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Hi Mr. Davis! Emma is doing very well. She scored 95% on the last quiz and is very active in class discussions.",
    time: "10:35 AM",
    isSelf: true,
  },
  {
    id: 3,
    sender: "John Davis",
    content: "That's wonderful to hear! We've been working on extra practice problems at home.",
    time: "10:38 AM",
    isSelf: false,
  },
  {
    id: 4,
    sender: "You",
    content: "That's great! The extra practice is definitely showing. I've attached her recent grade report for your reference.",
    time: "10:40 AM",
    isSelf: true,
    attachment: "Emma_Wilson_Grade_Report.pdf",
  },
  {
    id: 5,
    sender: "John Davis",
    content: "Thank you for the update on Emma's progress. We really appreciate your dedication!",
    time: "10:42 AM",
    isSelf: false,
  },
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-border bg-card shadow-card animate-fade-in">
        {/* Conversation List */}
        <div className="w-80 flex-shrink-0 border-r border-border">
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="text-lg font-semibold text-card-foreground">Messages</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </div>
          <div className="divide-y divide-border overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  "flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-muted/50",
                  selectedConversation.id === conv.id && "bg-primary/5"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium",
                    conv.type === "parent"
                      ? "bg-accent/10 text-accent"
                      : conv.type === "student"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-card-foreground truncate">
                      {conv.name}
                    </p>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {conv.time}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground truncate">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-medium text-accent">
                {selectedConversation.avatar}
              </div>
              <div>
                <p className="font-medium text-card-foreground">
                  {selectedConversation.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.type === "parent" ? "Parent" : "Student"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-card-foreground rounded-bl-md"
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                  {msg.attachment && (
                    <div
                      className={cn(
                        "mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs",
                        msg.isSelf
                          ? "bg-primary-foreground/10"
                          : "bg-background"
                      )}
                    >
                      <Paperclip className="h-3.5 w-3.5" />
                      {msg.attachment}
                    </div>
                  )}
                  <p
                    className={cn(
                      "mt-1 text-right text-xs",
                      msg.isSelf
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
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
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="min-h-[44px] max-h-32 resize-none"
                rows={1}
              />
              <Button variant="gradient" size="icon" className="h-10 w-10 flex-shrink-0">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
