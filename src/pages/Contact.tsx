import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const contactInfo = [
  { icon: Mail, title: "Email", value: "info@yourcompany.com" },
  { icon: Phone, title: "Phone", value: "+91-9270542700" },
  { icon: MapPin, title: "Address", value: "123 Main Street, City, State, ZIP Code" },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-5 py-16">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Contact Us
          </h1>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {contactInfo.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-card rounded-2xl p-6 text-center shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 mx-auto mb-3 flex items-center justify-center">
                  <Icon size={22} className="text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.value}</p>
              </div>
            );
          })}
        </motion.div>

        <motion.p
          className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We'd love to hear from you! Whether you have questions, feedback, or need support, fill out the form
          below or reach out directly. We're here to help.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-8 shadow-sm space-y-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:brightness-110 transition-all"
          >
            Submit
          </button>
        </motion.form>
      </div>
    </Layout>
  );
};

export default Contact;
