import { FeatureCard } from "./FeatureCard";
import { TrendingUp, Brain, BarChart3, Target, Zap, Database } from "lucide-react";
import { motion } from "framer-motion";

export const FeaturesSection = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "LightGBM-powered sales forecasting with real-time quarterly performance tracking and advanced trend analysis for data-driven decisions.",
    },
    {
      icon: Brain,
      title: "AI Recommendations",
      description: "BERT-based sentiment analysis using Hugging Face models to generate intelligent, category-specific business recommendations.",
    },
    {
      icon: BarChart3,
      title: "Dashboard & Analytics",
      description: "Comprehensive real-time dashboard with interactive Chart.js visualizations, category filtering, and easy data management.",
    },
    {
      icon: Target,
      title: "Sales Forecasting",
      description: "Category-specific sales predictions powered by advanced machine learning models to help plan inventory and resources.",
    },
    {
      icon: Zap,
      title: "Real-Time Insights",
      description: "Monitor business metrics and KPIs in real-time with dynamic visualizations and performance tracking dashboards.",
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Easy dataset import/export with comprehensive data analysis tools for better business intelligence and decision making.",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful <span className="text-gradient">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make intelligent, data-driven business decisions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
