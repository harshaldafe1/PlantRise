import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Pencil,
  Lock,
  LogOut,
  Package,
  Eye,
  EyeOff,
  Save,
  X,
} from "lucide-react";

const mockOrders = [
  { id: "ORD-1042", date: "Feb 15, 2026", items: "Vermicompost × 2", total: "₹598", status: "Delivered" },
  { id: "ORD-1038", date: "Jan 28, 2026", items: "Panchgavya × 1", total: "₹349", status: "Shipped" },
  { id: "ORD-1025", date: "Jan 10, 2026", items: "Vermiwash × 3", total: "₹747", status: "Delivered" },
];

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    fullName: user?.displayName || "PlantRise User",
    email: user?.email || "",
    phone: "+91 98765 43210",
    address: "123 Green Lane, Organic Colony, Bengaluru, KA 560001",
  });

  const [changingPassword, setChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const initials = profileData.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setEditing(false);
    toast({ title: "Profile updated", description: "Your profile has been saved successfully." });
  };

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      toast({ title: "Missing fields", description: "Please fill in all password fields.", variant: "destructive" });
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      toast({ title: "Mismatch", description: "New passwords do not match.", variant: "destructive" });
      return;
    }
    if (passwords.newPass.length < 6) {
      toast({ title: "Too short", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(user!.email!, passwords.current);
      await reauthenticateWithCredential(user!, credential);
      await updatePassword(user!, passwords.newPass);
      setChangingPassword(false);
      setPasswords({ current: "", newPass: "", confirm: "" });
      toast({ title: "Password changed", description: "Your password has been updated." });
    } catch {
      toast({ title: "Failed", description: "Current password is incorrect.", variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const statusColor = (status: string) => {
    if (status === "Delivered") return "text-accent";
    if (status === "Shipped") return "text-plantrise-gold";
    return "text-muted-foreground";
  };

  return (
    <Layout>
      <section className="min-h-[80vh] py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-display font-bold text-foreground">My Profile</h1>
            {!editing ? (
              <Button variant="outline" onClick={() => setEditing(true)} className="gap-2">
                <Pencil className="h-4 w-4" /> Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setEditing(false)} className="gap-2">
                  <X className="h-4 w-4" /> Cancel
                </Button>
                <Button onClick={handleSaveProfile} className="gap-2">
                  <Save className="h-4 w-4" /> Save
                </Button>
              </div>
            )}
          </div>

          {/* Profile Card */}
          <Card className="border-border/50 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative group">
                  <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                    {avatarPreview ? (
                      <AvatarImage src={avatarPreview} alt="Profile" />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                        {initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {editing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera className="h-6 w-6 text-background" />
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 w-full space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <Label className="flex items-center gap-1.5 text-muted-foreground text-xs uppercase tracking-wider">
                        <User className="h-3.5 w-3.5" /> Full Name
                      </Label>
                      {editing ? (
                        <Input
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                        />
                      ) : (
                        <p className="text-foreground font-medium">{profileData.fullName}</p>
                      )}
                    </div>
                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label className="flex items-center gap-1.5 text-muted-foreground text-xs uppercase tracking-wider">
                        <Mail className="h-3.5 w-3.5" /> Email
                      </Label>
                      <p className="text-foreground font-medium">{profileData.email}</p>
                    </div>
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label className="flex items-center gap-1.5 text-muted-foreground text-xs uppercase tracking-wider">
                        <Phone className="h-3.5 w-3.5" /> Phone
                      </Label>
                      {editing ? (
                        <Input
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      ) : (
                        <p className="text-foreground font-medium">{profileData.phone}</p>
                      )}
                    </div>
                    {/* Address */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label className="flex items-center gap-1.5 text-muted-foreground text-xs uppercase tracking-wider">
                        <MapPin className="h-3.5 w-3.5" /> Shipping Address
                      </Label>
                      {editing ? (
                        <Input
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        />
                      ) : (
                        <p className="text-foreground font-medium">{profileData.address}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" /> Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!changingPassword ? (
                <Button variant="outline" onClick={() => setChangingPassword(true)} className="gap-2">
                  <Lock className="h-4 w-4" /> Update Password
                </Button>
              ) : (
                <div className="space-y-4 max-w-sm">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showPasswords ? "text" : "password"}
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPasswords(!showPasswords)}
                      >
                        {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input
                      type={showPasswords ? "text" : "password"}
                      value={passwords.newPass}
                      onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input
                      type={showPasswords ? "text" : "password"}
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleChangePassword} className="gap-2">
                      <Save className="h-4 w-4" /> Save Password
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setChangingPassword(false);
                        setPasswords({ current: "", newPass: "", confirm: "" });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order History */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" /> Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-secondary/50 gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.date} · {order.items}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-foreground">{order.total}</span>
                      <span className={`text-xs font-medium ${statusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Logout */}
          <Separator />
          <div className="flex justify-center">
            <Button variant="destructive" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
