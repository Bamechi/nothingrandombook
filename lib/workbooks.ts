/**
 * NOTHING IS RANDOM — Reflection Workbooks (the Free 7-Day Challenge).
 * All question wording is verbatim from
 * NoThing_Is_Random_Complete_Reflection_Workbook_v6.pdf.
 * Do not edit workbook copy without a new approved draft.
 *
 * PDF download links are placeholders until the revised documents land —
 * any link containing "_HERE" renders as a Coming Soon state.
 */

export type WField =
  | { k: "q"; id: string; label: string; hint?: string }
  | { k: "pair"; id: string; a: string; b: string }
  | { k: "list"; id: string; start: number; count: number }
  | { k: "scale"; id: string; label: string }
  | { k: "sign" };

export interface WSection {
  id: string;
  tag: string; // SECTION 01 / SEAL IT / COMMITMENT / BASELINE / DAY 01 — ACTION
  title: string;
  sub?: string;
  pledge?: string; // the italic vow copy on SEAL IT pages
  action?: string; // TODAY'S ACTION copy on challenge day pages
  note?: string;
  fields: WField[];
}

export interface Workbook {
  id: string;
  num: string;
  title: string;
  tagline: string;
  epigraph: string;
  startTitle: string;
  intro: string[];
  how: string[];
  quote: string;
  pdfLink: string;
  sections: WSection[];
}

export const COMPLETE_WORKBOOK_PDF = "/downloads/complete-reflection-workbook.pdf";

const SIGN_NOTE = "Move like you mean it.";

export const WORKBOOKS: Workbook[] = [
  {
    id: "connect-the-dots",
    num: "01",
    title: "CONNECT THE DOTS",
    tagline: "A guided reflection on timing, meaning, and what came next.",
    epigraph:
      "Some moments only explain themselves after you have lived far enough beyond them.",
    startTitle: "LOOK AGAIN",
    intro: [
      "Life rarely hands you the full meaning of a moment while you are standing inside it. You get the event first. The understanding may arrive years later.",
      "This workbook helps you revisit one experience without forcing a perfect explanation onto it. Separate what happened from what you assumed. Follow what came before and after. Notice the people, doors, delays, losses, and decisions attached to it.",
      "The goal is not to romanticize pain or call every inconvenience destiny. The goal is to give your own life enough attention to look twice.",
    ],
    how: [
      "Choose one moment with enough distance for you to see it honestly.",
      "Write the facts before writing the meaning.",
      "End with responsibility: what does this understanding ask you to do now?",
    ],
    quote: "THE MOMENT DIDN'T CHANGE. YOUR VIEW DID.",
    pdfLink: "/downloads/connect-the-dots.pdf",
    sections: [
      {
        id: "s1",
        tag: "SECTION 01",
        title: "CHOOSE THE MOMENT",
        sub: "Start with the moment that still has a pulse.",
        fields: [
          {
            k: "q",
            id: "what-happened",
            label: "WHAT HAPPENED?",
            hint: "Describe the event plainly. Who was there? Where were you? What changed?",
          },
          {
            k: "q",
            id: "why-matters",
            label: "WHY DOES THIS MOMENT STILL MATTER TO YOU?",
            hint: "What keeps bringing you back to it?",
          },
        ],
      },
      {
        id: "s2",
        tag: "SECTION 02",
        title: "FACTS VS. STORY",
        sub: "Clarity begins when you separate evidence from interpretation.",
        fields: [
          { k: "pair", id: "facts-story", a: "WHAT I KNOW HAPPENED", b: "THE STORY I TOLD MYSELF" },
          { k: "q", id: "interpretation-did", label: "WHAT DID YOUR FIRST INTERPRETATION MAKE YOU DO?" },
        ],
      },
      {
        id: "s3",
        tag: "SECTION 03",
        title: "WHAT IT MEANT THEN",
        sub: "Name the meaning you carried before hindsight arrived.",
        fields: [
          { k: "q", id: "said-about-you", label: "WHAT DID YOU BELIEVE THIS MOMENT SAID ABOUT YOU?" },
          { k: "q", id: "said-about-world", label: "WHAT DID YOU BELIEVE IT SAID ABOUT OTHER PEOPLE OR THE WORLD?" },
          { k: "q", id: "identity-grew", label: "WHAT DECISION, DEFENSE, OR IDENTITY GREW FROM THAT BELIEF?" },
        ],
      },
      {
        id: "s4",
        tag: "SECTION 04",
        title: "FOLLOW WHAT CAME NEXT",
        sub: "The lesson often lives in the sequence.",
        fields: [
          { k: "q", id: "before", label: "BEFORE", hint: "What was already happening before the moment?" },
          { k: "q", id: "the-moment", label: "THE MOMENT", hint: "What changed?" },
          { k: "q", id: "immediately-after", label: "IMMEDIATELY AFTER", hint: "What was the first consequence?" },
          { k: "q", id: "later", label: "LATER", hint: "What developed with time?" },
          { k: "q", id: "now", label: "NOW", hint: "What can you see from here?" },
        ],
      },
      {
        id: "s5",
        tag: "SECTION 05",
        title: "PEOPLE. DOORS. REDIRECTIONS.",
        sub: "Meaning often travels through what entered and what left.",
        fields: [
          { k: "q", id: "who-entered", label: "WHO ENTERED, LEFT, OR REVEALED THEMSELVES AFTERWARD?" },
          { k: "q", id: "door-closed", label: "WHAT DOOR CLOSED - AND WHAT DID THAT CLOSURE REDIRECT YOU TOWARD?" },
          { k: "q", id: "became-possible", label: "WHAT BECAME POSSIBLE THAT WOULD NOT HAVE BEEN POSSIBLE BEFORE?" },
        ],
      },
      {
        id: "s6",
        tag: "SECTION 06",
        title: "WHAT YOU CAN SEE NOW",
        sub: "Time gave you information the moment could not.",
        note: "You do not need a clean answer for everything.",
        fields: [
          { k: "q", id: "understand-now", label: "WHAT DO YOU UNDERSTAND NOW THAT YOU COULD NOT UNDERSTAND THEN?" },
          { k: "q", id: "theme-repeated", label: "WHAT THEME HAS REPEATED ELSEWHERE IN YOUR LIFE?" },
          { k: "q", id: "unresolved", label: "WHAT PART REMAINS UNRESOLVED OR UNKNOWABLE?" },
        ],
      },
      {
        id: "seal",
        tag: "SEAL IT",
        title: "THE NEXT MOVE",
        sub: "Meaning becomes useful when it changes how you move.",
        pledge:
          "I will not reduce this experience to what it cost me. I will carry the lesson, respect what remains unknown, and move with greater attention.",
        fields: [
          { k: "q", id: "not-random-because", label: "COMPLETE THE SENTENCE: IT WAS NOT RANDOM BECAUSE..." },
          { k: "q", id: "do-next", label: "WHAT DOES THIS UNDERSTANDING ASK YOU TO DO NEXT?" },
        ],
      },
      {
        id: "commit",
        tag: "COMMITMENT",
        title: "MAKE IT REAL",
        sub: "Give the decision enough structure to survive the feeling.",
        note: SIGN_NOTE,
        fields: [
          { k: "q", id: "first-action", label: "THE FIRST ACTION I WILL TAKE IS..." },
          { k: "q", id: "interfere", label: "WHAT COULD INTERFERE - AND HOW WILL I RESPOND?" },
          { k: "sign" },
        ],
      },
    ],
  },
  {
    id: "ten-things-going-right",
    num: "02",
    title: "TEN THINGS GOING RIGHT",
    tagline: "A perspective reset without pretending life is perfect.",
    epigraph:
      "Gratitude does not erase what hurts. It keeps what hurts from becoming the only thing you can see.",
    startTitle: "LOOK AT THE WHOLE LIFE",
    intro: [
      "When one part of life hurts, it can become the lens for everything. The problem gets all the light. What is working becomes background.",
      "This exercise asks for ten things that are right. They can be small. They can be unfinished. They can exist beside grief, pressure, anger, or uncertainty.",
      "The deeper work comes after the list. You will identify what you have normalized, what once felt impossible, and how gratitude can become stewardship instead of a temporary feeling.",
    ],
    how: [
      "Name what is true today. Avoid forcing positivity.",
      "Be specific: a person, ability, choice, door, lesson, or resource.",
      "For each blessing you notice, decide how you will honor it.",
    ],
    quote: "PERSPECTIVE IS REFUSING TO LET WHAT IS WRONG BECOME THE ONLY THING YOU CAN SEE.",
    pdfLink: "/downloads/ten-things-going-right.pdf",
    sections: [
      {
        id: "s1",
        tag: "SECTION 01",
        title: "THE FIRST FIVE",
        sub: "Give each answer enough attention to become real.",
        fields: [{ k: "list", id: "first-five", start: 1, count: 5 }],
      },
      {
        id: "s2",
        tag: "SECTION 02",
        title: "FIVE MORE",
        sub: "Give each answer enough attention to become real.",
        fields: [{ k: "list", id: "five-more", start: 6, count: 5 }],
      },
      {
        id: "s3",
        tag: "SECTION 03",
        title: "LOOK AGAIN",
        sub: "Some blessings become invisible because they stayed.",
        fields: [
          { k: "q", id: "prayed-for", label: "WHAT DID YOU ONCE PRAY FOR THAT NOW FEELS NORMAL?" },
          { k: "q", id: "holding-together", label: "WHO OR WHAT HAS BEEN QUIETLY HOLDING YOU TOGETHER?" },
          { k: "q", id: "no-longer-controls", label: "WHAT PROBLEM NO LONGER CONTROLS YOUR LIFE?" },
        ],
      },
      {
        id: "s4",
        tag: "SECTION 04",
        title: "GRATITUDE IS STEWARDSHIP",
        sub: "Appreciation should change how you care for what you have.",
        fields: [
          { k: "q", id: "better-protection", label: "WHAT DESERVES BETTER PROTECTION?" },
          { k: "q", id: "fuller-use", label: "WHAT GIFT, RELATIONSHIP, OR OPPORTUNITY DESERVES FULLER USE?" },
          { k: "q", id: "share", label: "WHAT CAN YOU SHARE BECAUSE YOU HAVE RECEIVED IT?" },
        ],
      },
      {
        id: "seal",
        tag: "SEAL IT",
        title: "NOTICE IT. HONOR IT.",
        sub: "Meaning becomes useful when it changes how you move.",
        pledge:
          "For the next seven days, I will notice what is working without denying what needs work. I will protect, use, and share what I have been trusted with.",
        fields: [
          { k: "q", id: "notice-daily", label: "THREE THINGS I WILL NOTICE EVERY DAY..." },
          { k: "q", id: "care-differently", label: "ONE THING I WILL CARE FOR DIFFERENTLY..." },
        ],
      },
      {
        id: "commit",
        tag: "COMMITMENT",
        title: "MAKE IT REAL",
        sub: "Give the decision enough structure to survive the feeling.",
        note: SIGN_NOTE,
        fields: [
          { k: "q", id: "gratitude-real", label: "ONE EXPRESSION OF GRATITUDE I WILL MAKE REAL..." },
          { k: "q", id: "changing-attention", label: "HOW WILL I KNOW THIS PRACTICE IS CHANGING MY ATTENTION?" },
          { k: "sign" },
        ],
      },
    ],
  },
  {
    id: "focus-eliminate",
    num: "03",
    title: "FOCUS + ELIMINATE",
    tagline: "An honest audit of skill, energy, attention, and direction.",
    epigraph:
      "A full life is not the same as a focused life. Decide what deserves more of you - and what does not.",
    startTitle: "YOUR ENERGY HAS A JOB",
    intro: [
      "Every responsibility is making a claim on your attention. Some belong to your purpose. Some belong to a season. Some belong to somebody else. Some should not belong to anyone anymore.",
      "The four-box framework is simple. The honesty required to use it is not. You may be skilled at work you have outgrown. You may love work you have not mastered. You may be carrying a role because people are used to you carrying it.",
      "This workbook turns the matrix into decisions. The goal is not a prettier list. The goal is a different calendar.",
    ],
    how: [
      "List real tasks, roles, projects, and obligations - not broad job titles.",
      "Judge energy and alignment separately from competence.",
      "Translate every quadrant into a thirty-day action.",
    ],
    quote: "KNOW WHAT DESERVES YOUR ENERGY - AND WHAT DOES NOT.",
    pdfLink: "/downloads/focus-and-eliminate.pdf",
    sections: [
      {
        id: "s1",
        tag: "SECTION 01",
        title: "PLACE THE WORK",
        sub: "Write each responsibility in the box where it honestly belongs.",
        fields: [
          { k: "q", id: "box-focus", label: "LIKE IT + GOOD AT IT", hint: "FOCUS" },
          { k: "q", id: "box-delegate", label: "DON'T LIKE IT + GOOD AT IT", hint: "DELEGATE" },
          { k: "q", id: "box-practice", label: "LIKE IT + NOT GOOD YET", hint: "PRACTICE" },
          { k: "q", id: "box-eliminate", label: "DON'T LIKE IT + NOT GOOD AT IT", hint: "ELIMINATE" },
        ],
      },
      {
        id: "s2",
        tag: "SECTION 02",
        title: "FOCUS",
        sub: "LIKE IT + GOOD AT IT — This is the work that can become mastery. Protect it from being crowded out by everything you can do but should not keep doing.",
        fields: [
          { k: "q", id: "focus-evidence", label: "WHAT WORK BELONGS HERE - AND WHAT EVIDENCE SUPPORTS THAT?" },
          { k: "q", id: "focus-best-hours", label: "WHAT KEEPS YOU FROM GIVING IT YOUR BEST HOURS?" },
          { k: "q", id: "focus-double-down", label: "WHAT WOULD DOUBLING DOWN LOOK LIKE FOR THE NEXT THIRTY DAYS?" },
        ],
      },
      {
        id: "s3",
        tag: "SECTION 03",
        title: "DELEGATE",
        sub: "DON'T LIKE IT + GOOD AT IT — Competence can become a cage. Being reliable at something does not mean you must carry it forever.",
        fields: [
          { k: "q", id: "delegate-still-doing", label: "WHAT ARE YOU STILL DOING BECAUSE PEOPLE KNOW YOU CAN?" },
          { k: "q", id: "delegate-who", label: "WHO COULD OWN THIS WITH TRAINING, TRUST, OR BETTER SYSTEMS?" },
          { k: "q", id: "delegate-document", label: "WHAT MUST YOU DOCUMENT BEFORE YOU HAND IT OVER?" },
        ],
      },
      {
        id: "s4",
        tag: "SECTION 04",
        title: "PRACTICE",
        sub: "LIKE IT + NOT GOOD YET — Interest deserves a real apprenticeship. Give the skill enough repetition to become evidence.",
        fields: [
          { k: "q", id: "practice-new-at", label: "WHAT ARE YOU WILLING TO BE VISIBLY NEW AT?" },
          { k: "q", id: "practice-skill", label: "WHAT SPECIFIC SKILL WOULD CREATE THE BIGGEST IMPROVEMENT?" },
          { k: "q", id: "practice-schedule", label: "WHAT PRACTICE SCHEDULE WILL YOU KEEP FOR THIRTY DAYS?" },
        ],
      },
      {
        id: "s5",
        tag: "SECTION 05",
        title: "ELIMINATE",
        sub: "DON'T LIKE IT + NOT GOOD AT IT — Some work needs a system. Some needs a boundary. Some needs to end. Elimination creates room for the life you keep saying matters.",
        fields: [
          { k: "q", id: "eliminate-carrying", label: "WHAT ARE YOU CARRYING FROM GUILT, FEAR, HABIT, OR IMAGE?" },
          { k: "q", id: "eliminate-cost", label: "WHAT IS THIS COSTING IN TIME, ENERGY, AND ATTENTION?" },
          { k: "q", id: "eliminate-stop-now", label: "WHAT CAN STOP NOW - WITHOUT ANOTHER MEETING ABOUT IT?" },
        ],
      },
      {
        id: "s6",
        tag: "SECTION 06",
        title: "THE COST OF THE CURRENT MIX",
        sub: "Your calendar is already voting for a future.",
        fields: [
          { k: "q", id: "best-energy", label: "WHAT RECEIVES YOUR BEST ENERGY NOW?" },
          { k: "q", id: "whats-left", label: "WHAT IMPORTANT WORK KEEPS RECEIVING WHAT IS LEFT?" },
          { k: "q", id: "whose-expectations", label: "WHOSE EXPECTATIONS ARE SHAPING YOUR WORKLOAD?" },
        ],
      },
      {
        id: "seal",
        tag: "SEAL IT",
        title: "THE NEXT THIRTY DAYS",
        sub: "Meaning becomes useful when it changes how you move.",
        pledge:
          "I will stop treating every ability like an assignment. I will give my best energy to the work that belongs to me and create a responsible exit from the work that does not.",
        fields: [
          { k: "q", id: "focus-more", label: "I WILL FOCUS MORE ON..." },
          { k: "q", id: "will-delegate", label: "I WILL DELEGATE..." },
        ],
      },
      {
        id: "commit",
        tag: "COMMITMENT",
        title: "MAKE IT REAL",
        sub: "Give the decision enough structure to survive the feeling.",
        note: SIGN_NOTE,
        fields: [
          { k: "q", id: "will-practice", label: "I WILL PRACTICE..." },
          { k: "q", id: "will-eliminate", label: "I WILL ELIMINATE..." },
          { k: "sign" },
        ],
      },
    ],
  },
  {
    id: "your-80-year-old-self",
    num: "04",
    title: "YOUR 80-YEAR-OLD SELF",
    tagline: "A decision guide for seeing today from the end of the road.",
    epigraph:
      "The older version of you has no interest in impressing this room. They care about the life these choices created.",
    startTitle: "BORROW A LONGER VIEW",
    intro: [
      "Some decisions feel impossible because the present is loud. Fear is close. Other people have opinions. Comfort has a persuasive voice.",
      "Your 80-year-old self sees the decision from farther away. They know which embarrassment faded, which risk became a doorway, which relationship deserved more care, and which delay quietly became a decision.",
      "You are not asking the future to predict your life. You are using distance to clarify your values.",
    ],
    how: [
      "Choose one real decision instead of answering in generalities.",
      "Separate a reversible mistake from a lifelong regret.",
      "Finish with an action small enough to begin within twenty-four hours.",
    ],
    quote: "THEY ARE EITHER THANKING YOU OR WAITING ON YOU.",
    pdfLink: "/downloads/your-80-year-old-self.pdf",
    sections: [
      {
        id: "s1",
        tag: "SECTION 01",
        title: "NAME THE DECISION",
        sub: "Make the choice specific enough to examine.",
        fields: [
          { k: "q", id: "decision", label: "WHAT DECISION ARE YOU FACING?" },
          { k: "q", id: "why-now", label: "WHY DOES IT MATTER NOW?" },
          { k: "q", id: "facts-unknown", label: "WHAT FACTS DO YOU KNOW - AND WHAT REMAINS UNKNOWN?" },
        ],
      },
      {
        id: "s2",
        tag: "SECTION 02",
        title: "FEAR IS INFORMATION",
        sub: "Listen to fear without letting it hold the pen.",
        fields: [
          { k: "q", id: "afraid", label: "WHAT ARE YOU AFRAID MIGHT HAPPEN?" },
          { k: "q", id: "fear-protect", label: "WHAT IS THIS FEAR TRYING TO PROTECT?" },
          { k: "q", id: "safety-smallness", label: "IS IT PROTECTING YOUR SAFETY - OR PROTECTING YOUR SMALLNESS?" },
        ],
      },
      {
        id: "s3",
        tag: "SECTION 03",
        title: "TWO FUTURES",
        sub: "Follow both choices farther than the immediate relief.",
        fields: [
          {
            k: "pair",
            id: "two-futures",
            a: "PATH A / I CHOOSE IT — ONE YEAR LATER",
            b: "PATH B / I AVOID IT — ONE YEAR LATER",
          },
        ],
      },
      {
        id: "s4",
        tag: "SECTION 04",
        title: "THE REGRET FILTER",
        sub: "Not every risk is wise. Not every comfort is peace.",
        fields: [
          { k: "q", id: "no-longer-matter", label: "AT 80, WHAT PART OF THIS WILL NO LONGER MATTER?" },
          { k: "q", id: "matter-more", label: "WHAT PART MAY MATTER EVEN MORE?" },
          { k: "q", id: "become-regret", label: "WHICH CHOICE IS MORE LIKELY TO BECOME A REGRET?" },
        ],
      },
      {
        id: "s5",
        tag: "SECTION 05",
        title: "A LETTER FROM THE FUTURE",
        sub: "Let wisdom speak in a voice that already loves you.",
        fields: [
          {
            k: "q",
            id: "letter",
            label: "WRITE FROM YOUR 80-YEAR-OLD SELF.",
            hint: "Begin with: “I remember when you were standing at this decision...” Tell the truth. Offer perspective. End with clear advice.",
          },
        ],
      },
      {
        id: "s6",
        tag: "SECTION 06",
        title: "THANKING YOU OR WAITING?",
        sub: "Make the future personal.",
        fields: [
          { k: "pair", id: "thank-wait", a: "THEY WOULD THANK ME FOR...", b: "THEY ARE WAITING ON ME TO..." },
          { k: "q", id: "value-revealed", label: "WHAT VALUE DO BOTH ANSWERS REVEAL?" },
        ],
      },
      {
        id: "seal",
        tag: "SEAL IT",
        title: "MAKE THE FUTURE REAL",
        sub: "Meaning becomes useful when it changes how you move.",
        pledge:
          "I will stop asking the future to rescue me from a decision that belongs to me now. I will choose with faith, evidence, values, and full responsibility.",
        fields: [
          { k: "q", id: "next-24", label: "IN THE NEXT 24 HOURS, I WILL..." },
          { k: "q", id: "next-30", label: "IN THE NEXT 30 DAYS, I WILL..." },
        ],
      },
      {
        id: "commit",
        tag: "COMMITMENT",
        title: "MAKE IT REAL",
        sub: "Give the decision enough structure to survive the feeling.",
        note: SIGN_NOTE,
        fields: [
          { k: "q", id: "within-year", label: "WITHIN ONE YEAR, I WILL HAVE..." },
          { k: "q", id: "who-supports", label: "WHO NEEDS TO KNOW OR SUPPORT THIS DECISION?" },
          { k: "sign" },
        ],
      },
    ],
  },
  {
    id: "seven-days-of-paying-attention",
    num: "05",
    title: "SEVEN DAYS OF PAYING ATTENTION",
    tagline: "Seven actions. Seven reflections. One more intentional week.",
    epigraph:
      "Attention without action becomes observation. Action without reflection becomes repetition. This challenge asks for both.",
    startTitle: "PAY ATTENTION. THEN PARTICIPATE.",
    intro: [
      "For seven days, you will notice something, revisit something, reach toward someone, make a decision, tell the truth, give value, and connect what the week revealed.",
      "Each day has two pages. The first prepares the action. The second helps you study what happened. Complete the action before writing the reflection.",
      "Do not hunt for signs or force meaning onto everything. Stay awake to your own life. Let attention sharpen your choices.",
    ],
    how: [
      "Complete one day at a time. Avoid reading ahead when possible.",
      "Make the action real enough to create evidence.",
      "Miss a day? Continue. The point is attention, not perfection.",
    ],
    quote: "PAY ATTENTION. THEN PARTICIPATE.",
    pdfLink: "/downloads/seven-days-of-paying-attention.pdf",
    sections: [
      {
        id: "baseline",
        tag: "BASELINE",
        title: "BEFORE THE WEEK BEGINS",
        sub: "Mark where you are today. You will return to this at the end.",
        fields: [
          { k: "scale", id: "clarity", label: "CLARITY" },
          { k: "scale", id: "presence", label: "PRESENCE" },
          { k: "scale", id: "courage", label: "COURAGE" },
          { k: "scale", id: "connection", label: "CONNECTION" },
          { k: "scale", id: "energy", label: "ENERGY" },
          { k: "q", id: "hope-notice", label: "WHAT DO YOU HOPE THIS WEEK HELPS YOU NOTICE?" },
          { k: "q", id: "easiest-ignore", label: "WHAT PART OF YOUR LIFE FEELS EASIEST TO IGNORE?" },
        ],
      },
      {
        id: "d1a",
        tag: "DAY 01 / ACTION",
        title: "NOTICE",
        sub: "Slow down long enough to see what keeps repeating.",
        action:
          "Write down three things that repeat today: a thought, phrase, name, feeling, number, opportunity, conflict, or idea.",
        note: "BEFORE YOU MOVE — I made the action specific. I chose when I will do it.",
        fields: [
          { k: "q", id: "asking-attention", label: "WHAT HAS BEEN ASKING FOR YOUR ATTENTION LATELY?" },
          { k: "q", id: "too-rushed", label: "WHERE ARE YOU USUALLY TOO RUSHED TO NOTICE?" },
        ],
      },
      {
        id: "d1r",
        tag: "DAY 01 / REFLECTION",
        title: "WHAT NOTICE REVEALED",
        sub: "Do not grade the day. Study it.",
        fields: [
          { k: "q", id: "what-repeated", label: "WHAT REPEATED?" },
          { k: "q", id: "showing-you", label: "WHAT MIGHT IT BE SHOWING YOU?" },
          { k: "q", id: "closer-tomorrow", label: "WHAT WILL YOU PAY CLOSER ATTENTION TO TOMORROW?" },
          { k: "q", id: "carry-forward-1", label: "ONE SENTENCE TO CARRY FORWARD" },
        ],
      },
      {
        id: "d2a",
        tag: "DAY 02 / ACTION",
        title: "REVISIT",
        sub: "Return to one old moment with new eyes.",
        action:
          "Choose an experience you once called random, unfair, inconvenient, or meaningless. Revisit it without changing the facts.",
        note: "BEFORE YOU MOVE — I made the action specific. I chose when I will do it.",
        fields: [
          { k: "q", id: "unfinished-moment", label: "WHICH MOMENT STILL FEELS UNFINISHED?" },
          { k: "q", id: "meant-at-time", label: "WHAT DID YOU BELIEVE IT MEANT AT THE TIME?" },
        ],
      },
      {
        id: "d2r",
        tag: "DAY 02 / REFLECTION",
        title: "WHAT REVISIT REVEALED",
        sub: "Do not grade the day. Study it.",
        fields: [
          { k: "q", id: "understand-now", label: "WHAT CAN YOU UNDERSTAND NOW?" },
          { k: "q", id: "came-from-it", label: "WHAT CAME FROM IT THAT YOU COULD NOT SEE THEN?" },
          { k: "q", id: "allow-unresolved", label: "WHAT REMAINS UNRESOLVED - AND CAN YOU ALLOW THAT?" },
          { k: "q", id: "carry-forward-2", label: "ONE SENTENCE TO CARRY FORWARD" },
        ],
      },
      {
        id: "d3a",
        tag: "DAY 03 / ACTION",
        title: "REACH OUT",
        sub: "Honor the person who came to mind.",
        action:
          "Contact someone who has been on your mind. Do not over-script it. Send the message, make the call, or write the note.",
        note: "BEFORE YOU MOVE — I made the action specific. I chose when I will do it.",
        fields: [
          { k: "q", id: "who-came-to-mind", label: "WHO CAME TO MIND?" },
          { k: "q", id: "delayed-saying", label: "WHAT HAVE YOU DELAYED SAYING?" },
        ],
      },
      {
        id: "d3r",
        tag: "DAY 03 / REFLECTION",
        title: "WHAT REACH OUT REVEALED",
        sub: "Do not grade the day. Study it.",
        fields: [
          { k: "q", id: "what-did-you-do", label: "WHAT DID YOU DO?" },
          { k: "q", id: "how-responded", label: "HOW DID THEY RESPOND - IF THEY RESPONDED?" },
          { k: "q", id: "revealed-in-you", label: "WHAT DID THE ACT OF REACHING OUT REVEAL IN YOU?" },
          { k: "q", id: "carry-forward-3", label: "ONE SENTENCE TO CARRY FORWARD" },
        ],
      },
      {
        id: "d4a",
        tag: "DAY 04 / ACTION",
        title: "DECIDE",
        sub: "Make today answer to tomorrow.",
        action:
          "Choose one short-term decision that directly supports a long-term goal. Put it on the calendar and complete it.",
        note: "BEFORE YOU MOVE — I made the action specific. I chose when I will do it.",
        fields: [
          { k: "q", id: "goal-evidence", label: "WHICH LONG-TERM GOAL NEEDS EVIDENCE?" },
          { k: "q", id: "distraction", label: "WHAT DISTRACTION KEEPS COMPETING WITH IT?" },
        ],
      },
      {
        id: "d4r",
        tag: "DAY 04 / REFLECTION",
        title: "WHAT DECIDE REVEALED",
        sub: "Do not grade the day. Study it.",
        fields: [
          { k: "q", id: "decision-made", label: "WHAT DECISION DID YOU MAKE?" },
          { k: "q", id: "cost-in-moment", label: "WHAT DID IT COST IN THE MOMENT?" },
          { k: "q", id: "serve-future", label: "HOW DID IT SERVE THE FUTURE YOU SAY YOU WANT?" },
          { k: "q", id: "carry-forward-4", label: "ONE SENTENCE TO CARRY FORWARD" },
        ],
      },
      {
        id: "d5a",
        tag: "DAY 05 / ACTION",
        title: "SAY IT",
        sub: "Move toward the honest conversation.",
        action:
          "Have one conversation you have been avoiding. Be specific. Say what happened, the impact, and what you need. Then listen.",
        note: "BEFORE YOU MOVE — I made the action specific. I chose when I will do it.",
        fields: [
          { k: "q", id: "truth-softened", label: "WHAT TRUTH HAS BEEN SOFTENED OR DELAYED?" },
          { k: "q", id: "care-sound-like", label: "WHAT WOULD CARE SOUND LIKE WITHOUT HIDING?" },
        ],
      },
      {
        id: "d5r",
        tag: "DAY 05 / REFLECTION",
        title: "WHAT SAY IT REVEALED",
        sub: "Do not grade the day. Study it.",
        fields: [
          { k: "q", id: "what-said", label: "WHAT DID YOU SAY?" },
          { k: "q", id: "what-heard", label: "WHAT DID YOU HEAR THAT YOU COULD NOT HEAR BEFORE?" },
          { k: "q", id: "happen-next", label: "WHAT NEEDS TO HAPPEN NEXT?" },
          { k: "q", id: "carry-forward-5", label: "ONE SENTENCE TO CARRY FORWARD" },
        ],
      },
      {
        id: "d6a",
        tag: "DAY 06 / ACTION",
        title: "GIVE",
        sub: "Leave someone or somewhere better than you found it.",
        action:
          "Add value without keeping score. Share time, attention, access, encouragement, information, or practical help.",
        note: "BEFORE YOU MOVE — I made the action specific. I chose when I will do it.",
        fields: [
          { k: "q", id: "real-difference", label: "WHERE CAN YOU MAKE A REAL DIFFERENCE TODAY?" },
          { k: "q", id: "without-performing", label: "WHAT CAN YOU GIVE WITHOUT PERFORMING GENEROSITY?" },
        ],
      },
      {
        id: "d6r",
        tag: "DAY 06 / REFLECTION",
        title: "WHAT GIVE REVEALED",
        sub: "Do not grade the day. Study it.",
        fields: [
          { k: "q", id: "what-gave", label: "WHAT DID YOU GIVE?" },
          { k: "q", id: "what-changed", label: "WHAT CHANGED BECAUSE YOU ACTED?" },
          { k: "q", id: "abundance", label: "WHAT DID GIVING TEACH YOU ABOUT ABUNDANCE?" },
          { k: "q", id: "carry-forward-6", label: "ONE SENTENCE TO CARRY FORWARD" },
        ],
      },
      {
        id: "d7a",
        tag: "DAY 07 / ACTION",
        title: "CONNECT",
        sub: "Review the week and choose what continues.",
        action:
          "Read every answer from the previous six days. Circle what repeated. Underline what surprised you. Choose one lesson to live.",
        note: "BEFORE YOU MOVE — I made the action specific. I chose when I will do it.",
        fields: [
          { k: "q", id: "expecting-learn", label: "WHAT ARE YOU EXPECTING TO LEARN FROM THE REVIEW?" },
          { k: "q", id: "tempted-rush", label: "WHERE MIGHT YOU BE TEMPTED TO RUSH PAST THE LESSON?" },
        ],
      },
      {
        id: "d7r",
        tag: "DAY 07 / REFLECTION",
        title: "WHAT CONNECT REVEALED",
        sub: "Do not grade the day. Study it.",
        fields: [
          { k: "q", id: "repeated-week", label: "WHAT REPEATED ACROSS THE WEEK?" },
          { k: "q", id: "surprised-challenged", label: "WHAT SURPRISED OR CHALLENGED YOU?" },
          { k: "q", id: "will-carry", label: "WHAT WILL YOU CARRY FORWARD?" },
          { k: "q", id: "carry-forward-7", label: "ONE SENTENCE TO CARRY FORWARD" },
        ],
      },
      {
        id: "integration",
        tag: "INTEGRATION",
        title: "WHAT THE WEEK REVEALED",
        sub: "Read your answers before completing this page.",
        fields: [
          { k: "q", id: "repeated-multiple", label: "WHAT REPEATED ACROSS MULTIPLE DAYS?" },
          { k: "q", id: "changed-you", label: "WHAT SURPRISED, CHALLENGED, OR CHANGED YOU?" },
          { k: "q", id: "harder-ignore", label: "WHAT TRUTH BECAME HARDER TO IGNORE?" },
        ],
      },
      {
        id: "seal",
        tag: "SEAL IT",
        title: "KEEP PAYING ATTENTION",
        sub: "Meaning becomes useful when it changes how you move.",
        pledge:
          "I will not wait for life to become louder before I listen. I will notice what repeats, respond to what matters, and participate in the future I keep asking for.",
        fields: [
          { k: "q", id: "continue-daily", label: "THE PRACTICE I WILL CONTINUE DAILY..." },
          { k: "q", id: "complete-conversation", label: "THE CONVERSATION OR DECISION I WILL COMPLETE..." },
        ],
      },
      {
        id: "commit",
        tag: "COMMITMENT",
        title: "MAKE IT REAL",
        sub: "Give the decision enough structure to survive the feeling.",
        note: SIGN_NOTE,
        fields: [
          { k: "q", id: "lesson-thirty", label: "THE LESSON I WILL CARRY INTO THE NEXT THIRTY DAYS..." },
          { k: "q", id: "return-attention", label: "HOW WILL I RETURN WHEN I LOSE ATTENTION?" },
          { k: "sign" },
        ],
      },
    ],
  },
];

/** True when a link is a real URL rather than a *_HERE placeholder. */
export function isLiveLink(url: string | null | undefined): boolean {
  return !!url && !url.includes("_HERE");
}
