export interface SubService {
  name: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  subServices: SubService[];
}

export const services: Service[] = [
  {
    id: 1,
    title: "Social Media Management",
    description: "Strategic social presence that drives engagement and builds community.",
    subServices: [
      { name: "Instagram Management" },
      { name: "Facebook Management" },
      { name: "Content Calendar" },
      { name: "Content Planning" },
      { name: "Community Management" },
    ],
  },
  {
    id: 2,
    title: "Branding",
    description: "Visual identities that make your business unforgettable.",
    subServices: [
      { name: "Logo Design" },
      { name: "Brand Identity" },
      { name: "Premium Posters" },
      { name: "Creative Graphics" },
      { name: "Carousel & Story Designs" },
    ],
  },
  {
    id: 3,
    title: "Video Production",
    description: "Scroll-stopping video content shot and edited for retention.",
    subServices: [
      { name: "Professional Reels" },
      { name: "AI Videos" },
      { name: "Motion Graphics" },
      { name: "Product Videos" },
      { name: "Video Editing" },
    ],
  },
  {
    id: 4,
    title: "Brand Promotion",
    description: "Amplify your reach with targeted campaigns and local visibility.",
    subServices: [
      { name: "Google Business Profile" },
      { name: "Google Reviews" },
      { name: "Meta Ads" },
      { name: "Google Ads" },
      { name: "SEO" },
    ],
  },
  {
    id: 5,
    title: "Influencer & Content",
    description: "Authentic partnerships that expand your audience naturally.",
    subServices: [
      { name: "Influencer Marketing" },
      { name: "Product Photography" },
      { name: "Professional Video Shoot" },
    ],
  },
  {
    id: 6,
    title: "Website Development",
    description: "Fast, responsive websites that convert visitors into customers.",
    subServices: [
      { name: "Responsive Websites" },
      { name: "Landing Pages" },
      { name: "Business & Portfolio Websites" },
      { name: "Fast Performance" },
      { name: "SEO Optimized" },
    ],
  },
  {
    id: 7,
    title: "Monthly Reports",
    description: "Clear, honest reporting on what's working and what's next.",
    subServices: [
      { name: "Analytics Dashboard" },
      { name: "Growth Reports" },
      { name: "Performance Review" },
    ],
  },
  {
    id: 8,
    title: "Account Management",
    description: "One point of contact who knows your brand inside out.",
    subServices: [
      { name: "Dedicated Account Manager" },
      { name: "Priority Support" },
      { name: "Strategy Calls" },
    ],
  },
  {
    id: 9,
    title: "Growth Strategy",
    description: "Data-driven strategies that turn efforts into measurable growth.",
    subServices: [
      { name: "Competitor Analysis" },
      { name: "Content Strategy" },
      { name: "Business Growth Consulting" },
    ],
  },
];

export const whyChooseUs = [
  { title: "Creative Branding", description: "Distinct visual identities that make your business unforgettable." },
  { title: "Strategic Content", description: "Every post is planned around a goal, not just a posting schedule." },
  { title: "AI Marketing", description: "Smarter targeting and faster creative production powered by AI." },
  { title: "Professional Reels", description: "Scroll-stopping video content shot and edited for retention." },
  { title: "Premium Posters", description: "Design-led graphics that carry your brand's tone in every post." },
  { title: "Website Development", description: "Fast, responsive websites that convert visitors into customers." },
  { title: "Google Business Growth", description: "Higher visibility, better reviews, more local walk-ins and calls." },
  { title: "Dedicated Account Manager", description: "One point of contact who knows your brand inside out." },
  { title: "Monthly Reports", description: "Clear, honest reporting on what's working and what's next." },
];
