
import React from 'react';
import { 
  Instagram, 
  Video, 
  Calendar, 
  Users, 
  Zap, 
  TrendingUp, 
  PenTool,
  Target,
  BarChart3,
  Layers,
  Cpu,
  Globe,
  Award
} from 'lucide-react';
import { ServiceCardProps, PricingPlan, FAQItem } from './types';

export const SERVICES: ServiceCardProps[] = [
  {
    icon: <Instagram className="w-8 h-8 text-pink-500" />,
    title: "Instagram Growth (Organic)",
    description: "Proprietary SEO and engagement systems that increase reach and profile visits—no bots, just algorithm-optimized strategy.",
    tags: ["SEO", "Algorithm", "Engagement"]
  },
  {
    icon: <Video className="w-8 h-8 text-blue-500" />,
    title: "Reels / Shorts Editing",
    description: "High-retention edits with dynamic subtitling and sound design engineered to maximize watch time and viral potential.",
    tags: ["4K", "Viral Cuts", "Retention"]
  },
  {
    icon: <PenTool className="w-8 h-8 text-cyan-500" />,
    title: "Ghostwriting & Thought Leadership",
    description: "Capturing your unique voice to create high-impact carousel copy and captions that build authority and trust.",
    tags: ["Copywriting", "Branding", "Authority"]
  },
  {
    icon: <Calendar className="w-8 h-8 text-purple-500" />,
    title: "Content Strategy & Systems",
    description: "We build your content pillars and 30-day roadmap so you always know what to post and how it scales.",
    tags: ["Planning", "Systems", "Scale"]
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,
    title: "Full Studio Management",
    description: "From ideas to posting—strategy, editing, captions, and scheduling handled entirely by our creative team.",
    tags: ["Hands-Off", "Priority Support"]
  }
];

export const PORTFOLIO_CATEGORIES = [
  "All Projects",
  "Personal Branding",
  "SaaS & Founders",
  "D2C & E-commerce",
  "Luxury Real Estate"
];

export const PORTFOLIO_ITEMS = [
  {
    client: "Alex Rivera",
    category: "Personal Branding",
    metrics: { views: "12.4M", followers: "+85K", conversion: "14%" },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    tags: ["Hooks", "Retained Content"]
  },
  {
    client: "Nebula SaaS",
    category: "SaaS & Founders",
    metrics: { views: "4.2M", followers: "+12K", conversion: "28%" },
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
    tags: ["Education", "Demo Loops"]
  },
  {
    client: "Vela Aesthetics",
    category: "D2C & E-commerce",
    metrics: { views: "8.9M", followers: "+42K", conversion: "19%" },
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    tags: ["Product Storytelling"]
  },
  {
    client: "Horizon Estates",
    category: "Luxury Real Estate",
    metrics: { views: "2.1M", followers: "+5K", conversion: "32%" },
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    tags: ["Cinematic", "High Ticket"]
  },
  {
    client: "Dr. Sarah Chen",
    category: "Personal Branding",
    metrics: { views: "15.1M", followers: "+110K", conversion: "11%" },
    image: "https://images.unsplash.com/photo-1559839734-2b71f1e59816?q=80&w=800&auto=format&fit=crop",
    tags: ["Authority Building"]
  },
  {
    client: "Meta-Node Tech",
    category: "SaaS & Founders",
    metrics: { views: "6.7M", followers: "+24K", conversion: "21%" },
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    tags: ["B2B Growth"]
  }
];

export const METHODOLOGY_STEPS = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Attention Arbitrage",
    desc: "We identify content patterns the algorithm is currently favoring and inject your brand into the high-velocity traffic lanes.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Retention Engineering",
    desc: "Using psychology-based hooks and dynamic pacing to force the algorithm to keep serving your content to new audiences.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Trust Infrastructure",
    desc: "Automated nurturing systems that transform cold viewers into loyal brand advocates through strategic thought-leadership.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Conversion Systems",
    desc: "Hard-wiring 'Calls to Action' into every asset to ensure reach translates directly into inbound lead volume.",
    color: "from-orange-500 to-yellow-500"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Growth Starter",
    price: "Custom",
    features: [
      "8-12 Professional Reels/mo",
      "Organic Engagement System",
      "Dynamic Subtitles & SFX",
      "1 Revision per Asset",
      "Basic Hook Strategy"
    ],
    cta: "Select Starter"
  },
  {
    name: "Agency Pro",
    price: "Custom",
    recommended: true,
    features: [
      "12-16 Premium Reels/mo",
      "Full Profile Optimization",
      "Ghostwriting & Copywriting",
      "Weekly Strategy Sprints",
      "Growth Analytics Dashboard",
      "Priority Scheduling"
    ],
    cta: "Select Pro"
  },
  {
    name: "Elite Custom",
    price: "Custom",
    features: [
      "Unlimited Content Editing",
      "Daily Account Management",
      "Founder Access (WhatsApp)",
      "Omnichannel Distribution",
      "Paid Ads Creative Strategy",
      "Bespoke Creative Direction"
    ],
    cta: "Contact for Elite"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "How fast will I see growth?",
    answer: "Our systems typically show measurable momentum within 14–21 days of the first post. Organic growth is a compounding effect."
  },
  {
    question: "Do you handle the actual posting?",
    answer: "Yes. Our Pro and Elite plans are 'Done-For-You', meaning we manage the entire pipeline from scripting to final publication."
  },
  {
    question: "Is this safe for my account?",
    answer: "Absolutely. We use zero automation or bots. Everything is 100% organic and follows platform terms of service."
  },
  {
    question: "What niches do you work with?",
    answer: "We specialize in Personal Brands, SaaS Founders, B2B Consultants, and High-Performance Coaches."
  }
];

export const TRUST_INDICATORS = [
  "50M+ Views Generated",
  "100% Organic Systems",
  "Weekly Performance Sprints",
  "High-Retention Focus"
];

export const PROCESS_STEPS = [
  {
    title: "Strategic Audit",
    desc: "We analyze your current positioning and fix the conversion leaks in your bio and content."
  },
  {
    title: "System Design",
    desc: "Developing your custom content pillars and viral hooks based on data-driven trends."
  },
  {
    title: "Asset Production",
    desc: "Our editors transform your raw footage into high-retention social assets."
  },
  {
    title: "Scaling Phase",
    desc: "Constant iteration based on analytics to explode reach and build a loyal audience."
  }
];
