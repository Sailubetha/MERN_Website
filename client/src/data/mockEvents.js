export const mockOrganizingBodies = [
  {
    _id: "ob_1",
    name: "Student Activity Council",
    code: "SAC_MAIN",
    category: "Council",
    description: "The apex student governing body managing all cultural, technical, and sports events across campus.",
    logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop"
  },
  {
    _id: "ob_2",
    name: "Technical Club (Innovate)",
    code: "TECH_CLUB",
    category: "Club",
    description: "Organizing coding hackathons, robotics challenges, AI workshops, and tech expos.",
    logoUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=150&h=150&fit=crop"
  },
  {
    _id: "ob_3",
    name: "Literary & Debate Club (Ellipsis)",
    code: "LIT_CLUB",
    category: "Club",
    description: "Fostering eloquence, critical debate, creative writing, and MUN competitions.",
    logoUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=150&h=150&fit=crop"
  },
  {
    _id: "ob_4",
    name: "Cultural Society (Sargam)",
    code: "CULT_SOC",
    category: "Club",
    description: "Celebrating music, dance, theatrical arts, and annual cultural fest extravaganzas.",
    logoUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&h=150&fit=crop"
  },
  {
    _id: "ob_5",
    name: "Sports Committee",
    code: "SPORTS_COMM",
    category: "Committee",
    description: "Promoting physical fitness, inter-college tournaments, and athletics meet.",
    logoUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=150&h=150&fit=crop"
  }
];

export const mockEvents = [
  {
    _id: "evt_1",
    title: "HackSAC 2026: 24-Hour AI & Web Hackathon",
    slug: "hacksac-2026",
    description: "Build innovative full-stack web applications and AI agents in 24 continuous hours! Compete for cash prizes, industry mentorship, and recruitment opportunities from top tech firms.",
    shortDescription: "24-hour flagship hackathon organized by the Technical Club.",
    posterUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop",
    organizingBody: mockOrganizingBodies[1], // Technical Club
    category: "Technical",
    startDate: "2026-10-15T09:00:00.000Z",
    endDate: "2026-10-16T09:00:00.000Z",
    venue: "Main Auditorium & CS Labs",
    isPublished: true,
    manualStatusOverride: "automatic",
    coordinators: [
      { name: "Aarav Sharma", phone: "+91 98765 43210", email: "aarav.sharma@college.edu" },
      { name: "Sneha Reddy", phone: "+91 98765 43211", email: "sneha.reddy@college.edu" }
    ],
    rules: [
      "Teams of 2 to 4 students allowed.",
      "All code must be written during the 24-hour hackathon period.",
      "Use of open-source libraries and APIs is permitted."
    ],
    eligibility: "Open to all B.Tech / MCA / M.Tech students.",
    maxParticipants: 150,
    prizes: "1st Prize: ₹50,000 | 2nd Prize: ₹30,000 | Best AI Hack: ₹15,000",
    gallery: [],
    registrationSettings: {
      enabled: true,
      deadline: "2026-10-12T23:59:59.000Z",
      customFields: [
        { fieldLabel: "Team Name", fieldType: "text", required: true },
        { fieldLabel: "GitHub Profile URL", fieldType: "text", required: false },
        { fieldLabel: "Programming Language Preference", fieldType: "select", required: true, options: ["JavaScript/Node", "Python", "Java", "C++"] }
      ]
    }
  },
  {
    _id: "evt_2",
    title: "National Parliamentary Debate Championship",
    slug: "national-parliamentary-debate-2026",
    description: "Engage in fiery, intellectual discourse on contemporary geopolitical and economic policies. Judged by seasoned adjudicators across the nation.",
    shortDescription: "Flagship 3-vs-3 parliamentary debate tournament by Ellipsis Club.",
    posterUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop",
    organizingBody: mockOrganizingBodies[2], // Literary Club
    category: "Literary",
    startDate: "2026-09-17T09:00:00.000Z", // Currently ongoing date range
    endDate: "2026-09-18T18:00:00.000Z",
    venue: "Seminar Hall 2 & Academic Block C",
    isPublished: true,
    manualStatusOverride: "automatic",
    coordinators: [
      { name: "Rohan Verma", phone: "+91 98765 43212", email: "rohan.v@college.edu" }
    ],
    rules: [
      "Asian Parliamentary format (3 vs 3).",
      "Motion revealed 15 minutes prior to debate match."
    ],
    eligibility: "All registered undergraduate and postgraduate students.",
    maxParticipants: 64,
    prizes: "Best Team: ₹25,000 | Best Speaker: ₹10,000",
    gallery: [],
    registrationSettings: {
      enabled: true,
      deadline: "2026-09-16T23:59:59.000Z",
      customFields: [
        { fieldLabel: "Debate Experience Level", fieldType: "select", required: true, options: ["Beginner", "Intermediate", "Advanced / National"] }
      ]
    }
  },
  {
    _id: "evt_3",
    title: "Pulse 2026: Annual Cultural Night & Battle of Bands",
    slug: "pulse-2026-cultural-night",
    description: "A thrilling evening featuring live acoustic performances, street dance battles, fashion show, and the grand Battle of Bands competition.",
    shortDescription: "Annual cultural extravaganza by Sargam Cultural Society.",
    posterUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop",
    organizingBody: mockOrganizingBodies[3], // Cultural Club
    category: "Cultural",
    startDate: "2026-11-05T17:00:00.000Z",
    endDate: "2026-11-05T22:30:00.000Z",
    venue: "Open Air Theatre (OAT)",
    isPublished: true,
    manualStatusOverride: "automatic",
    coordinators: [
      { name: "Priya Nair", phone: "+91 98765 43213", email: "priya.nair@college.edu" }
    ],
    rules: [
      "Performers must carry valid college ID cards.",
      "Track duration limit: 12 minutes per band."
    ],
    eligibility: "Open to all students across all branches.",
    maxParticipants: 500,
    prizes: "Best Band: ₹40,000 | Runner Up: ₹20,000",
    gallery: [],
    registrationSettings: {
      enabled: true,
      deadline: "2026-11-01T23:59:59.000Z",
      customFields: [
        { fieldLabel: "Performance Category", fieldType: "select", required: true, options: ["Battle of Bands", "Solo Vocal", "Group Dance", "Fashion Show"] }
      ]
    }
  },
  {
    _id: "evt_4",
    title: "Inter-Departmental Athletics & Sports Fest 2025",
    slug: "athletics-sports-fest-2025",
    description: "The annual sports championship featuring track and field events, football, basketball, badminton, and chess tournaments.",
    shortDescription: "Completed annual sports meet with 800+ student athletes.",
    posterUrl: "https://images.unsplash.com/photo-1517649763962-0c6232661c00?w=800&auto=format&fit=crop",
    organizingBody: mockOrganizingBodies[4], // Sports Committee
    category: "Sports",
    startDate: "2025-12-10T08:00:00.000Z",
    endDate: "2025-12-12T18:00:00.000Z",
    venue: "College Sports Complex & Football Ground",
    isPublished: true,
    manualStatusOverride: "automatic",
    coordinators: [
      { name: "Vikram Singh", phone: "+91 98765 43214", email: "vikram.singh@college.edu" }
    ],
    rules: [
      "Standard Olympic athletics rules apply.",
      "Department jersey mandatory for team events."
    ],
    eligibility: "Completed Event.",
    maxParticipants: 800,
    prizes: "Overall Championship Trophy: CSE Department",
    gallery: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop"
    ],
    registrationSettings: {
      enabled: false,
      deadline: "2025-12-08T23:59:59.000Z",
      customFields: []
    }
  }
];

export const mockAnnouncements = [
  {
    id: "anc_1",
    title: "SAC Student Committee Selections 2026-27 Announced!",
    date: "Sept 15, 2026",
    category: "General Notice",
    content: "Applications are now open for SAC executive board positions. Interested students can apply before Sept 25th."
  },
  {
    id: "anc_2",
    title: "HackSAC 2026 Registration Portal is Now Live!",
    date: "Sept 14, 2026",
    category: "Event Announcement",
    content: "Register your team for the 24-hour hackathon. Early bird teams get exclusive hackathon kits!"
  },
  {
    id: "anc_3",
    title: "Annual Sports Complex Maintenance Schedule",
    date: "Sept 10, 2026",
    category: "Facility Notice",
    content: "The indoor badminton courts will remain closed on Sept 18th for floor resurfacing work."
  }
];
