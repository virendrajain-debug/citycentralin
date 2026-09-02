export interface PricingTier {
  name: string;
  price: string;
  period: string;
  popular: boolean;
  features: string[];
  highlight?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Silver",
    price: "\u20B99,999",
    period: "/ month",
    popular: false,
    features: [
      "Social Media Management",
      "Instagram Management",
      "Facebook Management",
      "Monthly Content Calendar",
      "10 Premium Posts",
      "6 Professional Reels",
      "10 Story Designs",
      "Graphic Design",
      "Google Business Profile",
      "Monthly Performance Report",
      "Basic Content Strategy",
    ],
  },
  {
    name: "Gold",
    price: "\u20B914,999",
    period: "/ month",
    popular: true,
    highlight: "MOST POPULAR",
    features: [
      "Everything in Silver",
      "Competitor Analysis",
      "Advanced Content Strategy",
      "15 Premium Posts",
      "10 Professional Reels",
      "15 Story Designs",
      "5 AI Videos",
      "Premium Graphic Design",
      "Logo / Brand Creative Support",
      "Instagram Management",
      "Facebook Management",
      "Google Business Profile",
      "Google Review Management",
      "Monthly Performance Report",
      "Dedicated Account Manager",
    ],
  },
  {
    name: "Platinum",
    price: "\u20B924,999",
    period: "/ month",
    popular: false,
    features: [
      "Everything in Gold",
      "20 Premium Posts",
      "15 Professional Reels",
      "20 Story Designs",
      "10 AI Videos",
      "Advanced Brand Strategy",
      "Premium Branding",
      "Professional Creative Direction",
      "Influencer Marketing Support",
      "Professional Shoot Planning",
      "Meta Ads Strategy",
      "Google Ads Strategy",
      "SEO Strategy",
      "Advanced Google Business Growth",
      "Priority Support",
      "Dedicated Account Manager",
      "Bi-weekly Strategy Calls",
      "Advanced Monthly Analytics",
      "Growth Consultation",
    ],
  },
];
