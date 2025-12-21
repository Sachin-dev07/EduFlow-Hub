import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, Palette, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { updateProfile } from "@/api/authApi";

const Settings = () => {
  // ✅ STEP-2: get token also
  const { user, token, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");

  const handleSave = async () => {
    try {
      if (!token) return alert("Unauthorized");

      const res = await updateProfile({
        name,
        email,
        phone,
        bio,
      });

      updateUser(res.user);
      alert("Profile updated");
    } catch (err) {
      console.error('Settings update error:', err);
      alert(`Update failed: ${err.message || 'Server error'}`);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Shield className="h-4 w-4" /> Privacy
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4" /> Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl border p-6">
              <h3 className="mb-4 font-semibold">Profile Photo</h3>
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-white text-2xl">
                  {user?.name?.charAt(0)}
                </div>
                <Button variant="outline">Change Photo</Button>
              </div>
            </div>

            <div className="rounded-xl border p-6 lg:col-span-2">
              <h3 className="mb-4 font-semibold">Personal Information</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <Label>Bio</Label>
                  <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;
