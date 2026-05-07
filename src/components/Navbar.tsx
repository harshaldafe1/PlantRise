import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, UserCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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

        {/* Right side: Login + Hamburger */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/profile"
              className="hidden md:inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground text-sm font-medium px-5 py-2 hover:bg-primary/90 transition-colors"
            >
              <UserCircle size={16} />
              My Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden md:inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium px-5 py-2 hover:bg-primary/90 transition-colors"
            >
              Login
            </Link>
          )}
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
            <li>
              {user ? (
                <Link
                  to="/profile"
                  className="block text-base font-medium text-primary hover:text-primary/80 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block text-base font-medium text-primary hover:text-primary/80 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
