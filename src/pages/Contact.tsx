import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@neurox.ai",
    href: "mailto:contact@neurox.ai",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 000-0000",
    href: "tel:+15550000000",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    value: "San Francisco, CA",
    href: null,
  },
];

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll respond within 24 hours.",
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <PageLayout>
      <section className="py-20 bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:bg-gradient-to-r dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 dark:bg-clip-text dark:text-transparent">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions about NeuroX? Our team is ready to help you protect digital trust.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <GlassCard className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Full Name *
                      </label>
                      <Input
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Subject
                    </label>
                    <Input
                      placeholder="How can we help?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      placeholder="Tell us about your needs..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[150px] border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </GlassCard>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {contactInfo.map((item, index) => (
                <GlassCard
                  key={index}
                  className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-white dark:bg-white border-2 border-white dark:border-white shadow-sm">
                      <item.icon className="h-5 w-5 text-slate-900" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{item.title}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-900 dark:text-white font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}

              <GlassCard className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20">
                <div className="text-center py-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Enterprise inquiries</p>
                  <a
                    href="mailto:enterprise@neurox.ai"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    enterprise@neurox.ai
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
