export interface Event {
  id: number;
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  description?: string;
  category?: string;
}

export const events: Event[] = [
  {
    id: 1,
    title: "React Summit 2026",
    image: "/images/event1.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands",
    date: "June 15-16, 2026",
    time: "09:00 AM - 05:00 PM",
    description: "Europe's largest React conference bringing together developers, architects, and decision makers.",
    category: "Conference",
  },
  {
    id: 2,
    title: "Web3 Developer Hackathon",
    image: "/images/event2.png",
    slug: "web3-hackathon-2026",
    location: "San Francisco, CA",
    date: "May 10-12, 2026",
    time: "10:00 AM - 06:00 PM",
    description: "Build decentralized applications and compete for $100k in prizes.",
    category: "Hackathon",
  },
  {
    id: 3,
    title: "TypeScript Conference 2026",
    image: "/images/event3.png",
    slug: "typescript-conf-2026",
    location: "Seattle, WA",
    date: "July 22-23, 2026",
    time: "08:30 AM - 04:30 PM",
    description: "Deep dive into TypeScript ecosystem with talks on advanced patterns and tools.",
    category: "Conference",
  },
  {
    id: 4,
    title: "AI/ML Tech Meetup",
    image: "/images/event4.png",
    slug: "ai-ml-meetup-2026",
    location: "New York, NY",
    date: "April 8, 2026",
    time: "06:00 PM - 08:30 PM",
    description: "Monthly meetup discussing latest trends in artificial intelligence and machine learning.",
    category: "Meetup",
  },
  {
    id: 5,
    title: "Node.js Interactive 2026",
    image: "/images/event5.png",
    slug: "nodejs-interactive-2026",
    location: "Toronto, Canada",
    date: "September 3-4, 2026",
    time: "09:00 AM - 05:00 PM",
    description: "Connect with Node.js core team members and community leaders.",
    category: "Conference",
  },
  {
    id: 6,
    title: "JavaScript Workshop Series",
    image: "/images/event6.png",
    slug: "js-workshop-series-2026",
    location: "London, UK",
    date: "May 25, 2026",
    time: "10:00 AM - 04:00 PM",
    description: "Hands-on workshop covering modern JavaScript patterns and best practices.",
    category: "Workshop",
  },
];
