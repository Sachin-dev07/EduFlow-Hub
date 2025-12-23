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
  MessageSquare,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { sendMessage, getMessages } from "@/api/messageApi";
import { getTeachers } from "@/api/userApi";
import { useToast } from "@/hooks/use-toast";

const Messages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    const initData = async () => {
      try {
        const [teachers, msgs] = await Promise.all([getTeachers(), getMessages()]);

        // Format Teachers as Conversations
        const formattedConvos = teachers.map((t: any) => ({
          id: t._id,
          name: t.name,
          lastMessage: "Start a conversation",
          time: "",
          unread: 0,
          avatar: t.name.substring(0, 2).toUpperCase(),
          type: "teacher",
          subject: t.subject || "General Education"
        }));
        setConversations(formattedConvos);

        // Load Messages
        // Load Messages
        setChatMessages(msgs.map((msg: any) => ({
          id: msg._id,
          sender: msg.sender?.name || "User",
          senderId: msg.sender?._id || msg.sender,
          receiverId: msg.receiver?._id || msg.receiver || "unknown",
          content: msg.content,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSelf: msg.sender?._id === user?.id || msg.sender === user?.id,
          attachment: undefined
        })));

      } catch (error) {
        console.error("Error loading message data", error);
        toast({
          title: "Error",
          description: "Failed to load messages.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    if (user) initData();
  }, [user, toast]);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const tempId = Date.now().toString();
    const newMessage = {
      id: tempId,
      sender: "You",
      senderId: user?.id,
      receiverId: selectedConversation.id,
      content: messageInput,
      time: "Just now",
      isSelf: true,
    };

    // Optimistic update
    setChatMessages((prev) => [...prev, newMessage]);
    const msgToSend = messageInput;
    setMessageInput("");

    try {
      await sendMessage({
        content: msgToSend,
        receiverId: selectedConversation.id
      });
      // Success
    } catch (error) {
      console.error("Failed to send message", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Filter messages for current selected conversation
  const filteredChat = chatMessages.filter(msg => {
    if (!selectedConversation) return false;
    return (msg.senderId === selectedConversation.id) || (msg.isSelf && msg.receiverId === selectedConversation.id);
  });


  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black overflow-hidden selection:bg-blue-500/30">

      {/* Animated Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse delay-1000" />
      </div>

      <MainLayout>
        <div className="relative z-10 flex h-[calc(100vh-8rem)] overflow-hidden rounded-3xl border border-white/20 bg-white/40 backdrop-blur-2xl shadow-2xl animate-fade-in dark:bg-black/40 mt-4">

          {/* Conversation List Sidebar */}
          <div className="w-80 flex-shrink-0 border-r border-white/20 hidden md:flex flex-col bg-white/10 dark:bg-zinc-900/10 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Messages
              </h2>
            </div>

            <div className="p-4 space-y-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                <Input
                  placeholder="Search chats..."
                  className="pl-10 bg-white/30 dark:bg-black/20 border-white/10 focus:bg-white/50 focus:border-blue-500/50 transition-all rounded-xl h-10 shadow-inner"
                />
              </div>
            </div>

            <div className="divide-y divide-white/5 overflow-y-auto flex-1 custom-scrollbar">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-500" />
                  <p className="text-sm">Syncing conversations...</p>
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No conversations found.</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={cn(
                      "flex w-full items-start gap-4 p-4 text-left transition-all hover:bg-white/10 dark:hover:bg-white/5 mx-2 my-1 rounded-xl w-[calc(100%-1rem)]",
                      selectedConversation?.id === conv.id && "bg-white/20 dark:bg-white/10 shadow-md ring-1 ring-white/10"
                    )}
                  >
                    <div className="relative">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-lg ring-2 ring-white/20">
                        {conv.avatar}
                      </div>
                      {conv.unread > 0 && (
                        <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 ring-2 ring-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={cn("font-semibold text-sm truncate", selectedConversation?.id === conv.id ? "text-blue-600 dark:text-blue-400" : "text-foreground")}>
                          {conv.name}
                        </p>
                        <span className="text-[10px] text-muted-foreground flex-shrink-0">
                          {conv.time || "Now"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate opacity-80">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          {selectedConversation ? (
            <div className="flex flex-1 flex-col bg-slate-50/30 dark:bg-black/20">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-4 bg-white/20 dark:bg-zinc-900/20 backdrop-blur-md z-20 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-bold text-white shadow-inner">
                    {selectedConversation.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      {selectedConversation.name}
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] border border-blue-500/20">
                        {selectedConversation.subject}
                      </span>
                    </h3>
                    <p className="text-xs text-green-500 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/20 rounded-full">
                    <Phone className="h-4 w-4 opacity-70" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/20 rounded-full">
                    <Video className="h-4 w-4 opacity-70" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/20 rounded-full">
                    <MoreVertical className="h-4 w-4 opacity-70" />
                  </Button>
                </div>
              </div>

              {/* Messages Feed */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {filteredChat.map((msg, idx) => (
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
                          ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-sm"
                          : "bg-white dark:bg-zinc-800 text-foreground rounded-bl-sm border border-white/10"
                      )}
                    >
                      <p className="text-sm leading-relaxed tracking-wide">
                        {msg.content}
                      </p>

                      {msg.attachment && (
                        <div className={cn(
                          "mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium bg-black/5 dark:bg-white/5",
                          msg.isSelf ? "text-blue-50" : "text-muted-foreground"
                        )}>
                          <Paperclip className="h-3 w-3" />
                          Attachment
                        </div>
                      )}

                      <span
                        className={cn(
                          "absolute -bottom-5 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity",
                          msg.isSelf ? "right-0 text-blue-600/70" : "left-0 text-muted-foreground"
                        )}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white/20 dark:bg-black/20 backdrop-blur-md border-t border-white/10">
                <div className="relative flex items-end gap-2 p-2 rounded-3xl bg-white/60 dark:bg-zinc-900/60 border border-white/20 shadow-inner focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <Button variant="ghost" size="icon" className="h-10 w-10rounded-full text-muted-foreground hover:bg-black/5 hover:text-blue-500">
                    <Paperclip className="h-5 w-5" />
                  </Button>

                  <Textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
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
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 active:scale-95"
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
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                <div className="relative h-24 w-24 rounded-3xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center border border-white/10 shadow-xl transform rotate-6 hover:rotate-0 transition-all duration-500">
                  <MessageSquare className="h-10 w-10 text-blue-500" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Messages</h3>
                <p className="max-w-xs mx-auto">Select a conversation from the left to start chatting with teachers.</p>
              </div>
            </div>
          )}

        </div>
      </MainLayout>
    </div>
  );
};

export default Messages;
