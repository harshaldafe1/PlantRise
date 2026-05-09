import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Layout>
      <section className="min-h-[80vh] flex flex-col items-center justify-center py-16 px-4 gap-6">
        <h1 className="text-3xl font-display font-bold text-foreground">Welcome to your Dashboard</h1>
        <p className="text-muted-foreground">Signed in as <span className="font-medium text-foreground">{user?.email}</span></p>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </section>
    </Layout>
  );
};

export default Dashboard;
