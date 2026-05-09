import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Target, BookOpen, Package, Users, Award } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const sections = [
  {
    icon: Leaf,
    title: "Introduction / Overview",
    content: [
      "At Plantrise, we believe gardening should be simple, natural, and accessible to everyone. As a young and passionate start-up, our mission is to bring nature closer to every home by offering quality gardening products that make growing plants easy and enjoyable.",
      "We started with premium-grade vermicompost, a 100% organic and eco-friendly soil enhancer, carefully crafted to boost soil fertility and enhance plant growth naturally. Our vision goes beyond compost — we are committed to providing a wide range of home gardening solutions that empower people to create their own green spaces.",
    ],
  },
  {
    icon: Target,
    title: "Mission Statement",
    content: [
      "Our mission is to make gardening a part of every home. Whether you live in a city apartment or a farmhouse, Plantrise ensures that you can enjoy the joy of growing your own food, flowers, and greenery — the natural way.",
    ],
  },
  {
    icon: BookOpen,
    title: "Our Story",
    content: [
      "Founded in 2026, our journey began with a simple idea: to bridge the gap between technology and everyday needs. Over the years, we've grown from a small startup to a leading provider in our industry, driven by a relentless pursuit of improvement and a focus on our community.",
    ],
  },
  {
    icon: Package,
    title: "What We Offer",
    content: [
      "Vermicompost (5 KG Pack): Organic, eco-friendly, and chemical-free compost made using earthworms — perfect for vegetables, flowers, lawns, and indoor plants.",
      "Vegetable Growing Kits: Specially designed kits that allow you to grow fresh, chemical-free vegetables right in your kitchen garden. These easy-to-use kits come with everything you need to start your green journey.",
      "Gardening Essentials (Coming Soon): Tools, seeds, organic fertilizers, and plant care products — all focused on making gardening simple for beginners and rewarding for experts.",
    ],
  },
];

const team = [
  { name: "Tony Stark", role: "CEO & Founder" },
  { name: "Thor", role: "Production Manager" },
  { name: "Steve Roger", role: "Marketing Specialist" },
];

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-5 py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            About Us
          </h1>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={i}
                className="bg-card rounded-2xl p-8 shadow-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <h2 className="text-2xl font-heading font-semibold text-foreground">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-3">
                  {section.content.map((p, j) => (
                    <p key={j} className="text-muted-foreground leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Team */}
        <motion.section
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Users size={24} className="text-accent" />
            <h2 className="text-3xl font-heading font-semibold text-foreground">
              Meet The Team
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="bg-card rounded-2xl p-6 text-center shadow-sm"
                whileHover={{ y: -5 }}
              >
                <div className="w-20 h-20 rounded-full bg-accent/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-heading font-bold text-accent">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          className="mt-16 bg-card rounded-2xl p-8 shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Award size={20} className="text-accent" />
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              Why Choose Us
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            What sets us apart is our personalized approach, proven track record of success, and commitment to
            delivering results on time. We prioritize open communication and long-term partnerships with our
            clients.
          </p>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="mt-16 text-center bg-primary rounded-2xl p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-6">
            Ready to Get Started?
          </h2>
          <Link
            to="/contact"
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:brightness-110 transition-all"
          >
            Contact Us
          </Link>
        </motion.section>
      </div>
    </Layout>
  );
};

export default About;
