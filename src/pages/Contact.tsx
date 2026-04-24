import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import ContactCTA from "@/components/ContactCTA";
import SectionBadge from "@/components/SectionBadge";
import { toast } from "@/components/ui/sonner";
import { submitContactMessage } from "@/lib/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      toast.success("Message sent. I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send message";
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 flex flex-col items-center">
            <SectionBadge text="Get in Touch" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have a project in mind? Let's talk about it. I'm always open to new opportunities.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              onSubmit={handleSubmit}
              className="p-8 md:p-12 rounded-2xl border border-border card-gradient"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Your Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-5 py-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Your Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-5 py-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-3">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={6}
                  className="w-full px-5 py-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none text-sm"
                  placeholder="Tell me about your project, goals, and timeline..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors w-full justify-center text-base active:scale-[0.97] disabled:opacity-60"
              >
                {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                {sending ? "Sending…" : "Send Message"}
              </button>
            </motion.form>

            {/* Contact info cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
            >
              {[
                { icon: Mail, label: "Email", value: "raza.dev145@gmail.com" },
                { icon: Phone, label: "Phone", value: "+92 309 2438145" },
                { icon: MapPin, label: "Location", value: "Karachi Pakistan" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 p-5 rounded-xl border border-border card-gradient">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-foreground font-medium text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 nav:py-20 bg-card/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 flex flex-col items-center">
            <SectionBadge text="Before You Reach Out" />
            <h2 className="text-3xl font-bold text-foreground">Common Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "What information should I include in my message?", a: "A brief description of your project, your timeline, budget range, and any specific technologies or features you need." },
              { q: "Do you take on freelance projects?", a: "Yes! I'm available for freelance work, contract positions, and full-time opportunities." },
              { q: "Can you sign an NDA?", a: "Absolutely. I respect confidentiality and am happy to sign NDAs before discussing sensitive project details." },
            ].map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-lg border border-border card-gradient">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default Contact;
