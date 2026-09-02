export interface ProcessStep {
  id: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { id: 1, title: "Discovery", description: "We learn your business, audience and goals in depth." },
  { id: 2, title: "Strategy", description: "A tailored growth plan across branding, content and ads." },
  { id: 3, title: "Design", description: "Visual identity and creative assets built for your brand." },
  { id: 4, title: "Content", description: "Reels, posts and campaigns produced and scheduled." },
  { id: 5, title: "Launch", description: "Everything goes live across your channels, on schedule." },
  { id: 6, title: "Growth", description: "We track, report and optimize every month for better results." },
];
