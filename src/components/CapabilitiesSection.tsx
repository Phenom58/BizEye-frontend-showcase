import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MessageSquare, LineChart, Lightbulb, TrendingUp, BarChart, Database } from "lucide-react";

export const CapabilitiesSection = () => {
  const capabilities = [
    {
      icon: MessageSquare,
      title: "Customer Sentiment Analysis",
      description: "Analyze customer reviews and feedback with advanced NLP",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: LineChart,
      title: "Sales Performance Tracking",
      description: "Monitor sales trends and performance metrics in real-time",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Lightbulb,
      title: "AI-Powered Insights",
      description: "Get intelligent business recommendations automatically",
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      icon: TrendingUp,
      title: "Predictive Modeling",
      description: "Forecast future sales and business trends accurately",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: BarChart,
      title: "Data Visualization",
      description: "Interactive charts and graphs for better insights",
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: Database,
      title: "Category-Specific Analysis",
      description: "Tailored insights for different product categories",
      gradient: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section id="capabilities" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Key <span className="text-gradient">Capabilities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI capabilities designed to transform your business operations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 card-shadow hover:glow-effect group cursor-pointer">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {capability.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {capability.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
