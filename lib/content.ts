import type { PhotoName } from "./photos";

/**
 * Site copy. Text marked "brief" is taken from the Goyals Group brief document;
 * keep it in sync with the client's approved wording.
 */

// ---------------------------------------------------------------- About (brief)

export const about = {
  eyebrow: "About us",
  title: "A legacy built on trust since 1984",
  paragraphs: [
    "Established in 1984, Goyals Group is an Indore-rooted business group whose journey began in construction and real estate, and has grown over four decades through trust, integrity and an enduring entrepreneurial spirit.",
    "Founded by Mr. Prem Chand Goyal and Mr. Vijay Goyal, the Group began with a vision that extended beyond constructing buildings. It was about creating lasting landmarks, building enduring relationships and conducting business with principles that stand the test of time.",
    "Over the past four decades, Goyals Group has delivered 50+ real estate developments across Indore, contributing to the city's evolving residential and commercial landscape while earning the confidence of generations of families, investors and businesses.",
    "What began with construction and real estate has since evolved into a broader business group with an expanding presence in hospitality and new opportunities, while remaining firmly grounded in the values that shaped its foundation.",
  ],
  closing:
    "For Goyals Group, growth has never been measured only by what is built. It is measured by the trust earned, relationships strengthened and value created along the way.",
};

export const vision = {
  label: "Our vision",
  title: "To build what lasts.",
  body: "To create enduring developments, businesses and experiences that add lasting value to people, communities and the city we call home.",
  aside:
    "We aspire to build more than successful projects. We aspire to create places and enterprises that remain meaningful for generations to come.",
};

export const mission = {
  label: "Our mission",
  title: "Build with purpose. Grow with integrity.",
  body: "We are committed to creating quality developments and experiences through thoughtful planning, responsible growth, transparent practices and an uncompromising approach to integrity.",
  belief: "Do good work. Build lasting relationships. Leave something better behind.",
};

/** The five principles named in the brief; the one-line notes are site copy. */
export const principles = [
  { name: "Honesty", note: "Clear information and straightforward conversations, from the first visit onwards." },
  { name: "Simplicity", note: "Thoughtful planning that keeps spaces practical, usable and easy to live and work in." },
  { name: "Integrity", note: "Doing business the right way, even when no one is watching." },
  { name: "Commitment", note: "Standing by what we build and the people who place their trust in it." },
  { name: "Ethical Business", note: "Transparent practices and responsible growth, guided by values set in 1984." },
];

// ---------------------------------------------------------- Crafted legacy (brief)

export const legacy = {
  eyebrow: "Crafted legacy",
  title: "Four decades. Three generations. One enduring philosophy.",
  intro: "The story of Goyals Group is a journey built across generations.",
  generations: [
    {
      label: "First generation",
      body: "In 1984, Mr. Prem Chand Goyal and Mr. Vijay Goyal laid the foundation of the Group with determination, entrepreneurial courage and a belief in doing business the right way. Before establishing Goyals Group, Mr. Prem Chand Goyal gained entrepreneurial experience across 16 different business sectors, experience that shaped his resilience, business acumen and understanding of opportunity.",
    },
    {
      label: "Second generation",
      body: "The second generation carried those principles forward, strengthening the Group's presence across construction and real estate while deepening relationships with customers, partners and the wider community.",
    },
    {
      label: "Third generation",
      body: "Today, the third generation brings a contemporary perspective to the journey. Mr. Gopal Goyal continues to carry forward the Group's experience and values, while Mr. Tanmay Goyal brings fresh thinking, innovation and a progressive outlook to its next chapter.",
    },
  ],
  philosophy: "Build with integrity. Think long-term. Create lasting value.",
};

export const journey = [
  {
    marker: "1984",
    title: "The beginning",
    body: "Goyals Group is established by Mr. Prem Chand Goyal and Mr. Vijay Goyal, laying the foundation of a business built on construction, real estate and entrepreneurial determination.",
  },
  {
    marker: "The years that followed",
    title: "Building Indore",
    body: "The Group grows through residential and commercial developments across Indore, becoming part of the city's evolving landscape and earning the trust of generations of customers and businesses.",
  },
  {
    marker: "Expanding the vision",
    title: "From real estate to hospitality",
    body: "Building on decades of experience in creating spaces, the Group expands into hospitality and destination-led experiences.",
  },
  {
    marker: "Today",
    title: "Building for what's next",
    body: "With three generations of entrepreneurial experience and new opportunities ahead, Goyals Group continues to evolve while remaining rooted in the principles with which it began.",
  },
];

// -------------------------------------------------------------- Businesses (brief)

export type Business = {
  key: "commercial" | "residential" | "hospitality";
  name: string;
  headline: string;
  body: string;
  image: PhotoName;
  href: string;
  projects: string[];
};

export const businessesIntro = {
  eyebrow: "Our businesses",
  title: "Commercial. Residential. Hospitality.",
  body: "From places where businesses grow to homes where families build their futures, and destinations where people come together, our businesses share one common purpose: to create spaces that serve a purpose, create value and stand the test of time.",
};

export const businesses: Business[] = [
  {
    key: "residential",
    name: "Residential",
    headline: "Places made for life.",
    body: "A home is more than an address. Our residential developments are thoughtfully planned with a focus on quality, usability, community and lasting value.",
    image: "residence-garden-tower",
    href: "/properties/residential/",
    projects: ["Goyal Hills", "Other residential developments"],
  },
  {
    key: "commercial",
    name: "Commercial",
    headline: "Spaces that move business forward.",
    body: "Our commercial developments are created with a focus on thoughtful planning, functionality, accessibility and long-term value, giving businesses the environment they need to establish, grow and thrive.",
    image: "commercial-tower",
    href: "/properties/commercial/",
    projects: ["Goyals Green", "Other commercial developments"],
  },
  {
    key: "hospitality",
    name: "Hospitality",
    headline: "Creating places people remember.",
    body: "From celebrations and conventions to contemporary stays and destination-led experiences, our hospitality ventures bring together scale, service, thoughtful design and the warmth of Indian hospitality.",
    image: "venue-lawn",
    href: "/hospitality/",
    projects: ["Golden Leaves Convention Centre", "Fortune Select Nipania"],
  },
];

export const otherDevelopments = [
  {
    category: "residential" as const,
    name: "Other Residential Developments",
    body: "Spaces designed to support the way people live, grow and build their futures.",
  },
  {
    category: "commercial" as const,
    name: "Other Commercial Developments",
    body: "A portfolio built through years of experience across Indore's evolving commercial landscape.",
  },
];

export const projectsIntro = {
  eyebrow: "Our projects",
  title: "Places we have built. Experiences we continue to create.",
  body: "Over the years, our developments have become part of Indore's evolving landscape. Every project carries the same intent: to create something meaningful today while retaining its relevance and value for tomorrow.",
};

export const moreToCome = {
  eyebrow: "New & upcoming",
  title: "More to come.",
  body: "As Goyals Group continues to grow, new developments and opportunities are taking shape across its businesses.",
  note: "Details of new projects will be shared here as they are announced. Register your interest and our team will keep you informed.",
};

// ------------------------------------------------------------------ Stats (brief)

/** Only figures stated in the brief. Add more here once confirmed by the client. */
export const stats = [
  { value: 1984, prefix: "", suffix: "", label: "Established in Indore", animate: false },
  { value: 50, prefix: "", suffix: "+", label: "Real estate developments across Indore", animate: true },
  { value: 40, prefix: "", suffix: "+", label: "Years of building trust", animate: true },
  { value: 3, prefix: "", suffix: "", label: "Generations of the Goyal family", animate: true },
];

// ------------------------------------------------------------ Founder's note (brief)

export const founderNote = {
  eyebrow: "Founder's note",
  title: "True success is not measured by what we build, but by the lives we touch.",
  paragraphs: [
    "I have always believed that true success is not measured by what we build, but by the lives we touch and the value we leave behind.",
    "Business, to me, has never been only about creating wealth; it is about creating opportunities, serving society and building something that carries meaning beyond our own lifetime.",
    "I believe prosperity is a blessing from God, and with that blessing comes a responsibility to give back. The greatest legacy is not in the size of what we create, but in the trust we earn, the goodness we share and the values we pass on.",
    "If the work we leave behind makes life a little better for those who come after us, then I believe we have truly built something worthwhile.",
  ],
  name: "Mr. Prem Chand Goyal",
  role: "Founder, Goyals Group",
};

export const closing = {
  eyebrow: "Closing statement",
  title: "We build what lasts.",
  body: "For more than four decades, Goyals Group has believed that the strongest foundations are built on trust. As we look ahead, that belief remains at the centre of everything we do.",
  line: "Building with purpose. Growing with integrity. Creating what lasts.",
};

// --------------------------------------------------------------- Testimonials

export const testimonialsIntro = {
  eyebrow: "Testimonials",
  title: "Trust is the legacy we value most.",
  body: "For more than four decades, our journey has been shaped by the people who have trusted us. From customers and investors to business partners, associates and generations of families, these relationships remain one of the most meaningful measures of what we have built.",
};

/**
 * DEMO testimonials for the design preview only (requested in the website
 * brief). They are not real customers or reviews and are labelled as
 * illustrative on the page. Replace with genuine, approved testimonials and set
 * `illustrative: false` on each one before launch.
 */
export const testimonials = [
  {
    name: "Arjun Agrawal",
    context: "Home buyer",
    quote:
      "What stood out was how plainly everything was explained. We never felt rushed, and every question about the home got a straight answer.",
    illustrative: true,
  },
  {
    name: "Neha Sharma",
    context: "First-time buyer",
    quote:
      "Buying our first home felt far less daunting than we expected. The team walked us through each step and stayed in touch long after the paperwork was done.",
    illustrative: true,
  },
  {
    name: "Rohan Mehta",
    context: "Business owner",
    quote:
      "We were looking for a space where our business could grow for years, not just months. The conversations focused on what we actually needed.",
    illustrative: true,
  },
  {
    name: "Ananya Agarwal",
    context: "Event host",
    quote:
      "From the first walkthrough to the evening itself, everything was handled with warmth and care. Our guests still talk about it.",
    illustrative: true,
  },
  {
    name: "Vikram Khanna",
    context: "Long-term investor",
    quote:
      "I appreciated the patience. They helped me compare options carefully and think about the long term rather than pushing a quick decision.",
    illustrative: true,
  },
  {
    name: "Karan Bhatia",
    context: "Family relocating to Indore",
    quote:
      "Moving cities is stressful. Having people who know Indore this well made choosing the right neighbourhood and home much simpler.",
    illustrative: true,
  },
];

// ------------------------------------------------------------- Advisory (site copy)

export const advisory = {
  eyebrow: "Guidance",
  title: "Make better property decisions.",
  body: "Whether you are choosing a family home, a business address or a long-term holding, a good decision starts with the right questions. Our team will take you through them, plainly and without pressure.",
  points: [
    { title: "Property selection", body: "Narrow down what fits your needs, stage of life and plans, not just what is available today." },
    { title: "Location understanding", body: "Four decades in Indore means knowing how neighbourhoods live, connect and change." },
    { title: "Investment perspective", body: "Weigh residential and commercial options against your own goals and time horizon." },
    { title: "Market context", body: "Clear context on the wider Indore market to inform, not hurry, your decision." },
    { title: "Long-term planning", body: "Think beyond the purchase: usability, upkeep and how a property serves you over years." },
    { title: "Straight answers", body: "Direct access to people who build, so questions about a project reach the right desk." },
  ],
  disclaimer:
    "Information shared is general guidance and not financial or investment advice. Property values can rise or fall; please make decisions based on your own circumstances.",
};

// ---------------------------------------------------------------- Indore (site copy)

export const indore = {
  name: "Indore",
  state: "Madhya Pradesh",
  title: "Rooted in Indore.",
  lead: "Indore is where Goyals Group began in 1984, and where all of its developments stand today. Four decades on, the city remains home.",
  body: "The largest city in Madhya Pradesh and the state's commercial capital, Indore combines a strong trading culture with a fast-growing, well-kept urban fabric. It has repeatedly been ranked India's cleanest city in the national Swachh Survekshan survey and is home to both an IIT and an IIM.",
  positioning: [
    { label: "Living", body: "Established neighbourhoods and newer residential corridors for families at every stage." },
    { label: "Business", body: "The state's commercial capital, with a deep trading culture and growing services sector." },
    { label: "Hospitality", body: "A city that loves to celebrate, from weddings and conventions to contemporary stays." },
  ],
  propertyTypes: ["Residential", "Commercial", "Hospitality"],
  image: "indore-rajwada" as PhotoName,
  gallery: ["indore-gandhi-hall", "indore-chhatris", "heritage-arches"] as PhotoName[],
};
