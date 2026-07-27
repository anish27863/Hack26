export const initialTheme = {
  colors: {
    primary: "#E7717D", // coral-500
    secondary: "#C2CAD0", // slate-blue-300
    accent: "#AFD275", // sage-400
    neutral: "#C2B9B0", // warm-taupe-300
    darkNeutral: "#7E685A", // espresso-600
    paper: "#FBF8F6",
    ink: "#2A2320",
    paperDark: "#1C1815",
    inkDark: "#F3EDE9",
  },
  typography: {
    fontFamily: "Inter",
  }
};

export const initialEvent = {
  name: "Hackathon 2026",
  tagline: "Build the future of software.",
  description: "Join us for 48 hours of building, learning, and networking.",
  startDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  endDate: new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000).toISOString(),
  registrationDeadline: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
};

export const initialStats = [
  { id: "1", label: "Participants", value: "500+" },
  { id: "2", label: "Projects", value: "120+" },
  { id: "3", label: "Mentors", value: "25+" },
  { id: "4", label: "Colleges", value: "30+" },
  { id: "5", label: "Duration", value: "48 Hours" },
  { id: "6", label: "Cost", value: "100% Free" },
];

export const initialSchedule = [
  { id: "s1", title: "Registration Opens", description: "Start forming your teams.", date: "2026-08-01", time: "10:00 AM", location: "Online" },
  { id: "s2", title: "Hackathon Starts", description: "Opening Ceremony and Hacking begins.", date: "2026-08-08", time: "09:00 AM", location: "Main Hall" },
  { id: "s3", title: "Project Submission", description: "Deadline to submit your projects.", date: "2026-08-10", time: "09:00 AM", location: "Devpost" },
  { id: "s4", title: "Closing Ceremony", description: "Winners announced.", date: "2026-08-10", time: "05:00 PM", location: "Main Hall" },
];

export const initialPrizes = [
  { id: "p1", tier: "First", amount: "$5,000", description: "Grand prize for the best overall project.", icon: "Trophy", isNew: false },
  { id: "p2", tier: "Second", amount: "$3,000", description: "Runner up for the best overall project.", icon: "Medal", isNew: false },
  { id: "p3", tier: "Third", amount: "$1,000", description: "Second runner up.", icon: "Award", isNew: false },
  { id: "p4", tier: "Best Innovation", amount: "$500", description: "Most out-of-the-box solution.", icon: "Lightbulb", isNew: true },
];

export const initialSponsors = [
  { id: "sp1", name: "TechCorp", category: "Title", logoUrl: "https://via.placeholder.com/150x80?text=TechCorp" },
  { id: "sp2", name: "DevInc", category: "Gold", logoUrl: "https://via.placeholder.com/150x80?text=DevInc" },
  { id: "sp3", name: "CloudWorks", category: "Silver", logoUrl: "https://via.placeholder.com/150x80?text=CloudWorks" },
  { id: "sp4", name: "CodeSpace", category: "Community", logoUrl: "https://via.placeholder.com/150x80?text=CodeSpace" },
];

export const initialFaq = [
  { id: "f1", question: "Who can participate?", answer: "Any college student with a valid ID." },
  { id: "f2", question: "How much does it cost?", answer: "Zero. It's 100% free." },
  { id: "f3", question: "Can I participate if I am a beginner?", answer: "Absolutely! We have mentors to guide you." },
  { id: "f4", question: "What is the max team size?", answer: "You can have up to 4 members in a team." },
];

export const initialRegistrations = [
  {
    id: "r1",
    name: "Jane Doe",
    email: "jane@example.com",
    college: "University of Tech",
    teamName: "The Builders",
    status: "Approved",
    date: new Date().toISOString(),
  }
];

export const initialConfig = {
  theme: initialTheme,
  event: initialEvent,
  stats: initialStats,
  schedule: initialSchedule,
  prizes: initialPrizes,
  sponsors: initialSponsors,
  faq: initialFaq,
  registrations: initialRegistrations,
  adminPassphrase: "demo"
};
