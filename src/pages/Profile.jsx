import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { LogOut, User, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (!user) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-5 py-20 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-5 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-heading font-bold text-primary mb-8">
            My Profile
          </h1>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user.fullName || "User"}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <User size={40} className="text-accent" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      {user.fullName || "User"}
                    </CardTitle>
                    <CardDescription>
                      {user.primaryEmailAddress?.emailAddress}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail size={20} />
                <span>{user.primaryEmailAddress?.emailAddress}</span>
              </div>
              {user.createdAt && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar size={20} />
                  <span>
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full sm:w-auto"
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Profile;
