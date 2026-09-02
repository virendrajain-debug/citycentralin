export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Rohan Mehta",
    role: "Founder",
    company: "Urban Bites",
    quote:
      "Our Instagram went from inactive to our biggest lead source in under four months. The team actually understands strategy, not just posting.",
    avatar: "R",
  },
  {
    name: "Sanya Kapoor",
    role: "Director",
    company: "Studio Lumen",
    quote:
      "The rebrand and the reels they produced completely changed how customers perceive us. Bookings are up and it finally feels premium.",
    avatar: "S",
  },
  {
    name: "Aman Verma",
    role: "Owner",
    company: "GreenLeaf Wellness",
    quote:
      "Clear monthly reporting, a dedicated manager who responds fast, and real growth numbers. Exactly what a small business needs from an agency.",
    avatar: "A",
  },
];
