import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/faqs", label: "FAQs" },
  ];

  return (
    <header className="fixed top-0 w-full bg-background z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="PlantRise Logo" className="h-14 w-auto" />
          <span className="font-display text-3xl font-bold text-foreground">
            Plantrise
          </span>
        </Link>

        {/* Desktop Menu - Centered */}
        <ul className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`relative text-base font-medium transition-colors duration-300 pb-1 hover:text-accent
                  ${location.pathname === link.to ? "text-accent" : "text-foreground"}
                `}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300
                    ${location.pathname === link.to ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Auth buttons + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium px-5 py-2 hover:bg-primary/90 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="inline-flex items-center justify-center rounded-md bg-accent text-accent-foreground text-sm font-medium px-5 py-2 hover:brightness-110 transition-all">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link
                to="/profile"
                className="inline-flex items-center justify-center rounded-md bg-secondary text-secondary-foreground text-sm font-medium px-5 py-2 hover:bg-secondary/80 transition-colors"
              >
                My Profile
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <ul className="flex flex-col py-4 px-5 gap-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`block text-base font-medium transition-colors duration-300
                    ${location.pathname === link.to ? "text-accent" : "text-foreground"}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex flex-col gap-2 pt-2 border-t border-border">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full text-left text-base font-medium text-primary hover:text-primary/80 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full text-left text-base font-medium text-accent hover:brightness-110 transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link
                  to="/profile"
                  className="text-base font-medium text-foreground hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <div className="flex items-center gap-2 pt-2">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-sm text-muted-foreground">Account Settings</span>
                </div>
              </SignedIn>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
