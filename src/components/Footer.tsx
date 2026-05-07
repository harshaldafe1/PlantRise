import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-plantrise-green-light">
              About Us
            </h3>
            <p className="text-sm leading-relaxed opacity-90">
              We are a passionate eco-friendly brand dedicated to providing high-quality plant seeds and
              sustainable protein products. Grow your garden and nourish your body with nature's best.
            </p>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-plantrise-green-light">
              Shop Categories
            </h3>
            <ul className="space-y-2">
              {["Seeds", "Plant Nutrients", "Plant Protein", "Accessories"].map((item) => (
                <li key={item}>
                  <span className="text-sm opacity-90 hover:text-accent transition-colors duration-300 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-plantrise-green-light">
              Customer Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faqs" className="text-sm opacity-90 hover:text-accent transition-colors duration-300">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm opacity-90 hover:text-accent transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <span className="text-sm opacity-90 hover:text-accent transition-colors duration-300 cursor-pointer">
                  Shipping Info
                </span>
              </li>
              <li>
                <span className="text-sm opacity-90 hover:text-accent transition-colors duration-300 cursor-pointer">
                  Return Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-plantrise-green-light">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/20 text-center">
          <p className="text-sm opacity-80">
            © 2026 PlantRise. All rights reserved. | Designed with love for nature.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
