import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

const App = () => (
  <ClerkProvider 
    publishableKey={clerkPubKey}
    appearance={{
      variables: {
        colorPrimary: "#4ade80",
        colorBackground: "#ffffff",
        colorText: "#0f172a",
        colorInputBackground: "#ffffff",
        colorInputText: "#0f172a",
        colorTextSecondary: "#64748b",
        colorDanger: "#ef4444",
        colorSuccess: "#22c55e",
        colorWarning: "#f59e0b",
        colorNeutral: "#f1f5f9",
        borderRadius: "0.5rem",
      },
      elements: {
        formButtonPrimary: 
          "bg-[#4ade80] hover:bg-[#22c55e] text-white",
        card: "shadow-lg",
        headerTitle: "text-slate-900",
        headerSubtitle: "text-slate-600",
        socialButtonsBlockButton: 
          "border border-slate-300 hover:bg-slate-50",
        formFieldInput: 
          "bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#4ade80] focus:ring-[#4ade80]",
        formFieldLabel: "text-slate-700",
        footerActionLink: "text-[#4ade80] hover:text-[#22c55e]",
        identityPreviewText: "text-slate-900",
        identityPreviewEditButton: "text-[#4ade80]",
        formResendCodeLink: "text-[#4ade80] hover:text-[#22c55e]",
        otpCodeFieldInput: 
          "bg-white border-2 border-slate-300 text-slate-900 text-center text-xl font-semibold focus:border-[#4ade80] focus:ring-2 focus:ring-[#4ade80]",
      },
    }}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
