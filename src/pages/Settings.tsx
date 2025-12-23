import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, Palette, Save, Loader2, Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { updateProfile } from "@/api/authApi";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Settings = () => {
  const { user, token, updateUser } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!token) return;
    setLoading(true);

    try {
      const res = await updateProfile({
        name,
        email,
        phone,
        bio,
      });

      updateUser(res.user);
      toast({
        title: "Success",
        description: "Profile updated successfully.",
        className: "bg-green-500/90 text-white border-none",
      });
    } catch (err: any) {
      console.error('Settings update error:', err);
      toast({
        title: "Error",
        description: err.response?.data?.message || err.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black overflow-hidden selection:bg-teal-500/30">

      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse delay-1000" />
      </div>

      <MainLayout>
        <div className="mb-8 animate-fade-in space-y-2 relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
            Account Settings
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="relative z-10">
          <TabsList className="mb-8 bg-white/40 dark:bg-black/40 backdrop-blur-md p-1 border border-white/20 h-auto rounded-full w-full justify-start max-w-2xl">
            <TabsTrigger value="profile" className="rounded-full flex-1 gap-2 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 transition-all font-medium">
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-full flex-1 gap-2 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 transition-all font-medium">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="rounded-full flex-1 gap-2 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 transition-all font-medium">
              <Shield className="h-4 w-4" /> Privacy
            </TabsTrigger>
            <TabsTrigger value="appearance" className="rounded-full flex-1 gap-2 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 transition-all font-medium">
              <Palette className="h-4 w-4" /> Appearance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="animate-slide-up">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Profile Photo Card */}
              <div className="glass-card rounded-3xl border border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 shadow-lg flex flex-col items-center justify-center text-center group hover:bg-white/50 transition-colors">
                <div className="relative mb-6">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-4xl font-bold shadow-xl ring-4 ring-white/50 dark:ring-white/10 group-hover:scale-105 transition-transform duration-300">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md text-teal-600 hover:bg-gray-100 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="font-bold text-xl text-foreground mb-1">{user?.name}</h3>
                <p className="text-sm text-muted-foreground capitalize bg-white/50 px-3 py-1 rounded-full border border-white/20">{user?.role}</p>
              </div>

              {/* Personal Info Form */}
              <div className="glass-card rounded-3xl border border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 shadow-lg lg:col-span-2 hover:bg-white/50 transition-colors">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-xl text-foreground">Personal Information</h3>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Cancel</Button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-muted-foreground ml-1 font-medium">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/50 dark:bg-black/20 border-white/20 focus:bg-white/80 focus:border-teal-500/50 transition-all rounded-xl h-12 backdrop-blur-sm shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-muted-foreground ml-1 font-medium">Email Address</Label>
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/50 dark:bg-black/20 border-white/20 focus:bg-white/80 focus:border-teal-500/50 transition-all rounded-xl h-12 backdrop-blur-sm shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-muted-foreground ml-1 font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-white/50 dark:bg-black/20 border-white/20 focus:bg-white/80 focus:border-teal-500/50 transition-all rounded-xl h-12 backdrop-blur-sm shadow-inner"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="bio" className="text-muted-foreground ml-1 font-medium">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="bg-white/50 dark:bg-black/20 border-white/20 focus:bg-white/80 focus:border-teal-500/50 transition-all rounded-xl min-h-[120px] backdrop-blur-sm shadow-inner resize-none p-4"
                      placeholder="Tell us a little about yourself"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end pt-6 border-t border-white/10">
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className={cn(
                      "gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 rounded-full px-8 h-12 font-semibold transition-all hover:scale-105 active:scale-95 text-white",
                      loading && "opacity-80 cursor-not-allowed"
                    )}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="animate-slide-up">
            <div className="glass-card rounded-3xl border border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-12 shadow-lg flex flex-col items-center justify-center min-h-[400px]">
              <div className="h-24 w-24 rounded-full bg-teal-500/10 flex items-center justify-center mb-6 animate-pulse">
                <Bell className="h-10 w-10 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Notifications</h3>
              <p className="text-muted-foreground mt-2 max-w-sm text-center">Customize how you receive updates and alerts. This feature is currently under development.</p>
            </div>
          </TabsContent>
          <TabsContent value="privacy" className="animate-slide-up">
            <div className="glass-card rounded-3xl border border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-12 shadow-lg flex flex-col items-center justify-center min-h-[400px]">
              <div className="h-24 w-24 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 animate-pulse">
                <Shield className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Privacy & Security</h3>
              <p className="text-muted-foreground mt-2 max-w-sm text-center">Manage your security preferences and two-factor authentication. Coming soon.</p>
            </div>
          </TabsContent>
          <TabsContent value="appearance" className="animate-slide-up">
            <div className="glass-card rounded-3xl border border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-12 shadow-lg flex flex-col items-center justify-center min-h-[400px]">
              <div className="h-24 w-24 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 animate-pulse">
                <Palette className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Appearance</h3>
              <p className="text-muted-foreground mt-2 max-w-sm text-center">Customize your dashboard theme and colors. This feature is coming in the next update.</p>
            </div>
          </TabsContent>
        </Tabs>
      </MainLayout>
    </div>
  );
};

export default Settings;
