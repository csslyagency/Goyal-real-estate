import type { PhotoName } from "./photos";

/**
 * Site copy. Text marked "brief" is taken from the Goyals Group brief document;
 * keep it in sync with the client's approved wording.
 */

// ---------------------------------------------------------------- About (brief)

export const about = {
  eyebrow: "About us",
  title: "A legacy built on trust since 1956",
  paragraphs: [
    "Established in 1956, Goyals Group is an Indore-rooted business group whose journey began in construction and real estate, and has grown over seven decades through trust, integrity and an enduring entrepreneurial spirit.",
    "Founded by Mr. Prem Chand Goyal and Mr. Vijay Goyal, the Group began with a vision that extended beyond constructing buildings. It was about creating lasting landmarks, building enduring relationships and conducting business with principles that stand the test of time.",
    "Over the past seven decades, Goyals Group has delivered 50+ real estate developments across Indore, contributing to the city's evolving residential and commercial landscape while earning the confidence of generations of families, investors and businesses.",
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
  { name: "Ethical Business", note: "Transparent practices and responsible growth, guided by values set in 1956." },
];

// ---------------------------------------------------------- Crafted legacy (brief)

export const legacy = {
  eyebrow: "Crafted legacy",
  title: "Seven decades. Three generations. One enduring philosophy.",
  intro: "The story of Goyals Group is a journey built across generations.",
  generations: [
    {
      label: "First generation",
      person: "Mr. Prem Chand Goyal",
      photo: "person-prem-chand-goyal" as PhotoName,
      body: "In 1956, Mr. Prem Chand Goyal and Mr. Vijay Goyal laid the foundation of the Group with determination, entrepreneurial courage and a belief in doing business the right way. Before establishing Goyals Group, Mr. Prem Chand Goyal gained entrepreneurial experience across 16 different business sectors, experience that shaped his resilience, business acumen and understanding of opportunity.",
    },
    {
      label: "Second generation",
      person: "Mr. Gopal Goyal",
      photo: "person-gopal-goyal" as PhotoName,
      body: "The second generation, led by Mr. Gopal Goyal, carried those principles forward, strengthening the Group's presence across construction and real estate while deepening relationships with customers, partners and the wider community.",
    },
    {
      label: "Third generation",
      person: "Mr. Tanmay Goyal",
      photo: "person-tanmay-goyal" as PhotoName,
      body: "Today, the third generation, represented by Mr. Tanmay Goyal, brings a contemporary perspective to the journey, with fresh thinking, innovation and a progressive outlook to its next chapter.",
    },
  ],
  philosophy: "Build with integrity. Think long-term. Create lasting value.",
};

export const journey = [
  {
    marker: "1956",
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

// ------------------------------------------------------------------- Our work (brief)

export const otherDevelopments = [
  {
    name: "Other Residential Developments",
    body: "Spaces designed to support the way people live, grow and build their futures.",
  },
  {
    name: "Other Commercial Developments",
    body: "A portfolio built through years of experience across Indore's evolving commercial landscape.",
  },
];

export const projectsIntro = {
  eyebrow: "Our work",
  title: "Places we have built. Experiences we continue to create.",
  body: "Over the years, our developments have become part of Indore's evolving landscape. Every project carries the same intent: to create something meaningful today while retaining its relevance and value for tomorrow.",
};


// ------------------------------------------------------------------ Stats (brief)

/** Only figures stated in the brief. Add more here once confirmed by the client. */
export const stats = [
  { value: 1956, prefix: "", suffix: "", label: "Established in Indore", animate: false },
  { value: 50, prefix: "", suffix: "+", label: "Real estate developments across Indore", animate: true },
  { value: 70, prefix: "", suffix: "", label: "Years of building trust", animate: true },
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


// --------------------------------------------------------------- Testimonials

export const testimonialsIntro = {
  eyebrow: "Testimonials",
  title: "Trust is the legacy we value most.",
  body: "For more than seven decades, our journey has been shaped by the people who have trusted us. From customers and investors to business partners, associates and generations of families, these relationships remain one of the most meaningful measures of what we have built.",
};

export type Testimonial = { name: string; context: string; quote: string };

/**
 * Genuine, approved words from Goyals Group customers and partners. The testimonials section on
 * the home page appears only once this list has entries; never add invented quotes.
 */
export const testimonials: Testimonial[] = [];

// ------------------------------------------------------------- Advisory (site copy)



// ---------------------------------------------------------------- Careers (site copy)

export const careers = {
  lede: "Goyals Group has grown over seven decades through trust, integrity and an enduring entrepreneurial spirit, across construction, real estate and hospitality in Indore. We are always glad to hear from people who share our values.",
  teams: [
    { name: "Construction & project execution", body: "Planning, engineering and site teams who turn drawings into buildings that last." },
    { name: "Sales & client relations", body: "Advisors who guide families, investors and businesses with clear, honest information." },
    { name: "Hospitality & events", body: "The teams behind weddings, conventions, celebrations and contemporary stays." },
    { name: "Finance, legal & administration", body: "The people who keep a growing group organised, compliant and moving forward." },
  ],
};
