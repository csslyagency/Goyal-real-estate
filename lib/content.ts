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
    "Over the past seven decades, Goyals Group has delivered 75+ real estate developments across Indore, contributing to the city's evolving residential and commercial landscape while earning the confidence of generations of families, investors and businesses.",
    "What began with construction and real estate has since evolved into a broader business group with an expanding presence in hospitality and new opportunities, while remaining firmly grounded in the values that shaped its foundation.",
  ],
  closing:
    "For Goyals Group, growth has never been measured only by what is built. It is measured by the trust earned, relationships strengthened and value created along the way.",
};

export const vision = {
  eyebrow: "Vision & Mission",
  heading: "Grounded in Values. Driven by Purpose.",
  aside:
    "We envision a future where our work goes beyond real estate and hospitality, contributing to the growth of Indore and creating meaningful opportunities for generations.",
  label: "Our vision",
  title: "To Shape a Better Tomorrow.",
  body: "To create spaces, businesses and experiences that enrich lives, strengthen communities and contribute to the city's progress.",
};

export const mission = {
  label: "Our mission",
  title: "Build with Purpose.\nGrow with Integrity.",
  body: "We are committed to delivering quality developments and exceptional hospitality through thoughtful planning, responsible growth and transparent business practices.",
  belief: "Honour every commitment. Earn every trust. Make every effort count.",
};

/** The five principles, as the client names them. */
export const principles = ["Integrity", "Trust", "Simplicity", "Commitment", "Excellence"];

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
      body: "The second generation, led by Mr. Gopal Goyal, carried those principles forward, strengthening the Group's presence across construction and real estate while deepening relationships with customers, partners and the wider community. With a focus on responsible growth, thoughtful expansion and long-term relationships, he continued to build upon the foundation established by the previous generation, guiding the Group towards new opportunities while remaining committed to its core values and business principles.",
    },
    {
      label: "Third generation",
      person: "Mr. Tanmay Goyal",
      photo: "person-tanmay-goyal" as PhotoName,
      body: "Today, the third generation, represented by Mr. Tanmay Goyal, brings a contemporary perspective to the journey, with fresh thinking, innovation and a progressive outlook to its next chapter. Combining an eagerness to learn with an understanding of the Group's established values, he contributes new ideas and perspectives to its evolving journey, embracing emerging opportunities while gaining practical experience and carrying forward the entrepreneurial spirit that has shaped the Group across generations.",
    },
  ],
  philosophy: "Build with integrity. Think long-term. Create lasting value.",
};

export const journey = [
  {
    marker: "1956",
    title: "Where It All Began",
    body: "Mr. Prem Chand Goyal began his entrepreneurial journey, gaining experience across 16 different business sectors. Guided by honesty, resilience and determination, these early experiences laid the foundation for a lasting business legacy.",
  },
  {
    marker: "1984",
    title: "The Birth of Goyals Group",
    body: "Mr. Prem Chand Goyal and Mr. Vijay Goyal established Goyals Group, marking the beginning of a journey in construction and real estate, built upon trust, integrity and a commitment to doing business the right way.",
  },
  {
    marker: "The years that followed · Real estate",
    title: "Building Indore",
    body: "The Group expanded across residential and commercial developments, creating over 75+ landmarks throughout Indore and strengthening its reputation through quality, enduring relationships and generations of customer trust.",
  },
  {
    marker: "1992",
    title: "Social Responsibility",
    body: "The establishment of Goyal Parmarthik Trust reflected the Group's commitment to giving back to society through initiatives focused on education, community welfare and social development.",
  },
  {
    marker: "2018",
    title: "Golden Leaves Convention Centre",
    body: "The Group entered the hospitality sector with Golden Leaves Convention Centre, introducing a destination for grand weddings, celebrations and conventions in Central India.",
  },
  {
    marker: "2022",
    title: "The Park Indore",
    body: "Continuing its hospitality journey, the Group marked another milestone with The Park Indore, further strengthening its presence in the city's evolving hospitality landscape.",
  },
  {
    marker: "2026",
    title: "Fortune Select Nipania, Indore",
    body: "The Group's hospitality portfolio expanded further with Fortune Select Nipania, Indore, bringing a new chapter of premium hospitality through its association with ITC Hotels.",
  },
  {
    marker: "Today & beyond",
    title: "The Next Generation",
    body: "With three generations of entrepreneurial experience, Goyals Group continues to explore new opportunities across real estate and hospitality, carrying forward the values that have shaped its journey since the beginning.",
  },
];

// ------------------------------------------------------------------- Our work (brief)

export const projectsIntro = {
  eyebrow: "Our work",
  title: "Places we have built. Experiences we continue to create.",
  body: "Over the years, our developments have become part of Indore's evolving landscape. Every project carries the same intent: to create something meaningful today while retaining its relevance and value for tomorrow.",
};


// ------------------------------------------------------------------ Stats (brief)

/** Only figures stated in the brief. Add more here once confirmed by the client. */
export const stats = [
  { value: 1956, prefix: "", suffix: "", label: "Established in Indore", animate: false },
  { value: 75, prefix: "", suffix: "+", label: "Real estate developments across Indore", animate: true },
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
  title: "Trust Is What Keeps Us Going",
  body: "For more than seven decades, our journey has been shaped by the people who have trusted us. From customers and investors to business partners, associates and generations of families, these relationships remain one of the most meaningful measures of what we have built.",
};

export type Testimonial = { name: string; context: string; quote: string; illustrative: boolean };

/**
 * SAMPLE testimonials, written for the design. They are not real customers and are labelled
 * "Illustrative" on the page. Replace each with genuine, approved words and set
 * `illustrative: false`; the note under the section disappears once none are illustrative.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Arjun Agrawal",
    context: "Home buyer",
    quote: "What stood out was how plainly everything was explained. We never felt rushed, and every question about the home got a straight answer.",
    illustrative: true,
  },
  {
    name: "Neha Sharma",
    context: "First-time buyer",
    quote: "Buying our first home felt far less daunting than we expected. The team walked us through each step and stayed in touch long after the paperwork was done.",
    illustrative: true,
  },
  {
    name: "Rohan Mehta",
    context: "Business owner",
    quote: "We were looking for a space where our business could grow for years, not just months. The conversations focused on what we actually needed.",
    illustrative: true,
  },
  {
    name: "Ananya Agarwal",
    context: "Event host",
    quote: "From the first walkthrough to the evening itself, everything was handled with warmth and care. Our guests still talk about it.",
    illustrative: true,
  },
  {
    name: "Vikram Khanna",
    context: "Long-term investor",
    quote: "I appreciated the patience. They helped me compare options carefully and think about the long term rather than pushing a quick decision.",
    illustrative: true,
  },
  {
    name: "Karan Bhatia",
    context: "Family relocating to Indore",
    quote: "Moving cities is stressful. Having people who know Indore this well made choosing the right neighbourhood and home much simpler.",
    illustrative: true,
  },
  {
    name: "Sunita Jain",
    context: "Homeowner",
    quote: "Years after moving in, the colony still feels well looked after. The roads, the greenery and the neighbours make it a place we are proud to call home.",
    illustrative: true,
  },
  {
    name: "Rajesh Patidar",
    context: "Plot owner",
    quote: "Clear paperwork and honest answers from the start. When we had questions, we spoke to people who knew the project, not a script.",
    illustrative: true,
  },
  {
    name: "Pooja Malviya",
    context: "Wedding host",
    quote: "Planning a wedding for six hundred guests sounded overwhelming. The team made it feel personal, and every detail on the day was looked after.",
    illustrative: true,
  },
  {
    name: "Amit Choudhary",
    context: "Corporate event organiser",
    quote: "We have held our annual conference with them twice now. Spacious venues, a responsive team and service that never missed a beat.",
    illustrative: true,
  },
];

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

// -------------------------------------------------------- About: founding belief and trust

export const honesty = {
  eyebrow: "Our founding belief",
  title: "Honesty is our best policy.",
  paragraphs: [
    "In 1956, when Mr. Prem Chand Goyal began his entrepreneurial journey, he wrote a simple line on the very first bill book of his business: “Honesty is our best policy.”",
    "What began as a few words on a bill book became a principle he would carry throughout his life. For him, honesty was never just a statement; it was a way of doing business, treating people and building relationships.",
    "Decades later, that belief remains at the heart of Goyals Group. Through generations, changing times and growing businesses, one thing has remained unchanged: the values with which it all began.",
  ],
};

export const parmarthikTrust = {
  eyebrow: "Giving back",
  title: "Goyal Parmarthik Trust",
  paragraphs: [
    "Established in 1992, Goyal Parmarthik Trust represents the philanthropic and community welfare initiatives of Goyals Group, rooted in the belief that true success is measured not only by what we achieve, but also by what we give back.",
    "Guided by the values of compassion, service and social responsibility, the Trust reflects the Goyal family's commitment to supporting those in need and contributing to the well-being of society.",
    "Through this endeavour, the Group seeks to carry forward a legacy of kindness, generosity and meaningful service to the community.",
  ],
  values: ["Compassion", "Service", "Social responsibility"],
};
