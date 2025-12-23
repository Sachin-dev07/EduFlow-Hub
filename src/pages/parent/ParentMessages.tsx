import { ParentLayout } from "@/components/layout/ParentLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  MessageCircle,
  Clock,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getTeachers } from "@/api/userApi";
import { getMessages, sendMessage } from "@/api/messageApi";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ParentMessages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
    fetchMessages();
  }, []);

  const fetchTeachers = async () => {
    try {
      const data = await getTeachers();
      const formattedTeachers = data.map((t: any) => ({
        id: t._id,
        name: t.name,
        subject: t.subject || "General Education",
        avatar: t.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2),
        lastMessage: "Click to chat",
        time: "",
        unread: 0
      }));
      setTeachers(formattedTeachers);
    } catch (error) {
      console.error("Error fetching teachers", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data.map((m: any) => ({
        id: m._id,
        sender: m.sender.name || "Unknown",
        senderId: m.sender._id || m.sender,
        receiverId: m.receiver?._id || m.receiver || "unknown",
        content: m.content,
        time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: m.sender._id === user?.id || m.sender === user?.id
      })));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedTeacher) return;

    try {
      const newMessage = await sendMessage({
        content: messageInput,
        receiverId: selectedTeacher.id
      });

      setMessages([...messages, {
        id: newMessage._id,
        sender: "You",
        senderId: user?.id,
        receiverId: selectedTeacher.id,
        content: messageInput,
        time: "Just now",
        isSelf: true
      }]);

      setMessageInput("");
      toast({ title: "Message sent", className: "bg-green-500 text-white border-0" });
    } catch (error) {
      toast({ title: "Error sending message", variant: "destructive" });
    }
  };

  // Filter messages for current selected teacher conversation
  const currentConversation = messages.filter(
    m => (m.senderId === selectedTeacher?.id) || (m.isSelf && m.receiverId === selectedTeacher?.id)
  );

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black overflow-hidden selection:bg-amber-500/30">

      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 blur-[120px] animate-pulse delay-1000" />
      </div>

      <ParentLayout>
        <div className="relative z-10 flex h-[calc(100vh-8rem)] overflow-hidden rounded-3xl border border-white/20 bg-white/40 backdrop-blur-2xl shadow-2xl animate-fade-in dark:bg-black/40 mt-4">

          {/* Teacher List Sidebar */}
          <div className="w-80 flex-shrink-0 border-r border-white/20 hidden md:flex flex-col bg-white/10 dark:bg-zinc-900/10 backdrop-blur-sm">
            <div className="border-b border-white/10 p-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                Messages
              </h2>
            </div>

            <div className="p-4 space-y-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-amber-500 transition-colors" />
                <Input
                  placeholder="Find teacher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-white/30 dark:bg-black/20 border-white/10 focus:bg-white/50 focus:border-amber-500/50 transition-all rounded-xl shadow-inner"
                />
              </div>
            </div>

            <div className="divide-y divide-white/5 overflow-y-auto flex-1 custom-scrollbar">
              {teachers.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm">No teachers found.</div>
              ) : filteredTeachers.map((teacher) => (
                <button
                  key={teacher.id}
                  onClick={() => setSelectedTeacher(teacher)}
                  className={cn(
                    "flex w-full items-start gap-3 p-4 text-left transition-all hover:bg-white/10 dark:hover:bg-white/5 mx-2 my-1 rounded-xl w-[calc(100%-1rem)]",
                    selectedTeacher?.id === teacher.id && "bg-white/20 dark:bg-white/10 shadow-md ring-1 ring-white/10"
                  )}
                >
                  <div className="relative">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-sm font-bold text-white shadow-lg ring-2 ring-white/20">
                      {teacher.avatar}
                    </div>
                    {teacher.unread > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 ring-2 ring-white text-[10px] font-bold text-white">
                        {teacher.unread}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={cn("font-semibold text-sm truncate", selectedTeacher?.id === teacher.id ? "text-amber-600 dark:text-amber-400" : "text-foreground")}>
                        {teacher.name}
                      </p>
                    </div>
                    <p className="text-xs text-amber-600/70 dark:text-amber-400/70 font-medium truncate bg-amber-500/10 px-1.5 py-0.5 rounded w-fit">
                      {teacher.subject}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {selectedTeacher ? (
            <div className="flex flex-1 flex-col bg-slate-50/30 dark:bg-black/20">
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-4 bg-white/20 dark:bg-zinc-900/20 backdrop-blur-md z-20 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-sm font-bold text-white shadow-inner">
                    {selectedTeacher.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-foreground leading-none">
                      {selectedTeacher.name}
                    </p>
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-1">
                      {selectedTeacher.subject} Teacher
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/20 rounded-full">
                    <MoreVertical className="h-4 w-4 opacity-70" />
                  </Button>
                </div>
              </div>

              {/* Messages Feed */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {currentConversation.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground opacity-60">
                    <MessageCircle className="h-12 w-12 mb-2 opacity-50" />
                    <p className="font-medium">No messages yet</p>
                    <p className="text-sm">Start the conversation below</p>
                  </div>
                )}
                {currentConversation.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex animate-slide-up",
                      msg.isSelf ? "justify-end" : "justify-start"
                    )}
                    style={{ animationDelay: `${idx * 20}ms` }}
                  >
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-5 py-3.5 shadow-sm backdrop-blur-sm relative group transition-all hover:shadow-md",
                        msg.isSelf
                          ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-br-sm"
                          : "bg-white dark:bg-zinc-800 text-foreground rounded-bl-sm border border-white/10"
                      )}
                    >
                      <p className="text-sm leading-relaxed tracking-wide">
                        {msg.content}
                      </p>
                      <p
                        className={cn(
                          "mt-1 text-right text-[10px] font-medium opacity-70",
                          msg.isSelf
                            ? "text-amber-50"
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
              <div className="px-4 pb-2 bg-white/20 dark:bg-black/20 backdrop-blur-md pt-2">
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start overflow-x-auto pb-2 scrollbar-hide">
                  {[
                    "Thank you!",
                    "I have a question.",
                    "Can we meet?",
                  ].map((response) => (
                    <button
                      key={response}
                      className="px-3 py-1 text-xs font-medium bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 rounded-full border border-white/10 transition-colors whitespace-nowrap text-foreground/80"
                      onClick={() => setMessageInput(response)}
                    >
                      {response}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white/20 dark:bg-black/20 backdrop-blur-md border-t border-white/10">
                <div className="relative flex items-end gap-2 p-2 rounded-3xl bg-white/60 dark:bg-zinc-900/60 border border-white/20 shadow-inner focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full text-muted-foreground hover:bg-black/5 hover:text-amber-600"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>

                  <Textarea
                    placeholder="Type a message to the teacher..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 min-h-[44px] max-h-32 bg-transparent border-0 focus-visible:ring-0 p-3 pt-3 resize-none placeholder:text-muted-foreground/70"
                    rows={1}
                  />

                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    size="icon"
                    className={cn(
                      "h-10 w-10 rounded-full shadow-lg transition-all duration-300",
                      messageInput.trim()
                        ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:scale-105 active:scale-95"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                    )}
                  >
                    <Send className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground bg-white/5 gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse" />
                <div className="relative h-24 w-24 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 flex items-center justify-center border border-white/10 shadow-xl transform -rotate-6 hover:rotate-0 transition-all duration-500">
                  <MessageCircle className="h-10 w-10 text-amber-500" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Teacher Messages</h3>
                <p className="max-w-xs mx-auto">Select a teacher from the list to start a conversation regarding your child.</p>
              </div>
            </div>
          )}
        </div>
      </ParentLayout>
    </div>
  );
};

export default ParentMessages;
