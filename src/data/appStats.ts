// src/data/appStats.ts

import { Building2, Package, Users, TrendingUp, Zap, Shield } from "lucide-react";

export const APP_STATS = {
  // Stats used in the Hero section's trust indicators
  heroIndicators: [
    {
      icon: Shield,
      value: "500+",
      label: "Verified Companies",
      color: "text-success-300",
    },
    {
      icon: TrendingUp,
      value: "5000+",
      label: "Quality Products",
      color: "text-accent-300",
    },
    {
      icon: Zap,
      value: "24/7",
      label: "Support Available",
      color: "text-yellow-300",
    },
  ],
  // Stats used in the StatsAndHowItWorks section's main grid
  engagement: [
    {
      icon: Building2,
      value: "500+",
      label: "Verified Companies",
      color: "text-primary-500",
      bgColor: "bg-primary-100",
    },
    {
      icon: Package,
      value: "5,000+",
      label: "Quality Products",
      color: "text-accent-500",
      bgColor: "bg-accent-100",
    },
    {
      icon: Users,
      value: "10,000+",
      label: "Happy Customers",
      color: "text-success-500",
      bgColor: "bg-success-100",
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Satisfaction Rate",
      color: "text-warning-500",
      bgColor: "bg-warning-100",
    },
  ],
};