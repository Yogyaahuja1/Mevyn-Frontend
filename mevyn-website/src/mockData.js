export const CATEGORIES = [
  { id: 'events',  label: 'Events',        color: '#ef9e27' },
  { id: 'diaries', label: 'Intern Diaries', color: '#5dcaa5' },
  { id: 'voice',   label: 'Campus Voice',   color: '#d85a30' },
  { id: 'gallery', label: 'Gallery',        color: '#7f77dd' },
  { id: 'soapbox', label: 'Soapbox',        color: '#c9a84c' },
];

export const ARTICLES = [
  {
    id: 1, category: 'soapbox', categoryLabel: 'Soapbox',
    title: 'Soapbox Election 2025: A Battle of Ideas That Shook the Campus',
    excerpt: 'Candidates clashed over hostel curfews, placement cell reforms, and the future of the annual fest. Here is everything that went down.',
    author: 'Ananya Mehta', date: 'Mar 15, 2025',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    tags: ['elections', 'student body', 'campus'],
    featured: true,
  },
  {
    id: 2, category: 'diaries', categoryLabel: 'Intern Diaries',
    title: 'My Summer at Microsoft: What Nobody Tells You About Big Tech',
    excerpt: 'Three months in Hyderabad, a project that nearly failed, and the lessons that changed how I think about engineering.',
    author: 'Rohan Verma', date: 'Feb 28, 2025',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    tags: ['microsoft', 'internship', 'tech'],
    featured: true,
  },
  {
    id: 3, category: 'events', categoryLabel: 'Events',
    title: 'Techfest 2025: Robotics, AI Talks and a Concert Nobody Expected',
    excerpt: 'The annual tech fest went bigger than ever — from drone competitions to a surprise performance that had everyone talking.',
    author: 'Priya Iyer', date: 'Feb 10, 2025',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    tags: ['techfest', 'robotics', 'AI'],
    featured: true,
  },
  {
    id: 4, category: 'voice', categoryLabel: 'Campus Voice',
    title: 'The Mess Committee Crisis Nobody Is Talking About',
    excerpt: 'Students have been complaining about food quality for months. We investigated, and what we found is worse than you think.',
    author: 'Dev Sharma', date: 'Jan 25, 2025',
    img: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80',
    tags: ['mess', 'student issues'],
  },
  {
    id: 5, category: 'diaries', categoryLabel: 'Intern Diaries',
    title: 'Goldman Sachs in Mumbai: Finance, Fear, and Finding My Footing',
    excerpt: 'I walked in knowing nothing about investment banking. Ten weeks later, I knew what I wanted to do with my life.',
    author: 'Sanya Kapoor', date: 'Jan 18, 2025',
    img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
    tags: ['finance', 'goldman', 'internship'],
  },
  {
    id: 6, category: 'events', categoryLabel: 'Events',
    title: 'The Cultural Night That Stood Still in Time',
    excerpt: 'A photo essay of the most emotional evening of the semester — through the lens of MEVYN.',
    author: 'Kiran Nair', date: 'Dec 20, 2024',
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    tags: ['cultural', 'photography'],
  },
  {
    id: 7, category: 'voice', categoryLabel: 'Campus Voice',
    title: 'Wi-Fi at 2AM: The Infrastructure Problem Killing Student Productivity',
    excerpt: 'Data, student testimonials, and a conversation with the network admin who asked to remain anonymous.',
    author: 'Arjun Bose', date: 'Dec 5, 2024',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    tags: ['infrastructure', 'campus'],
  },
  {
    id: 8, category: 'soapbox', categoryLabel: 'Soapbox',
    title: 'Debate Recap: Should the Annual Fest Go Hybrid?',
    excerpt: 'The panel was divided. The audience was louder. We break down every argument made on stage.',
    author: 'Meera Pillai', date: 'Nov 30, 2024',
    img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    tags: ['debate', 'soapbox'],
  },
];

export const GALLERY_PHOTOS = [
  { id: 1, event: 'Soapbox 2025', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', caption: 'Opening statements' },
  { id: 2, event: 'Techfest', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80', caption: 'Robotics arena' },
  { id: 3, event: 'Cultural Night', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', caption: 'Main stage performance' },
  { id: 4, event: 'Campus Life', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80', caption: 'Between lectures' },
  { id: 5, event: 'Soapbox 2025', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80', caption: 'Q&A session' },
  { id: 6, event: 'Techfest', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', caption: 'AI workshop' },
  { id: 7, event: 'Cultural Night', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', caption: 'Crowd energy' },
  { id: 8, event: 'Campus Life', img: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&q=80', caption: 'Library corner' },
  { id: 9, event: 'Soapbox 2025', img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&q=80', caption: 'Closing ceremony' },
];

export const TIMELINE_EVENTS = [
  { date: 'Apr 2025', title: 'Annual Day Coverage', desc: 'Full documentation of the annual day ceremony, awards, and alumni talks.', upcoming: true },
  { date: 'Mar 2025', title: 'Soapbox Elections', desc: 'Live coverage of student body elections — debates, rallies, and results night.', upcoming: false },
  { date: 'Feb 2025', title: 'Intern Diaries Season 2', desc: 'A new series launched — 8 students, 8 companies, 8 honest stories.', upcoming: false },
  { date: 'Feb 2025', title: 'Techfest 2025', desc: 'Three days of events, workshops, and competitions covered end-to-end.', upcoming: false },
  { date: 'Jan 2025', title: 'Campus Voice: Mess Issue', desc: 'Investigative piece that triggered a formal review by the student council.', upcoming: false },
  { date: 'Dec 2024', title: 'Cultural Night', desc: 'A photo and video essay of the semesters most emotional evening.', upcoming: false },
  { date: 'Nov 2024', title: 'MEVYN Launched', desc: 'First article published. The media club begins its journey.', upcoming: false },
  { date: 'May 2025', title: 'End Semester Documentary', desc: 'A short documentary capturing the full arc of this academic year. Coming soon.', upcoming: true },
];

export const TEAM = [
  { name: 'Ananya Mehta', role: 'Editor-in-Chief', beat: 'Campus Politics', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Rohan Verma', role: 'Senior Writer', beat: 'Intern Diaries', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Priya Iyer', role: 'Head of Photography', beat: 'Events & Gallery', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
  { name: 'Dev Sharma', role: 'Investigative Writer', beat: 'Campus Voice', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  { name: 'Sanya Kapoor', role: 'Features Writer', beat: 'Diaries & Profiles', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80' },
  { name: 'Kiran Nair', role: 'Videographer', beat: 'Video & Docs', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' },
];

export const FAQS = [
  { q: 'How can I submit a story or tip to MEVYN?', a: 'Use the Queries & Suggestions form on this page, or reach us directly via our campus email. We review every submission and get back within 3 working days.' },
  { q: 'Can I join the MEVYN team?', a: 'Yes! We hold open recruitment at the start of each semester. Follow our campus noticeboard or check this site for announcements. We welcome writers, photographers, and videographers.' },
  { q: 'How do you decide what to cover?', a: 'Our editorial team discusses upcoming events, student-submitted ideas, and ongoing campus issues every week. We prioritize stories that affect the most students.' },
  { q: 'Are your articles peer-reviewed or fact-checked?', a: 'Every published piece goes through at least two editorial reviews. For Campus Voice investigations, we reach out to relevant authorities for comment before publishing.' },
  { q: 'Can I reuse MEVYN photos for my project?', a: 'Yes, with credit. All MEVYN content is free to reuse for non-commercial, educational purposes as long as you credit the author and MEVYN.' },
];

export const TICKER_ITEMS = [
  'Soapbox 2025 coverage is live',
  'New intern diary: Rohan at Microsoft',
  'Gallery updated — Techfest photos',
  'Campus Voice: Mess committee responds',
  'Annual Day — coming up April 2025',
  'Season 2 of Intern Diaries now running',
  'Submit your story or tip to MEVYN',
];

export const VIDEOS = [
  { id: 1, title: 'Soapbox 2025 — Full Highlights', event: 'Soapbox', thumb: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', embedId: 'dQw4w9WgXcQ', date: 'Mar 2025' },
  { id: 2, title: 'Techfest Robotics Finals', event: 'Techfest', thumb: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80', embedId: 'dQw4w9WgXcQ', date: 'Feb 2025' },
  { id: 3, title: 'Cultural Night — A Short Film', event: 'Cultural Night', thumb: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', embedId: 'dQw4w9WgXcQ', date: 'Dec 2024' },
];