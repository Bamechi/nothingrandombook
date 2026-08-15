/**
 * NOTHING IS RANDOM — content source of truth.
 * All book copy is verbatim from NoThing_Is_Random_Phaidon_Layout_Draft_v29.pdf.
 * Do not edit entry copy without a new approved draft.
 */

export type EntryBlock =
  | { kind: "quote"; text: string; attribution?: string }
  | { kind: "verse"; text: string } // italic stanza without quotation marks
  | { kind: "p"; text: string }
  | { kind: "strong"; text: string }
  | { kind: "kicker"; text: string } // small caps lead-in like "KNOW THIS:"
  | { kind: "display"; text: string } // large display line inside body flow
  | { kind: "rich"; parts: { text: string; red?: boolean; bold?: boolean }[] }
  | {
      kind: "matrix"; // the Focus + Eliminate quadrant from the book
      cells: { tag: string; word: string; desc: string; tone: "green" | "gold" | "red" }[];
    }
  | {
      kind: "triangle"; // the Fast. Cheap. Quality. three-point system
      points: { word: string; tone: "red" | "black" | "gold" }[];
      notes: string[];
      center: { black: string; red: string };
    }
  | { kind: "strikeplay"; word: string; overlay: string }; // struck word with a scrawled replacement

export interface Entry {
  n: number;
  title: string | null; // aphorism pages carry no title
  displayTitle?: { black?: string; red?: string }; // two-tone headline treatment
  titleParts?: { text: string; red?: boolean; strike?: boolean }[]; // per-word headline treatment
  aphorism?: boolean;
  blocks: EntryBlock[];
}

export const ENTRIES: Entry[] = [
  {
    n: 1,
    title: "HIDDEN PATTERN",
    blocks: [
      {
        kind: "quote",
        text: "The only things we call random are the things we haven’t discovered a pattern for yet. The pattern exists. We just haven’t perceived it. It’s outside of our realm of intelligence.",
        attribution: "Robert Grant",
      },
      { kind: "p", text: "Robert Grant put language to something my spirit already recognized." },
      {
        kind: "p",
        text: "To me, NoThing Is Random is not just an idea. It is evidence that God exists. God leaves a signature on life for us to interpret. In mathematics. In codes. In nature. In timing. In music. In geometry. In the body. In the way the same lesson keeps returning until it is finally understood.",
      },
      { kind: "p", text: "A signature is not always loud." },
      {
        kind: "p",
        text: "Sometimes it is hidden in the painting. Sometimes it only appears when you step back from the canvas. Sometimes the moment you become willing to see, the brushstrokes begin to connect.",
      },
      { kind: "p", text: "That is how life speaks." },
      { kind: "p", text: "This book is an invitation to listen." },
    ],
  },
  {
    n: 2,
    title: "PLANT THE SEED",
    blocks: [
      {
        kind: "p",
        text: "A seed does not become a flower the moment it touches the dirt. It needs darkness. It needs pressure. It needs water. It needs time. It needs the right conditions.",
      },
      {
        kind: "p",
        text: "People are the same way. You can give someone truth and they may not hear it. You can give someone wisdom and they may reject it. You can give someone a warning, a lesson, a word, a perspective, and it may look like nothing happened.",
      },
      {
        kind: "p",
        text: "Plant it anyway. Because you never know what season their soul is in. You never know when life will water something you said years ago. The thing a person ignores today can become the thing that saves them tomorrow. Plant the seed.",
      },
    ],
  },
  {
    n: 3,
    title: "ALIGNMENT MULTIPLIES",
    blocks: [
      { kind: "strong", text: "Connection is chemistry." },
      {
        kind: "p",
        text: "The right alignment can turn two separate things into something neither could become alone.",
      },
      { kind: "p", text: "That is why alignment matters." },
      {
        kind: "p",
        text: "Because not every connection multiplies you. Some subtract your peace. Some divide your attention. Some reduce your confidence. Some make you smaller than you were before they arrived.",
      },
      { kind: "strong", text: "But the right alignment compounds." },
      {
        kind: "p",
        text: "It turns two people into a family. A thought into a movement. A conversation into a calling. A moment into a memory.",
      },
      {
        kind: "strong",
        text: "One plus one equals two. With the right alignment it equals three.",
      },
    ],
  },
  {
    n: 4,
    title: "LIVE IN COLOR",
    blocks: [
      { kind: "p", text: "Do you live in the gray?" },
      { kind: "p", text: "Not fully alive. Same routine. Same thoughts. Same complaints." },
      { kind: "kicker", text: "KNOW THIS:" },
      {
        kind: "p",
        text: "Any moment can be your last. The only thing promised is death, and only God knows when that time will come for you.",
      },
      {
        kind: "p",
        text: "Still, people move through life like they have unlimited time to become who they were created to be. You don’t.",
      },
      { kind: "kicker", text: "KNOW THIS:" },
      {
        kind: "p",
        text: "You are a uniquely talented individual. There has never been anyone like you in the history of the world, and there never will be anyone like you in the history of the universe ever again.",
      },
      { kind: "display", text: "LIVE YOUR PURPOSE. MAKE YOUR MARK. ADD COLOR." },
    ],
  },
  {
    n: 5,
    title: null,
    aphorism: true,
    blocks: [
      { kind: "display", text: "EVERY THOUGHT LEAVES A MARK. MAKE YOURS WORTH CARRYING." },
    ],
  },
  {
    n: 6,
    title: "TELL THE TRUTH",
    blocks: [
      {
        kind: "p",
        text: "I went to a rigorous high school where getting into a top university came with real pressure.",
      },
      {
        kind: "p",
        text: "I remember sitting in front of my college application’s personal statements with writer’s block, trying to figure out what an admissions officer wanted to hear.",
      },
      { kind: "p", text: "Every rewrite sounded less like me." },
      {
        kind: "p",
        text: "I finally asked my college counselor what I should say to give myself the best chance of acceptance.",
      },
      {
        kind: "p",
        text: "She told me to tell the truth. Write about something I cared about. Show them who I actually was. Because if a school rejected the real me, why would I want to go there?",
      },
      {
        kind: "p",
        text: "That advice followed me far beyond school. Into rooms. Relationships. Work. Life.",
      },
      {
        kind: "p",
        text: "I would rather be rejected as myself than accepted as someone I have to keep pretending to be.",
      },
      {
        kind: "p",
        text: "Always tell your truth. Free yourself from the performance of being chosen.",
      },
    ],
  },
  {
    n: 7,
    title: null,
    aphorism: true,
    blocks: [
      {
        kind: "display",
        text: "A PERSON WHO CAN’T SEE THEIR PATTERNS IS DESTINED TO REPEAT THEM.",
      },
    ],
  },
  {
    n: 8,
    title: "THE LESSON WILL NOT RETIRE",
    displayTitle: { black: "THE LESSON WILL NOT", red: "RETIRE" },
    blocks: [
      {
        kind: "p",
        text: "At some point, you have to stop asking, “Why does this keep happening to me?” and start asking, “What is life still trying to teach me?”",
      },
      { kind: "p", text: "Life has a way of repeating what we refuse to understand." },
      {
        kind: "p",
        text: "The names change.\nThe rooms change.\nThe seasons change.\nBut the pattern keeps its shape.",
      },
      {
        kind: "p",
        text: "Blame protects the old version of you. Decoding asks for a new one.",
      },
      {
        kind: "p",
        text: "The lesson keeps circling the unfinished place inside you — the place that still needs truth, discipline, healing, or courage.",
      },
      { kind: "p", text: "The lesson will not retire just because you are tired." },
    ],
  },
  {
    n: 9,
    title: "WHY PANIC",
    aphorism: true,
    blocks: [
      { kind: "display", text: "WHY PANIC" },
      { kind: "quote", text: "if this is how God planned it?", attribution: "CyHi the Prynce" },
    ],
  },
  {
    n: 10,
    title: "HIGHER POWER",
    blocks: [
      {
        kind: "p",
        text: "A higher power gives your life a ceiling above your ego and a floor beneath your fear.",
      },
      {
        kind: "p",
        text: "It reminds you that you are powerful, but you are not the entire power.",
      },
      {
        kind: "p",
        text: "It reminds you that you have responsibility, but you are not alone in the design.",
      },
      {
        kind: "p",
        text: "It reminds you that when your plan breaks, your life may still be held by something greater than your plan.",
      },
      {
        kind: "rich",
        parts: [
          { text: "A " },
          { text: "person", red: true },
          { text: " without a higher power can become addicted to control." },
        ],
      },
      {
        kind: "rich",
        parts: [{ text: "And control is a fragile " }, { text: "god.", red: true }],
      },
    ],
  },
  {
    n: 11,
    title: "FEEL SOMETHING",
    blocks: [
      {
        kind: "p",
        text: "Put me in a room with art on the walls, music in the air, beautiful design, strange architecture, or anything made with intention, and I want to know what it makes you feel.",
      },
      {
        kind: "p",
        text: "You don’t have to like it.\nYou don’t have to understand it.\nYou don’t have to say something deep.\nYou don’t even have to be positive.",
      },
      { kind: "p", text: "I just need to know there’s something in you that responds." },
      {
        kind: "p",
        text: "Because when a person can stand in front of art, hear a song, feel a space, or experience something creative and have no interaction with it at all, that tells me something.",
      },
      {
        kind: "p",
        text: "Passion is a luxury. Perspective is a luxury. Having enough life inside of you to feel, question, dislike, love, or be moved by something is everything.",
      },
      { kind: "p", text: "So when I ask, “What do you think?” I’m really asking:" },
      { kind: "p", text: "Are you here?\nDid it reach you?\nDid it wake anything up?" },
      { kind: "p", text: "The world is always speaking." },
      { kind: "strong", text: "I trust the people who still know how to feel." },
    ],
  },
  {
    n: 12,
    title: "FORCE VS. FLOW",
    blocks: [
      { kind: "p", text: "Force can work for a moment." },
      {
        kind: "p",
        text: "You can stretch, push, grind, and muscle your way through a season. But over time, force drains you.",
      },
      { kind: "p", text: "Flow has a quieter power." },
      {
        kind: "p",
        text: "Flow is movement with understanding. It is effort without panic. Discipline without resistance. Direction without needing to dominate every detail.",
      },
      { kind: "strong", text: "Don’t fight the current just to prove you can swim." },
      { kind: "strong", text: "Study the water." },
      {
        kind: "p",
        text: "Feel where life is pulling. Notice what keeps opening. Notice what keeps closing. Notice where your spirit feels resistance and where your work begins to breathe.",
      },
      {
        kind: "p",
        text: "Force asks, “How can I control this?”\nFlow asks, “What is life trying to show me?”",
      },
      {
        kind: "p",
        text: "The highest level is knowing when to push, when to pause, and which doors were already waiting for you to walk through.",
      },
    ],
  },
  {
    n: 13,
    title: "LIFE IS TESTING YOU",
    blocks: [
      {
        kind: "verse",
        text: "God exists, and is omnipotent;\nGod exists, and is benevolent;\n... Yet evil exists...",
      },
      {
        kind: "p",
        text: "The book of Job is what happens when life stops making sense and pain still asks you to keep your faith.",
      },
      {
        kind: "p",
        text: "Sometimes the test is not whether all is restored. Sometimes the test is whether suffering can touch your life without making you betray God or yourself.",
      },
    ],
  },
  {
    n: 14,
    title: "THROUGH THE WIRE",
    blocks: [
      {
        kind: "quote",
        text: "Don’t rush in places where you need to take your time. Take your time in places you should rush.",
      },
      { kind: "p", text: "I crashed my car in high school, running late for class one morning." },
      { kind: "p", text: "My car was totaled.\nThe airbags came out.\nEverything stopped." },
      { kind: "p", text: "Except the music." },
      { kind: "p", text: "The CD player was still going." },
      {
        kind: "p",
        text: "I was listening to Kanye West’s The College Dropout, and right after the crash, the line came on: “Thank God I ain’t too cool for the safe-belt.”",
      },
      {
        kind: "p",
        text: "A car accident. Airbags out. Music still playing. And the exact line is about a seatbelt saving a life.",
      },
      { kind: "p", text: "To me, it felt like God leaving a gentle note and reminder:" },
      { kind: "p", text: "I’m here.\nI’m listening.\nKeep going." },
      { kind: "strong", text: "Even in the crash, feel God’s hand on the wheel." },
    ],
  },
  {
    n: 15,
    title: "REMOVE THE EGO",
    blocks: [
      {
        kind: "p",
        text: "When you build your identity around anything that can collapse, you collapse with it.",
      },
      {
        kind: "p",
        text: "And if your whole identity was built on material things, then the moment they fall, you fall too.",
      },
      { kind: "p", text: "That is the trap of ego." },
      { kind: "strong", text: "Ego makes you believe you are what you have." },
      {
        kind: "p",
        text: "When you remove the ego, you can finally connect to life without needing every moment to validate you.",
      },
      { kind: "p", text: "You can lose something without losing yourself." },
      { kind: "p", text: "That is real identity." },
      { kind: "p", text: "The part of you that remains when everything temporary changes." },
    ],
  },
  {
    n: 16,
    title: "LOWER SELF VS HIGHER SELF",
    displayTitle: { black: "LOWER SELF VS", red: "HIGHER SELF" },
    blocks: [
      {
        kind: "p",
        text: "The lower self wants to protect the image. The higher self wants to protect the purpose.",
      },
      {
        kind: "p",
        text: "Your ego wants to win the argument. Your higher self wants to understand the truth.",
      },
      {
        kind: "p",
        text: "Your lower self wants to defend who you have been. Your higher self wants to build who you are becoming.",
      },
      {
        kind: "strong",
        text: "Your ego lives in comparison. Your higher self lives in alignment.",
      },
    ],
  },
  {
    n: 17,
    title: "THE MIRROR TALK",
    blocks: [
      {
        kind: "quote",
        text: "Talk to the person in the mirror like he’s running your life. Because he is.",
        attribution: "Keenan Beasley",
      },
      {
        kind: "p",
        text: "No one is responsible for your income but you. No one is responsible for your body but you. No one is responsible for your peace but you. No one is responsible for your future but you.",
      },
      {
        kind: "p",
        text: "When you’re frustrated with where you are, you’re not frustrated with the world. You’re frustrated with your reflection. In the shadows, in the darkness, with yourself: that is where the real conversation happens.",
      },
    ],
  },
  {
    n: 18,
    title: "ADVENTURE + COMFORT",
    blocks: [
      {
        kind: "p",
        text: "You cannot have the adventure and the comfort. There is a price to pay for pursuing purpose.",
      },
    ],
  },
  {
    n: 19,
    title: "FEAR OR GROWTH",
    blocks: [
      {
        kind: "p",
        text: "Every decision usually points in one of two directions: fear or growth.",
      },
      { kind: "p", text: "Fear makes you shrink. Growth makes you stretch." },
      {
        kind: "p",
        text: "Fear is not always wrong. Sometimes fear is protection. But sometimes fear is just a locked door with no real lock on it.",
      },
      { kind: "p", text: "That is why you have to ask:" },
      {
        kind: "rich",
        parts: [
          {
            text: "Is this fear keeping me safe? Or is this fear keeping me small?",
            red: true,
            bold: true,
          },
        ],
      },
      {
        kind: "p",
        text: "Love, passion, and purpose usually require movement. They ask you to risk being seen. They ask you to tell the truth. They ask you to step into something before you have all the proof.",
      },
      { kind: "strong", text: "A life with no risk is a life with no growth." },
    ],
  },
  {
    n: 20,
    title: "LOVE THE FEELING",
    blocks: [
      {
        kind: "rich",
        parts: [
          {
            text: "Someone once asked me how I speak on stage without getting nervous. I told them, ",
          },
          { text: "“I DO get that feeling... but I LOVE that feeling.”", bold: true },
        ],
      },
      {
        kind: "p",
        text: "Most people live their whole lives avoiding the feelings that make them feel alive. The pressure. The challenge. The risk of being seen. Speaking on stage. Getting on camera. Starting the brand. Writing the book. Putting something into the world that people can judge.",
      },
      {
        kind: "p",
        text: "But dreamers, builders, artists, entrepreneurs, and people with the luxury of passion use that energy and alchemize it to serve their purpose. Let it sharpen you. Let it wake you up. Let it remind you that you are doing something that requires more from you than the life you already know.",
      },
    ],
  },
  {
    n: 21,
    title: "THREE QUESTIONS",
    blocks: [
      { kind: "display", text: "DO I BELIEVE IN GOD?" },
      { kind: "display", text: "DO I BELIEVE IN GOD IN ME?" },
      { kind: "display", text: "DO I BELIEVE IN GOD IN THEM?" },
      {
        kind: "p",
        text: "In any challenging situation, you can ask yourself those three questions.",
      },
      {
        kind: "p",
        text: "That changes the way you respond. If you believe in a higher power, and that power is present in you and in the room, you cannot move like God is absent. You cannot act ungodly. You cannot move like you are powerless.",
      },
      { kind: "p", text: "If the answer is yes to all three questions, move like it." },
    ],
  },
  {
    n: 22,
    title: "F*CK BEING HUMBLE",
    blocks: [
      { kind: "display", text: "F*CK BEING HUMBLE." },
      {
        kind: "rich",
        parts: [
          { text: "Be kind. Be gracious. Give credit. Show " },
          { text: "respect.", bold: true },
          { text: " Honor the people who helped you." },
        ],
      },
      { kind: "p", text: "But do not confuse humility with shrinking." },
      {
        kind: "p",
        text: "Too many people use “be humble” as a way to tell gifted people to make themselves smaller.",
      },
      { kind: "p", text: "I do not believe in that." },
      { kind: "p", text: "You can know your worth without disrespecting anyone." },
      {
        kind: "p",
        text: "You can be proud of your path without looking down on someone else’s.",
      },
      { kind: "p", text: "You can acknowledge your greatness and still be a student." },
      { kind: "p", text: "Real humility is not pretending you are less than what you are." },
      {
        kind: "rich",
        parts: [
          { text: "Real humility is knowing your gift came from " },
          { text: "God,", bold: true },
          { text: " and still doing the work to honor it." },
        ],
      },
      {
        kind: "p",
        text: "So no, do not be humble in a way that makes you deny your power.",
      },
      { kind: "p", text: "Be grateful." },
      { kind: "strong", text: "But never shrink." },
    ],
  },
  {
    n: 23,
    title: "TRAINED BY DOING",
    blocks: [
      {
        kind: "p",
        text: "You're not born confident. You're not born insecure. You're trained into one or the other by doing “the thing.” Failing at “the thing.” Doing it again. Failing better. Doing it again.",
      },
      { kind: "p", text: "Until one day, you're no longer afraid. You're just doing it." },
      { kind: "strong", text: "That's confidence. Repetition with attention." },
    ],
  },
  {
    n: 24,
    title: "NAME IT FIRST",
    blocks: [
      {
        kind: "p",
        text: "In 8 Mile, Eminem wins his last battle by naming everything his opponent could have used against him before they get the chance to.",
      },
      {
        kind: "p",
        text: "The flaws. The shame. The failures. The parts of his story meant to embarrass him.",
      },
      {
        kind: "p",
        text: "Once he owns it, they have nothing left. That is invincibility through vulnerability.",
      },
      {
        kind: "p",
        text: "I have failed. I have quit. I have started things I didn’t finish. I have been wrong. I have had to rebuild versions of myself I once thought were final.",
      },
      { kind: "p", text: "So what? That is proof I lived." },
      {
        kind: "p",
        text: "The moment you fear your own truth, someone else can use it to control you.",
      },
      { kind: "p", text: "But when you own your story, it stops being a weapon against you." },
      {
        kind: "p",
        text: "People can judge it. They can misunderstand it. But they can’t define you with something you have already accepted, learned from, and turned into power.",
      },
      {
        kind: "p",
        text: "That is freedom. Owning that you are human, and still standing there with your head up.",
      },
    ],
  },
  {
    n: 25,
    title: "MEASURE IT",
    blocks: [
      {
        kind: "p",
        text: "You can't manage what you don't measure. You can't grow what you're not tracking.",
      },
      { kind: "p", text: "You cannot improve what you refuse to look at." },
      {
        kind: "rich",
        parts: [
          { text: "Your " },
          { text: "money.", red: true, bold: true },
          {
            text: " Your time. Your energy. Your health. Your habits. Your relationships. Your progress.",
          },
        ],
      },
      { kind: "p", text: "If you are not measuring it, you are guessing." },
      { kind: "p", text: "And guessing is expensive." },
      {
        kind: "p",
        text: "If what you're doing is working, then double down. If it isn't, then find a solution and make a change. Then measure again and repeat the process.",
      },
      { kind: "p", text: "Again.\nAnd Again." },
    ],
  },
  {
    n: 26,
    title: "GENIUS",
    blocks: [
      {
        kind: "p",
        text: "The word genius comes from the Latin genius — a guardian spirit believed to watch over a person from birth. In other words, the gift was never just yours. It came from God.",
      },
      {
        kind: "p",
        text: "During the Italian Renaissance, the idea of the artist changed. Before then, many artists were seen more like craftsmen. Skilled, necessary, valuable — but still vessels. The greatness was understood as something coming through them. Then the artist became viewed more like a divine creator. The gift and the person started blending together.",
      },
      { kind: "p", text: "Fast-forward to today." },
      {
        kind: "p",
        text: "Athletes, musicians, actors, influencers, and creators walk into arenas, stadiums, rooms, and timelines where people treat their talent like something holy. The lights go dark. The crowd screams. The face goes on the giant screen. People cry, cheer, worship the moment, and sometimes worship the person inside it.",
      },
      {
        kind: "p",
        text: "I empathize with what that can do to somebody. It takes perspective to remember you’re still a vessel.",
      },
      {
        kind: "p",
        text: "Appreciate the genius. Use the gift like an assignment. Carry it like a responsibility. Remember Who gave it to you. And the work is how you give it back.",
      },
    ],
  },
  {
    n: 27,
    title: "DON’T THROW AWAY THE LESSON",
    blocks: [
      {
        kind: "p",
        text: "Sometimes people reject the message because they don’t like the messenger. They don’t like the tone. They don’t like the face. They don’t like the delivery. They don’t like one mistake the person made. So they throw away the whole lesson.",
      },
      { kind: "p", text: "That is emotional immaturity." },
      {
        kind: "p",
        text: "You don’t have to like everyone you learn from. You don’t have to agree with everything a person says to recognize the one thing they said that was true. You don’t have to make someone your leader to receive a lesson from their life.",
      },
      {
        kind: "p",
        text: "Take the truth. If you need every message to come from a perfect messenger, you will miss a lot of wisdom.",
      },
    ],
  },
  {
    n: 28,
    title: "YOU KNOW",
    blocks: [
      { kind: "p", text: "You know when you’re moving below your standard." },
      {
        kind: "p",
        text: "You know when you’re gossiping. You know when you’re making excuses. You know when you’re being lazy with your gift. You know when you’re choosing comfort over purpose.",
      },
      { kind: "p", text: "A higher level of you already knows better." },
      {
        kind: "p",
        text: "19Keys talks about having conversations with his future self — because that’s the only person he is jealous of, has more money, looks better, moves wiser, and already has the answers he’s still searching for.",
      },
      {
        kind: "p",
        text: "Phoenix White talks about closing your eyes and quantum jumping into a higher version of yourself by seeing it clearly. Where are you meeting them? What are they wearing? How do they stand? How do they speak? What do they know that you keep pretending not to know?",
      },
      { kind: "p", text: "Whatever method you use, the point is the same:" },
      {
        kind: "p",
        text: "Channel your highest self until you start living like them in real time. Stop negotiating with the version of yourself you already outgrew. Activate your highest level.",
      },
    ],
  },
  {
    n: 29,
    title: "IDEAS ARE WORTH ZERO",
    blocks: [
      {
        kind: "p",
        text: "Everybody has ideas. Ideas are worth zero. An idea sitting in your head is just potential energy. Execution is kinetic energy.",
      },
      {
        kind: "p",
        text: "I know people with a hundred great ideas and zero executed ones. I know people with one mediocre idea who built an empire.",
      },
      { kind: "strong", text: "Your idea is worth exactly what you are willing to do with it." },
    ],
  },
  {
    n: 30,
    title: "APPLICATION IS THE DIFFERENCE",
    blocks: [
      {
        kind: "p",
        text: "There's a difference between knowing about something and knowing how to do it.",
      },
      {
        kind: "rich",
        parts: [
          { text: "You can watch every YouTube video about fitness and stay soft. You can read every " },
          { text: "business book", red: true, bold: true },
          { text: " and stay broke. You can " },
          { text: "listen", red: true, bold: true },
          { text: " to every relationship podcast and stay alone." },
        ],
      },
      {
        kind: "p",
        text: "Knowledge without application is just entertainment. It makes you feel like you're making progress without actually moving.",
      },
      { kind: "p", text: "At some point, knowledge has to become application." },
      { kind: "p", text: "If it does not change how you move, it is just content." },
      {
        kind: "p",
        text: "Learn it.\nApply it.\nLive it.\nFail at it.\nLearn from it.\nThen you’ll know it.",
      },
    ],
  },
  {
    n: 31,
    title: "IDENTITY DECIDES",
    blocks: [
      {
        kind: "p",
        text: "I once saw someone get asked how they were able to train and run every day. Their answer was simple:",
      },
      { kind: "rich", parts: [{ text: "“I’M A RUNNER.”", red: true }] },
      {
        kind: "p",
        text: "Not, “I’m trying to run.” Not, “I’m working on running.” Not, “I’m practicing discipline.”",
      },
      { kind: "p", text: "I’m a runner." },
      {
        kind: "p",
        text: "That stayed with me because identity removes negotiation. When you are something, you stop treating it like a task you have to convince yourself to do. It becomes part of your fabric. Part of your rhythm. Part of your DNA.",
      },
      { kind: "p", text: "A runner runs.\nA writer writes.\nA speaker speaks." },
      {
        kind: "p",
        text: "Whatever your purpose is, don’t just visit it when you feel inspired. If you try, you die. If you do, you push through.",
      },
      {
        kind: "p",
        text: "Let it be so deeply connected to who you are that your actions no longer feel like an argument with yourself.",
      },
      {
        kind: "strong",
        text: "Stop trying to do the thing. Become the person who does it.",
      },
    ],
  },
  {
    n: 32,
    title: "DISCIPLINE CONSISTENCY BELIEF",
    blocks: [
      {
        kind: "rich",
        parts: [
          { text: "Discipline. Consistency. Belief.", red: true, bold: true },
          { text: " That’s the order." },
        ],
      },
      {
        kind: "p",
        text: "First, build the discipline to show up every day when the feeling is not there. Then do it enough times that it becomes consistent. Then see the results and let belief build naturally.",
      },
      {
        kind: "p",
        text: "Most people start with belief - waiting to feel motivated - which is backward. You get momentum from doing. Momentum builds belief.",
      },
    ],
  },
  {
    n: 33,
    title: "BUSY IS NOT PRODUCTIVE",
    blocks: [
      {
        kind: "p",
        text: "A busy person is running in circles. A productive person is moving toward the goal.",
      },
      { kind: "strong", text: "Activity is not achievement." },
    ],
  },
  {
    n: 34,
    title: null,
    aphorism: true,
    blocks: [{ kind: "display", text: "70% IS SHOWING UP. 30% IS NOT QUITTING." }],
  },
  {
    n: 35,
    title: "FOCUS + ELIMINATE",
    blocks: [
      {
        kind: "matrix",
        cells: [
          { tag: "LIKE IT + GOOD AT IT", word: "FOCUS", desc: "What you like and you're good at.", tone: "green" },
          { tag: "DON'T LIKE IT + GOOD AT IT", word: "DELEGATE", desc: "What you're good at but do not enjoy.", tone: "gold" },
          { tag: "LIKE IT + NOT GOOD YET", word: "PRACTICE", desc: "What you like but have not mastered yet.", tone: "gold" },
          { tag: "DON'T LIKE IT + NOT GOOD AT IT", word: "ELIMINATE", desc: "What you're not good at and do not like.", tone: "red" },
        ],
      },
      { kind: "verse", text: "Know what deserves your energy - and what does not." },
    ],
  },
  {
    n: 36,
    title: "ONE DAY VS. DAY ONE",
    blocks: [
      {
        kind: "p",
        text: "“One day I’ll start my business. One day I’ll write that book. One day I’ll reach out to that person.”",
      },
      { kind: "p", text: "One day never comes." },
      {
        kind: "p",
        text: "Day One is today. Day One is this moment. Day One is the decision that changes everything.",
      },
      {
        kind: "p",
        text: "I stopped using “one day” when I understood that the person you’re waiting to become doesn’t exist yet. You have to become him first. And you do that on Day One.",
      },
      { kind: "strong", text: "One Day is a myth. Day One is real." },
    ],
  },
  {
    n: 37,
    title: "DIRECTION BEFORE SPEED",
    blocks: [
      {
        kind: "p",
        text: "Paulo Coelho said: “Change. But start slowly, because direction is more important than speed.”",
      },
      {
        kind: "p",
        text: "You don’t have to become a completely different person overnight. You just have to stop walking in the wrong direction.",
      },
      { kind: "strong", text: "Speed matters less than alignment. Start slow. But start now." },
    ],
  },
  {
    n: 38,
    title: "SMILE ANYWAY",
    blocks: [
      { kind: "p", text: "Wake up with a smile.\nGo to sleep with a smile." },
      { kind: "p", text: "Not because every day is perfect. But because you are still here." },
      {
        kind: "quote",
        text: "Attack each day with an enthusiasm unknown to mankind.",
        attribution: "Jim Harbaugh",
      },
    ],
  },
  {
    n: 39,
    title: "JUST START IT.",
    blocks: [
      { kind: "p", text: "Start before you feel ready." },
      { kind: "p", text: "The work will show you what the plan cannot." },
      {
        kind: "p",
        text: "Troy Millings and Rashad Bilal started Earn Your Leisure with an iPhone, shotgun microphones, and something worth saying.",
      },
      { kind: "p", text: "The empire came later." },
      { kind: "p", text: "Improve what is weak. Double down on what works." },
      { kind: "strong", text: "Then keep growing." },
    ],
  },
  {
    n: 40,
    title: "MAKE YOUR OWN LUCK",
    blocks: [
      {
        kind: "p",
        text: "Joey Bada$$ saw where he wanted to go early. As a teenager, he submitted his music to WorldStar again and again. They never accepted it.",
      },
      {
        kind: "p",
        text: "So he filmed his own freestyle, put the WorldStar logo on it himself, and released it as if they had. It went viral. The rest is history.",
      },
      {
        kind: "p",
        text: "That move helped lead listeners to 1999, other music projects, acting, entrepreneurship, his Impact Mentorship Program, and countless other businesses and endeavors that followed.",
      },
      {
        kind: "p",
        text: "From a distance, the opportunities can look like luck. Up close, there is vision, strategy, creativity, and the courage to create your own opening.",
      },
      { kind: "strong", text: "He made his luck. Nothing was random. Make your own luck." },
    ],
  },
  {
    n: 41,
    title: null,
    aphorism: true,
    blocks: [
      { kind: "display", text: "FAILURE IS PROGRESS." },
      { kind: "display", text: "FAILURE IS DATA." },
      { kind: "display", text: "DATA IS DIRECTION." },
      { kind: "display", text: "DIRECTION IS PROGRESS." },
    ],
  },
  {
    n: 42,
    title: "EVENTS + REACTIONS = OUTCOMES",
    blocks: [
      {
        kind: "p",
        text: "Most people think they can control the outcome. You can’t. You can influence it. You can prepare for it. You can put yourself in better position. But you don’t fully control how life unfolds.",
      },
      { kind: "p", text: "The only variable you truly control is your reaction." },
      { kind: "p", text: "That is your freedom. That is your agency. That is where your power lives." },
      {
        kind: "p",
        text: "Malcolm X went into prison as one version of himself and came out as another. Prison was the event. He didn’t control that cage. But he controlled his reaction inside of it. He read. He studied. He disciplined his mind. He used confinement as transformation.",
      },
      {
        kind: "p",
        text: "That reaction changed the direction of his life. It didn’t guarantee the outcome. But it placed him on the path.",
      },
      { kind: "strong", text: "React positively. Always." },
    ],
  },
  {
    n: 43,
    title: null,
    aphorism: true,
    blocks: [{ kind: "display", text: "POSITIVE ENERGY GOOD VIBES." }],
  },
  {
    n: 44,
    title: "HARD IS EASY",
    blocks: [
      {
        kind: "p",
        text: "Your mind does what it thinks is in your best interest. If you’re not getting what you want, you’re not collaborating with your mind properly.",
      },
      {
        kind: "p",
        text: "Your mind is trying to protect you. It’s trying to keep you safe. But safe and small are neighbors.",
      },
      {
        kind: "p",
        text: "So if you want to grow, you have to make an agreement with your mind. You have to convince your mind that growth is safe. That risk is manageable. That easy is hard. That hard is easy. That the new goal is actually in your best interest.",
      },
      { kind: "p", text: "That’s not motivation. That’s negotiation." },
      { kind: "strong", text: "Make growth feel safer than staying small." },
    ],
  },
  {
    n: 45,
    title: "COMPLEXITY IS GENIUS",
    blocks: [
      { kind: "p", text: "Jaylen Brown is a perfect living example of refusing to choose one." },
      {
        kind: "p",
        text: "NBA champion. Finals MVP. MIT Media Lab Director’s Fellow. Founder of the independent performance brand 741.",
      },
      {
        kind: "p",
        text: "The world will reduce you to the one thing it understands best. Develop every part of yourself.",
      },
      { kind: "strong", text: "Why be a redundant man when you can be a Renaissance man?" },
    ],
  },
  {
    n: 46,
    title: "WORTH LESS MORE",
    titleParts: [
      { text: "WORTH" },
      { text: "LESS", strike: true },
      { text: "MORE", red: true },
    ],
    blocks: [
      {
        kind: "p",
        text: "Gratitude makes what you have worth more. This isn’t woo. This is psychology and physics. When you appreciate something, you use it better. You maintain it better. You’re more present with it. It performs better.",
      },
      {
        kind: "p",
        text: "A grateful person makes more out of what they have than an ungrateful person makes out of double. It’s the lens again.",
      },
      {
        kind: "p",
        text: "Because when you are grateful for something, you take better care of it. You notice it more. You protect it more. You use it better. You stop reducing blessings to “normal.”",
      },
      {
        kind: "p",
        text: "That is how gratitude amplifies value. It turns what you have into something you can actually feel.",
      },
      { kind: "quote", text: "I Appreciate Your Existence", attribution: "Billionaire PA" },
    ],
  },
  {
    n: 47,
    title: "IMPRINTS",
    blocks: [
      {
        kind: "p",
        text: "Life is built on imprints - positive and negative. Every interaction plants something. A feeling. A lesson. A memory. A scar. A spark.",
      },
      {
        kind: "p",
        text: "A negative imprint can last, but it does not have to lead. Study what hurt you. Turn it into wisdom. Remember who believed in you. Turn it into action. Then do the same for others.",
      },
      {
        kind: "strong",
        text: "Simplify your life: make more positive imprints than negative ones. Leave every situation better than you found it.",
      },
    ],
  },
  {
    n: 48,
    title: "PAST, FUTURE, PRESENT",
    blocks: [
      {
        kind: "p",
        text: "Living in the Past is Depression. You’re replaying something you can’t change, wishing you’d done better.",
      },
      {
        kind: "p",
        text: "Living in the Future is Anxiety. You’re imagining scenarios you can’t control, hoping they go your way.",
      },
      {
        kind: "strong",
        text: "But living in the Present equals Peace. You’re here. You’re present. You’re alive.",
      },
    ],
  },
  {
    n: 49,
    title: "TEN THINGS",
    blocks: [
      {
        kind: "p",
        text: "Here is a simple test: Can you name ten things going right in your life? Not ten things that are perfect. Ten things that are right.",
      },
      {
        kind: "p",
        text: "If you cannot, you may not be looking at your life clearly. You may be in a thought spiral. You may be giving so much attention to what hurts that you have stopped noticing what is still holding you.",
      },
      {
        kind: "p",
        text: "There is always something going right. Your breath. Your body. Your mind. A person who loves you. A door that is still open. A lesson you finally understand. A chance to try again. A prayer that has already been answered.",
      },
      {
        kind: "strong",
        text: "Perspective is refusing to let what is wrong become the only thing you can see.",
      },
    ],
  },
  {
    n: 50,
    title: "FORK IN THE ROAD",
    blocks: [
      {
        kind: "p",
        text: "I once listened to a TED Talk where a woman spoke about “fork in the road” moments. Her point was simple: there is no perfect right or wrong decision.",
      },
      {
        kind: "p",
        text: "If every decision had one objectively right answer, life would become robotic. Every fork would have a formula. Every choice would have an algorithm. Every person with the same information would make the same move.",
      },
      {
        kind: "p",
        text: "But life has more color than that. You don’t always know if a decision is right when you make it. Sometimes you make it right by how you live with it.",
      },
      {
        kind: "p",
        text: "I remember Peyton Manning choosing the Denver Broncos with other paths available. He said he didn’t yet know if it was the right decision, but he would make it right through how he committed, practiced, and played.",
      },
      {
        kind: "p",
        text: "That is the lesson. You bring your effort, discipline, perspective, faith, and full self to the path you chose. The decision becomes right because of what you give to it after you make it. Not before.",
      },
      { kind: "strong", text: "Stop waiting for life to guarantee the perfect path. Choose. Commit. Make it right." },
    ],
  },
  {
    n: 51,
    title: "PERSONAL LEGEND",
    blocks: [
      { kind: "p", text: "Paulo Coelho calls it the personal legend." },
      {
        kind: "p",
        text: "What you’re here to do.\nThe contribution only you can make.\nThe gift from God that is yours alone.",
      },
      {
        kind: "p",
        text: "There’s nothing more valuable you can do in this life than find out what that is - and pursue it.",
      },
      { kind: "strong", text: "Find it.\nFollow it.\nBecome who it requires." },
    ],
  },
  {
    n: 52,
    title: "MORE THAN MONEY",
    blocks: [
      {
        kind: "p",
        text: "Get your money. Take care of yourself. Take care of your family. Build your options. Build your freedom.",
      },
      {
        kind: "p",
        text: "But there will always be a job that pays more. A place with better benefits. A position with more convenience. A safer route.",
      },
      {
        kind: "p",
        text: "I’ve seen people work for less money because they believed in what they were building. I’ve seen people with plenty of money walk away because they didn’t believe in the mission.",
      },
      {
        kind: "p",
        text: "Money is the byproduct of purpose. Purpose is why you wake up. Purpose is what makes you excellent. Purpose is what makes you irreplaceable.",
      },
      { kind: "strong", text: "Find yours first. Let the money follow that." },
    ],
  },
  {
    n: 53,
    title: "FIRE YOUR JOB",
    blocks: [
      {
        kind: "rich",
        parts: [
          { text: "“Fire your job.” - 19Keys.", bold: true },
          { text: " If they can fire you, you can also fire them." },
        ],
      },
      {
        kind: "p",
        text: "But it’s easy to know that you want to leave and harder to know what you want to pursue. Everyone knows they hate their job. Very few people know what they actually want instead. So they leave the job they hate and walk into another one that is just different, not better.",
      },
      {
        kind: "p",
        text: "Before you fire your job, get every single ounce of value out of it. Take your piece of the pie. What did this job teach you? What did it show you about what you want, what you hate, what you are good at, and what kind of life you are actually building?",
      },
      {
        kind: "p",
        text: "Once you know the next best option for your career, your purpose, and your life, then go for it.",
      },
      { kind: "strong", text: "Your career is more important then your job." },
    ],
  },
  {
    n: 54,
    title: "EXCELLENCE IN THE WRONG VISION",
    blocks: [
      { kind: "p", text: "Excellence in someone else’s vision can still become a cage." },
      {
        kind: "p",
        text: "I had reached a place many people are taught to chase: Ernst & Young, the top accounting firm in the world. But something in me still wanted to know what I could build outside the machine.",
      },
      {
        kind: "p",
        text: "What can I build with my own name, my own risk, and my own vision attached to it?",
      },
      { kind: "p", text: "Some decisions won’t make sense to everyone.\nThey don’t have to.\nSome decisions are for personal proof.",
      },
      {
        kind: "strong",
        text: "The highest level of excellence is not just doing great work. It is doing the work that belongs to you.",
      },
    ],
  },
  {
    n: 55,
    title: "SELF-FULL > SELFISH",
    titleParts: [
      { text: "SELF-FULL" },
      { text: ">", red: true },
      { text: "SELFISH" },
    ],
    blocks: [
      { kind: "p", text: "Purpose is not selfish." },
      {
        kind: "p",
        text: "But I had to learn this because people like me are naturally wired to serve. Leaders, managers, operators, producers, professional service people — we’re trained to think about everybody else first. The team. The client. The mission. The room. The person who needs help.",
      },
      {
        kind: "p",
        text: "That is beautiful, but it can also become imbalance. Harmony isn’t everyone being 50/50. Some people are naturally selfless, so they may need to fight to become 20% self-full. You heard that right: not selfish, but self-full.",
      },
      {
        kind: "p",
        text: "Some people are naturally selfish, so they may need to fight to become 20% selfless. That is harmony too.",
      },
      {
        kind: "strong",
        text: "The world doesn’t need the drained version of you. It needs the aligned one.",
      },
    ],
  },
  {
    n: 56,
    title: "IMPACT OUTLASTS HAPPINESS",
    blocks: [
      {
        kind: "p",
        text: "Happiness is a feeling. It comes and goes. You chase it and it disappears. You ignore it and it arrives unexpected.",
      },
      { kind: "p", text: "Impact is a legacy. It compounds. It lasts. It outlives you." },
      {
        kind: "p",
        text: "Happiness alone is too small to build a life around. Impact gives your joy somewhere to go.",
      },
      { kind: "strong", text: "Pursue impact." },
    ],
  },
  {
    n: 57,
    title: "PRACTICE COMMUNITY",
    blocks: [
      {
        kind: "p",
        text: "You don’t “join” a community. You practice. You participate. You contribute. You show up. That is how community gets built.",
      },
      { kind: "p", text: "A member takes. A leader contributes." },
      {
        kind: "strong",
        text: "And the more you practice community, the more the community becomes real.",
      },
    ],
  },
  {
    n: 58,
    title: "FAST. CHEAP. QUALITY.",
    blocks: [
      {
        kind: "triangle",
        points: [
          { word: "QUALITY", tone: "red" },
          { word: "FAST", tone: "black" },
          { word: "CHEAP", tone: "gold" },
        ],
        notes: [
          "FAST + QUALITY will not be cheap.",
          "CHEAP + QUALITY will not be fast.",
          "FAST + CHEAP will not be quality.",
        ],
        center: { black: "PICK", red: "TWO." },
      },
    ],
  },
  {
    n: 59,
    title: "LT > ST",
    titleParts: [
      { text: "LT", red: true },
      { text: "> ST" },
    ],
    blocks: [
      {
        kind: "p",
        text: "One of my biggest philosophies is simple: long term over short term.",
      },
      {
        kind: "p",
        text: "Every short-term decision should connect to a long-term goal. If it doesn’t, it is probably a distraction.",
      },
      {
        kind: "p",
        text: "I saw this clearly at my old jobs. In environments with high turnover and constant deadlines, it was easy to treat people like temporary parts: give the instruction, get the work, move on.",
      },
      {
        kind: "p",
        text: "The best leaders took more time. They explained why. They developed people. That investment made the next project better, the next quarter easier, and the whole team stronger.",
      },
      {
        kind: "p",
        text: "The deadline in front of you matters. The life you’re building matters more.",
      },
      { kind: "display", text: "MAKE TODAY ANSWER TO TOMORROW." },
    ],
  },
  {
    n: 60,
    title: "STOP THE SNOWBALL",
    blocks: [
      { kind: "p", text: "One failure doesn’t make you a failure." },
      { kind: "p", text: "One failure is an event." },
      {
        kind: "p",
        text: "A snowball is what happens when you let that event become a pattern.",
      },
      {
        kind: "p",
        text: "You miss the workout, then eat worse because the day is already ruined.\nYou lose the deal, then stop following up.\nYou make one mistake, then start acting like the mistake is your identity.",
      },
      {
        kind: "p",
        text: "That is how failure grows. Because you gave it permission to become the next thing.",
      },
      { kind: "p", text: "Catch it while it is still small." },
      { kind: "strong", text: "Learn. Reset. Move." },
      { kind: "p", text: "One failure doesn’t make you a failure." },
    ],
  },
  {
    n: 61,
    title: "FAILURE NEEDS A WITNESS",
    blocks: [
      {
        kind: "p",
        text: "Someone who can look at the same moment and help you see it clearly.",
      },
      { kind: "p", text: "Not someone who lies to you." },
      { kind: "p", text: "Not someone who makes excuses for you." },
      { kind: "p", text: "Someone who can say:" },
      {
        kind: "rich",
        parts: [
          { text: "This hurt, but it is not the end. This failed, but you are not a " },
          { text: "failure.", red: true, bold: true },
        ],
      },
      {
        kind: "rich",
        parts: [
          { text: "A good witness helps you put the " },
          { text: "failure", red: true, bold: true },
          { text: " in its proper place." },
        ],
      },
    ],
  },
  {
    n: 62,
    title: "ASK YOUR 80-YEAR-OLD SELF...",
    blocks: [
      {
        kind: "verse",
        text: "Imagine yourself at 80 years old looking back at this moment. What would the older version of you say?",
      },
      {
        kind: "p",
        text: "That you worried about things that did not matter? Played it safe when you should have swung? Listened too much to people who were not going where you wanted to go? Waited for the perfect time until time became the thing you ran out of?",
      },
      { kind: "p", text: "Or would they say:" },
      {
        kind: "strong",
        text: "You took the leap. You told the truth. You did your best and gave it your all. You lived a full life filled without regret.",
      },
      { kind: "strong", text: "They are either thanking you or waiting on you." },
    ],
  },
  {
    n: 63,
    title: "WATER THE RELATIONSHIP",
    blocks: [
      { kind: "display", text: "Every relationship is a plant. Water it or it dies." },
    ],
  },
  {
    n: 64,
    title: "REMEMBER THE NAME",
    blocks: [
      {
        kind: "p",
        text: "When someone tells you their name, remember it. People may forget what you said, but they remember how it felt to be remembered.",
      },
      {
        kind: "p",
        text: "A name carries dignity. A name carries identity. A name says: You mattered enough for me to hold onto you.",
      },
      {
        kind: "p",
        text: "That is why remembering names will always be one of the simplest ways to make people feel seen.",
      },
      {
        kind: "p",
        text: "Especially for people with names that carry culture, weight, and meaning that a room has to rise to respect. Like mine.",
      },
    ],
  },
  {
    n: 65,
    title: "AUDIT YOUR CIRCLE",
    blocks: [
      { kind: "p", text: "Every season, audit your circle." },
      { kind: "p", text: "Ask yourself:" },
      {
        kind: "p",
        text: "Who is helping me become better?\nWho only supports the version of me they can still understand?",
      },
      { kind: "p", text: "Your circle is environment, influence, permission, and standard." },
      {
        kind: "p",
        text: "Some people belong close.\nSome people belong at a distance.\nSome people belong in memory.",
      },
      { kind: "p", text: "Your future needs more than familiar faces." },
      {
        kind: "p",
        text: "It needs people who can recognize your growth, challenge your limits, and respect who you’re becoming.",
      },
    ],
  },
  {
    n: 66,
    title: "BAD RELATIONSHIPS SHRINK YOU",
    blocks: [
      {
        kind: "p",
        text: "A bad relationship can make you question the version of yourself that was finally starting to grow. It can make you stay where you should have left. It can make you shrink so someone else doesn’t feel insecure. It can make you trade purpose for approval.",
      },
      { kind: "p", text: "That is a tax on your life. And the tax compounds." },
      {
        kind: "p",
        text: "So be careful who gets close enough to influence your direction.",
      },
      { kind: "strong", text: "Not everyone deserves access to your future." },
    ],
  },
  {
    n: 67,
    title: "DON’T WORK FOR BAD PEOPLE",
    blocks: [
      {
        kind: "p",
        text: "This is non-negotiable. A bad boss doesn’t just affect your paycheck. They affect your confidence. Your nervous system. Your decision-making. Your standards.",
      },
      {
        kind: "p",
        text: "You can tell yourself it’s just a job, but the wrong environment will start rewriting you if you stay too long. No amount of money is worth becoming smaller every day.",
      },
      {
        kind: "p",
        text: "And I say that knowing people have bills. But start planning your exit. Quietly. Strategically. Professionally. But plan it.",
      },
      { kind: "p", text: "Because your peace is part of your compensation." },
      {
        kind: "quote",
        text: "I don’t work this hard to be around people I don’t like.",
        attribution: "NAS",
      },
    ],
  },
  {
    n: 68,
    title: "ADD VALUE FIRST",
    blocks: [
      { kind: "p", text: "Add Value. Give first. Give often. Give without keeping score." },
      {
        kind: "p",
        text: "Giving builds the relationship from your side. It makes you the person who shows up. The person who cares. The person who's reliable.",
      },
      {
        kind: "p",
        text: "Give and the world gives back. Not always from the people you give to. But the universe has a way of providing harmony.",
      },
    ],
  },
  {
    n: 69,
    title: "HAVE THE CONVERSATION",
    blocks: [
      {
        kind: "p",
        text: "Most relationships don’t fall apart because of one big thing. They fall apart because of the one honest conversation that kept getting avoided.",
      },
      {
        kind: "p",
        text: "The thing you felt but never said.\nThe boundary you kept delaying.\nThe truth you softened so much it stopped being true.",
      },
      { kind: "p", text: "A tough conversation isn’t a fight. It is a form of care." },
      { kind: "p", text: "Simon Sinek talks about leaning into tension. I agree." },
      {
        kind: "p",
        text: "Be specific.\nSay what happened.\nSay how it made you feel.\nSay the impact.\nThen listen.",
      },
    ],
  },
  {
    n: 70,
    title: "FORGIVENESS FREES",
    blocks: [
      {
        kind: "p",
        text: "That is the art. Move toward the tension. Tell the truth without poison. Give the other person room to respond.",
      },
      { kind: "p", text: "Because silence doesn’t protect the relationship. Truth does." },
      { kind: "p", text: "Forgiveness isn’t always for them. Sometimes it is for you." },
      {
        kind: "p",
        text: "Forgiveness doesn’t mean what happened was okay. It means you’re choosing to stop letting the wound make decisions for your future.",
      },
      { kind: "p", text: "Some people don’t deserve another chance. But you deserve peace." },
      {
        kind: "strong",
        text: "Let it go. Not because they earned it. Because you need your hands free for what comes next.",
      },
    ],
  },
  {
    n: 71,
    title: "REAL LISTENING",
    blocks: [
      { kind: "p", text: "Most people don’t truly listen. They wait for their turn to talk." },
      { kind: "p", text: "Real listening asks:" },
      {
        kind: "p",
        text: "What are they actually saying?\nWhat are they not saying?\nWhat do they need me to understand?\nWhat feeling is underneath the words?",
      },
      {
        kind: "p",
        text: "When people feel heard, they soften. They trust more. They tell the truth faster.",
      },
      {
        kind: "p",
        text: "That is why listening is power. Because it gives you access to what the words alone can’t carry.",
      },
      { kind: "strong", text: "Listen to understand. Not to respond." },
    ],
  },
  {
    n: 72,
    title: "HIGH LEVEL CONVERSATIONS",
    blocks: [
      {
        kind: "p",
        text: "We live in a world of low-level conversation. Everyone is scrolling. Waiting to speak. Trying to prove a point.",
      },
      {
        kind: "p",
        text: "A high-level conversation begins with attention. Jon Stewart brings wit. Oprah creates safety. 19Keys elevates the idea. Each has a different gift, but they all make the person across from them feel worth hearing.",
      },
      {
        kind: "p",
        text: "Whether you are interviewing your favorite artist or talking to your young niece, give them 110%. Listen closely enough for the conversation to go somewhere neither of you could have reached alone.",
      },
    ],
  },
  {
    n: 73,
    title: "THE ENEMY EFFECT",
    blocks: [
      {
        kind: "p",
        text: "To graduate high school, I had to spend thirty days in Death Valley with a group of ten classmates, hike roughly 130 miles, and spend three days alone in the desert. Crazy, right?",
      },
      {
        kind: "p",
        text: "Then we discovered that all ten of us had one particular classmate we did not get along with. We bonded immediately.",
      },
      {
        kind: "p",
        text: "It was not our finest moment, but it taught me something. People often unite faster around what they oppose than what they believe.",
      },
      {
        kind: "p",
        text: "I have worked with people of different religions, backgrounds, and beliefs. There is already too much standing between our communities and freedom, power, and progress. We cannot afford to make enemies of everyone who is different.",
      },
      { kind: "p", text: "Build with people who share your mission, vision, and values." },
      {
        kind: "strong",
        text: "If you recognize the same enemy, face it together instead of making enemies of each other.",
      },
    ],
  },
  {
    n: 74,
    title: null,
    aphorism: true,
    blocks: [{ kind: "display", text: "THOUGHT LEADERSHIP" }],
  },
  {
    n: 75,
    title: "CONSTRUCTIVE CONTROVERSY",
    blocks: [
      { kind: "p", text: "Sometimes love flips tables." },
      {
        kind: "p",
        text: "Dee-1 brings conscious call-outs into our culture. He challenges people because he wants better for them.",
      },
      { kind: "p", text: "Positivity still needs warriors. Jesus was a revolutionary." },
      { kind: "strong", text: "Care enough to bring peace. Care enough to disturb it." },
    ],
  },
  {
    n: 76,
    title: "SPEAK TRUTH",
    blocks: [
      { kind: "quote", text: "We need the courage to question the powers that be." },
      {
        kind: "quote",
        text: "We need the courage to be impatient with evil and patient with people.",
        attribution: "Cornel West",
      },
    ],
  },
  {
    n: 77,
    title: "LOYAL, BUT LEARNING",
    blocks: [
      { kind: "p", text: "I’m loyal. I stay. I show up. I defend." },
      {
        kind: "p",
        text: "But I’ve learned that not everyone is wired that way. Some people are transactional. Some people are seasons. Some people are chapters.",
      },
      { kind: "p", text: "That doesn’t make them bad. Just know who is who in your circle." },
      {
        kind: "strong",
        text: "Prioritize traits that you embody because you value them, not because you expect reciprocation.",
      },
    ],
  },
  {
    n: 78,
    title: "MONEY IS ENERGY",
    blocks: [
      { kind: "p", text: "Money is energy." },
      {
        kind: "p",
        text: "It’s a language that says: I believe in your work. I trust what you’re building. I want to support the value you’re creating.",
      },
      {
        kind: "p",
        text: "When you charge properly for your work, you’re giving people a clear way to respect the value. People value what they pay for.",
      },
      {
        kind: "p",
        text: "Sometimes the free thing is the most valuable thing in the room. A conversation. A framework. A connection. A warning. A lesson. A piece of truth someone needed at the right time.",
      },
      {
        kind: "p",
        text: "That’s why I give a lot away. My thinking. My frameworks. My time with certain people. But I give strategically.",
      },
      {
        kind: "p",
        text: "To people who will use it.\nTo people who will amplify it.\nTo people who will turn it into something bigger.",
      },
      {
        kind: "p",
        text: "The best things in life are free. Some people just cut them up and present them correctly, like a jeweler.",
      },
      { kind: "p", text: "That’s pricing. That’s positioning. That’s presentation." },
      {
        kind: "p",
        text: "Value can be how something is given, received, applied, and multiplied.",
      },
      {
        kind: "strong",
        text: "Learn how to charge for your value without apologizing. Learn how to give where the gift can grow.",
      },
    ],
  },
  {
    n: 80,
    title: "YOUR MIND IS THE ASSET",
    blocks: [
      { kind: "p", text: "Not the money. Not the car. Not the title. Not the platform." },
      { kind: "strong", text: "The mind." },
      {
        kind: "p",
        text: "Because if everything else disappears, your mind is what rebuilds. In the age of AI, your mind is even more valuable.",
      },
      {
        kind: "p",
        text: "When everything can be copied, prompted, remixed, and generated, the real difference isn’t the tool. It’s the mind directing it.",
      },
      {
        kind: "p",
        text: "Don’t become an algorithm. Don’t become a trend. Don’t let technology replace your taste, your judgment, your originality, or your point of view.",
      },
      { kind: "p", text: "Master your mind first. Then master the tools that serve it." },
      {
        kind: "p",
        text: "Everything you create flows from the quality of the mind behind it.",
      },
      { kind: "strong", text: "Protect it. Train it. Feed it. Use it." },
    ],
  },
  {
    n: 81,
    title: "SAFETY IS DANGEROUS",
    blocks: [
      {
        kind: "quote",
        text: "Do one thing every day that scares you.",
        attribution: "Eleanor Roosevelt",
      },
      { kind: "display", text: "GET IN YOUR" },
      { kind: "strikeplay", word: "COMFORT", overlay: "danger" },
      { kind: "display", text: "ZONE" },
      {
        kind: "rich",
        parts: [
          { text: "The moment you think \"I'm safe here,\" you're in " },
          { text: "danger.", bold: true },
        ],
      },
    ],
  },
  {
    n: 82,
    title: "THE PYRAMID EFFECT",
    blocks: [
      {
        kind: "p",
        text: "Maslow’s hierarchy of needs is simple: a person has to feel safe before they can fully focus on purpose, creativity, and becoming their highest self.",
      },
      { kind: "p", text: "Oakland shows you that hierarchy in real life." },
      { kind: "p", text: "The hills separate two different worlds." },
      {
        kind: "p",
        text: "In the bottoms you see pressure. Sirens. Graffiti. Trash on the street. People worrying about the urgency of today and not always the future.",
      },
      {
        kind: "p",
        text: "As you rise into the Oakland Hills, the environment changes: Big homes. Views. Space. Ownership.",
      },
      { kind: "p", text: "You know where you are by what the environment allows." },
      {
        kind: "p",
        text: "Once you understand this pyramid, you have to decide how you’re going to move.",
      },
      {
        kind: "p",
        text: "Self-respect is the first climb. It changes how you see yourself, how you treat your home, how you carry your name, and how you move through your community. It builds actualization, freedom, and power.",
      },
      {
        kind: "strong",
        text: "The goal is to rise high enough to expand what you believe is possible.",
      },
    ],
  },
  {
    n: 83,
    title: "I AM. ALL OF US.",
    blocks: [
      { kind: "p", text: "My story is mine, but the lessons are ours." },
      {
        kind: "p",
        text: "Your struggle teaches me empathy.\nYour victory reminds me what’s possible.",
      },
      { kind: "p", text: "I am because we are. We are because the ancestors were." },
      { kind: "p", text: "None of us are carrying life alone." },
      { kind: "p", text: "We’re all part of the pattern." },
      { kind: "strong", text: "And every life leaves evidence for the next one." },
    ],
  },
  {
    n: 84,
    title: "TRAIN YOUR STILLNESS",
    blocks: [
      {
        kind: "p",
        text: "I took stillness more seriously after working with Director X in Toronto.",
      },
      {
        kind: "p",
        text: "He reminded me that stress trains the mind for survival. Stillness trains it for clarity.",
      },
      {
        kind: "p",
        text: "I had spent years pushing through pressure: public accounting, tours, productions, high-level rooms, short timelines, and situations where everything felt urgent.",
      },
      { kind: "p", text: "Pushing through can get the job done. But now I pause." },
      {
        kind: "p",
        text: "Even in the middle of the work. Even when the room is moving fast. Even when the pressure is loud.",
      },
      {
        kind: "p",
        text: "I breathe. I take a second. I come back to myself before I respond.",
      },
      {
        kind: "strong",
        text: "You have to protect your energy at all costs. Stillness is part of the work.",
      },
    ],
  },
  {
    // Visually unnumbered in V29 — the red Rayburn quote page.
    n: 85,
    title: null,
    aphorism: true,
    blocks: [
      {
        kind: "quote",
        text: "Life is hard. Be Kind to people",
        attribution: "Alex Rayburn",
      },
    ],
  },
  {
    n: 86,
    title: "WORLD IS CANVAS",
    blocks: [
      {
        kind: "p",
        text: "You don’t need a canvas to be an artist. You don’t need a stage to perform. You don’t need a gallery to make something beautiful.",
      },
      {
        kind: "p",
        text: "Art is everywhere and in everything. Fashion is the way one fashions. Art is the way one arts. It’s both a noun and a verb.",
      },
      {
        kind: "p",
        text: "Don’t be an artist just in your art. Be it in your business, and everywhere you show up. Your life can be art. Your work can be art. Your presence can be art. The way you move through the world can make people feel something.",
      },
      { kind: "strong", text: "So stop hiding your color. Use it." },
    ],
  },
  {
    // Visually unnumbered in V29.
    n: 87,
    title: "BE INSPIRED.\nASPIRE.\nINSPIRE.",
    blocks: [
      { kind: "p", text: "Inspiration isn’t just motivation. It’s a skill." },
      {
        kind: "p",
        text: "It can come from a person, a song, a sentence, a room, a conversation, a stranger, or one of God’s little reminders that shows up right when you need it.",
      },
      {
        kind: "p",
        text: "But inspiration is only the first step. Once something moves you, you have to move with it. That is aspiration.",
      },
      {
        kind: "p",
        text: "Take the feeling and turn it into action. Take the vision and turn it into work. Take the reminder and become more responsible with the gift God placed in you.",
      },
      {
        kind: "p",
        text: "Then, if you live it fully enough, your life becomes the reminder for somebody else. To get that jolt of inspiration just from you living your purpose.",
      },
      { kind: "strong", text: "That’s the cycle. Be inspired. Aspire. Inspire." },
    ],
  },
  {
    n: 88,
    title: "THINK LONG.\nWRITE SHORT.",
    blocks: [
      {
        kind: "p",
        text: "Think long. Write short. This is one of the greatest skills you can build - as a writer, communicator, or leader turning chaos into clarity.",
      },
      {
        kind: "quote",
        text: "I made this letter longer than usual because I did not have time to make it shorter.",
        attribution: "Blaise Pascal",
      },
      {
        kind: "p",
        text: "Short is not easy. Clear is not lazy. Simple is not shallow. To be concise, understand the idea deeply enough to remove everything that is not the idea.",
      },
      {
        kind: "p",
        text: "Editing is the same. Anybody can leave everything in. The work is knowing what to cut, what to keep, and what carries the message.",
      },
      {
        kind: "strong",
        text: "In a day and age where people have the attention span of a goldfish, keep it concise.",
      },
    ],
  },
  {
    // Visually unnumbered in V29 — the black alchemy page.
    n: 89,
    title: null,
    aphorism: true,
    blocks: [
      { kind: "display", text: "ALCHEMIZE COMPLEXITY." },
      { kind: "display", text: "SAY LESS." },
      { kind: "display", text: "MEAN MORE." },
    ],
  },
  {
    // Visually unnumbered in V29 — the poster page.
    n: 90,
    title: null,
    aphorism: true,
    blocks: [
      { kind: "display", text: "HUMAN RELATIONS" },
      { kind: "display", text: "> ARTIFICIAL INTELLIGENCE" },
    ],
  },
  {
    n: 91,
    title: "TRENDS ARE TRAPS",
    blocks: [
      { kind: "p", text: "That doesn’t mean ignore what is working." },
      {
        kind: "p",
        text: "Pay attention. Study the market. Watch what gets results. Make data-driven decisions.",
      },
      {
        kind: "p",
        text: "But don’t sacrifice your voice just because something is trending. Don’t abandon your values for visibility. Don’t trade authenticity for a temporary algorithmic win.",
      },
      {
        kind: "p",
        text: "A trend can give you information. It shouldn’t give you identity.",
      },
      {
        kind: "p",
        text: "Use what helps. Leave what doesn’t. Take the insight without becoming the imitation.",
      },
      {
        kind: "strong",
        text: "The goal is to build something true enough to last beyond the moment.",
      },
    ],
  },
  {
    n: 92,
    title: "CREATIVITY IS DISCOVERY",
    blocks: [
      { kind: "p", text: "Creativity is not always creation. Sometimes it’s discovery." },
      {
        kind: "p",
        text: "The idea already existed. The pattern was already there. The answer was waiting. Your job was to notice it.",
      },
      {
        kind: "p",
        text: "That is why the best ideas often feel obvious after someone says them. They were hiding in plain sight.",
      },
      {
        kind: "strong",
        text: "Creativity is the ability to see what others passed over. To connect what others kept separate. To recognize the thing that was already trying to become real. And to let it flow with authenticity.",
      },
    ],
  },
  {
    n: 93,
    title: "ALL AT ONCE",
    blocks: [
      {
        kind: "p",
        text: "The past, present, and future may be happening at the same time.",
      },
      {
        kind: "p",
        text: "An old experience explains itself years later. A decision today changes the meaning of yesterday. A vision of tomorrow changes how you move now.",
      },
      {
        kind: "p",
        text: "This book was written across years, but every entry belongs to the same life.",
      },
      { kind: "strong", text: "Time passes. The pattern remains." },
    ],
  },
  {
    n: 94,
    title: "VISION",
    blocks: [
      { kind: "p", text: "Add value even when nobody sees it yet." },
      {
        kind: "p",
        text: "Coodie kept the camera rolling. With Chike Ozah, he eventually shaped more than twenty years of footage into jeen-yuhs: A Kanye Trilogy, the landmark Netflix documentary.",
      },
      {
        kind: "p",
        text: "Long before the world knew what Kanye West would become, he preserved the trying, the believing, the becoming.",
      },
      {
        kind: "p",
        text: "That is the power of documentation. The moment rarely announces its importance while you’re living it.",
      },
      {
        kind: "strong",
        text: "Document the process. The good. The bad. The ugly. Hold the vision long enough for the world to catch up.",
      },
    ],
  },
  {
    n: 95,
    title: "TOURIST POV",
    blocks: [
      {
        kind: "p",
        text: "A tourist notices what’s right under your nose. The building you pass every day. The mural you stopped seeing. The corner store with a story. The way the light hits your street at a certain hour. The place people travel across the world to experience — while you walk by it like it’s nothing.",
      },
      {
        kind: "p",
        text: "So practice seeing your own world again. Walk slower. Look up. Ask questions. Take the long way home. Do the touristy thing in your own city.",
      },
      {
        kind: "strong",
        text: "Because creativity lives in the shift between having seen something and truly seeing it. That curiosity is where creativity lives.",
      },
    ],
  },
  {
    n: 96,
    title: "THE LUXURY OF BOREDOM",
    blocks: [
      {
        kind: "p",
        text: "Boredom is where ideas come from. Not in the scroll. Not in the noise. In the quiet.",
      },
      {
        kind: "p",
        text: "If you're never bored, you're never thinking. You're just consuming.",
      },
      {
        kind: "p",
        text: "I protect my boredom now. Time with no input. No phone. No stimulation. Just thinking.",
      },
      { kind: "p", text: "Peacefulness." },
      { kind: "strong", text: "There's magic there too." },
    ],
  },
  {
    n: 97,
    title: "EXCELLENT IS MEMORABLE",
    blocks: [
      { kind: "p", text: "Good is correct.\nExcellent is memorable." },
      { kind: "p", text: "Good follows the rules.\nExcellent knows which rules to break." },
      {
        kind: "p",
        text: "Good gives people what they expected.\nExcellent gives people what they didn’t know they needed.",
      },
      {
        kind: "p",
        text: "A lot of people stop at good because good is safe. Good gets approved. Good avoids criticism.",
      },
      { kind: "p", text: "Good checks the box." },
      { kind: "p", text: "But good usually doesn’t move anybody." },
      {
        kind: "p",
        text: "Excellent has a point of view. Excellent has taste. Excellent has risk. Excellent has something in it that makes people remember how it made them feel.",
      },
      { kind: "strong", text: "Good is bad. Excellence is better." },
    ],
  },
  {
    n: 98,
    title: "TASTE IS YOUR CEILING",
    blocks: [
      {
        kind: "p",
        text: "You can’t create something better than your taste. Your taste is your ceiling.",
      },
      {
        kind: "p",
        text: "So improve your taste. Consume excellent work. Study it. Understand why it works. Let it set your standard.",
      },
      { kind: "strong", text: "Then create. And your ceiling will be higher than it was." },
    ],
  },
  {
    n: 99,
    title: "NEW STANDARD",
    blocks: [
      { kind: "p", text: "Everything you tolerate now becomes the new standard." },
      {
        kind: "p",
        text: "If you tolerate disrespect now, you’ll receive disrespect later. If you tolerate mediocrity now, you’ll produce mediocrity later. If you tolerate dishonesty now, you’ll attract dishonest people later.",
      },
      { kind: "strong", text: "What you allow today becomes what you inherit tomorrow." },
    ],
  },
  {
    n: 100,
    title: "SAMPLE\nFLIP\nTRANSFORM",
    blocks: [
      {
        kind: "p",
        text: "J Dilla is my favorite artist of all time. One of the reasons is because he didn’t just sample music. He transformed it. He could take a sound from somewhere else, chop it, bend it, swing it, distort it, humanize it, and turn it into something that felt completely new. That’s art.",
      },
      {
        kind: "p",
        text: "Steve Jobs once said, “Good artists copy. Great artists steal.” I get the point. But I think legendary artists sample. They take what inspired them and make it their own.",
      },
      {
        kind: "p",
        text: "That’s life too. You are a remix of everything you’ve touched. Originality is not pretending nothing influenced you. Originality is taking what influenced you and adding your own rhythm.",
      },
      { kind: "strong", text: "Sample life. Chop it. Flip it. Make it yours." },
    ],
  },
  {
    n: 101,
    title: "LEAVE SOMETHING WORTH RECEIVING",
    blocks: [
      {
        kind: "p",
        text: "We owe the future more than we found. More knowledge. More beauty. More courage. More systems. More examples. More proof that someone before them cared enough to build.",
      },
      {
        kind: "p",
        text: "Because we inherited more than we realize. The freedoms we use. The lessons someone else had to learn the hard way. Somebody paid a price so we could start further ahead.",
      },
      {
        kind: "p",
        text: "That means we have a responsibility to keep adding to the inheritance. A better way forward. The future is going to live inside what we leave behind.",
      },
      { kind: "strong", text: "So leave something worth receiving." },
    ],
  },
  {
    // Multi-page entry: continues onto "BUILD ACROSS BORDERS".
    n: 102,
    title: "BUILD WHERE YOURE NEEDED",
    blocks: [
      {
        kind: "p",
        text: "Africa doesn’t need charity. It needs partnership. Infrastructure. Investment. Capital. Narrative control. Real bridges between the continent, Black America, and the global diaspora.",
      },
      {
        kind: "p",
        text: "My father lived one version of that bridge. He sold his motorcycle for a plane ticket to the U.S., worked his way through school, became a financial advisor at one of the biggest banks in the world, and built businesses — all while providing resources and a pathway for his people back home.",
      },
      {
        kind: "p",
        text: "But this generation has a different assignment. We have the technology, access, capital, media, and relationships to build across borders in real time.",
      },
      { kind: "strong", text: "The best way we win is together." },
      { kind: "display", text: "BUILD ACROSS BORDERS" },
      {
        kind: "p",
        text: "We’ve returned to Nigeria, Ghana, and Uganda to build, not just visit, connecting with people on the continent who are willing and ready to move Africa forward.",
      },
      {
        kind: "p",
        text: "We met with Uganda’s President Museveni to discuss agriculture, infrastructure, media, investment, and diaspora partnership. Relationships with community leaders like Diallo Sumbry have shown us how ideas can move across countries: from conversation to collaboration, then execution.",
      },
      {
        kind: "p",
        text: "Every generation has to decide what it will do with the sacrifice before it. Some leave to create opportunity. Some return to multiply it. Some build across borders so the next generation has more choices than the last.",
      },
      {
        kind: "strong",
        text: "The future belongs to people who know where they come from and build where they’re needed.",
      },
    ],
  },
  {
    // Title-only visual page, no visible entry number — the yellow prayer page.
    n: 103,
    title: null,
    aphorism: true,
    blocks: [{ kind: "display", text: "WRITE\nDOWN\nYOUR\nPRAYERS" }],
  },
  {
    n: 104,
    title: "STORY OF YOUR LIFE",
    blocks: [
      {
        kind: "p",
        text: "Thousands of people had to survive for you to exist. Somebody crossed water. Somebody survived war. Somebody endured poverty. Somebody prayed through uncertainty. Somebody made a decision they would never see the full result of.",
      },
      { kind: "p", text: "And somehow, all of that became you." },
      {
        kind: "p",
        text: "Your life is not just yours. It is the continuation of people whose names you may never know, but whose blood still speaks through you.",
      },
      {
        kind: "strong",
        text: "The ancestors are watching. To remind you that your life is part of a much longer story.",
      },
    ],
  },
  {
    n: 105,
    title: "WORD IS BRAND",
    blocks: [
      { kind: "p", text: "Your word is the only thing no one can fake for you." },
      {
        kind: "p",
        text: "In a world of filters and performance, your word is truth. When you say you’ll do something, you do it. When you say you believe something, you live it.",
      },
      { kind: "strong", text: "Your word becomes your brand. Protect it." },
    ],
  },
  {
    // Visual statement page, no visible entry number — the purple accountability page.
    n: 106,
    title: null,
    aphorism: true,
    blocks: [
      { kind: "display", text: "BE WHO\nYOU SAY\nYOU ARE." },
      { kind: "display", text: "TALK IS CHEAP." },
    ],
  },
  {
    // Visually unnumbered quote page.
    n: 107,
    title: null,
    aphorism: true,
    blocks: [
      {
        kind: "quote",
        text: "Cleanliness IS godliness",
        attribution: "Nuri Muhammad",
      },
    ],
  },
  {
    // Visually unnumbered quote page.
    n: 108,
    title: null,
    aphorism: true,
    blocks: [
      {
        kind: "quote",
        text: "Life changes. Remain golden through it all",
        attribution: "Casey Jones",
      },
    ],
  },
  {
    // Visual statement page, no visible entry number.
    n: 109,
    title: null,
    aphorism: true,
    blocks: [
      { kind: "display", text: "DO YOUR\nBEST WORK\nWHEN YOUR\nBACK IS\nAGAINST THE\nWALL" },
    ],
  },
  {
    // Visually unnumbered in V29.
    n: 110,
    title: "EVENTUALLY.",
    blocks: [
      {
        kind: "p",
        text: "Eventually is one of my favorite words. It places certainty inside the future.",
      },
      { kind: "p", text: "Patience with a pulse. Faith with a clock." },
      { kind: "strong", text: "Keep moving. Let eventually find you on the way." },
    ],
  },
  {
    n: 111,
    title: null,
    displayTitle: { black: "GOD'S", red: "Signature" },
    blocks: [
      {
        kind: "p",
        text: "Nothing Is Random began as a podcast I did with 19Keys almost 10 years before me releasing it as a book. It was a place for my everyday thoughts about life and the world.",
      },
      { kind: "p", text: "The title stayed because the pattern kept proving itself." },
      {
        kind: "p",
        text: "One conversation became a concept. The concept became a book. The book became proof.",
      },
      {
        kind: "p",
        text: "Everything builds on something. Even what did not work, worked on you.",
      },
      { kind: "strong", text: "Nothing is wasted. Nothing is random. Alchemize value." },
    ],
  },
  {
    // Visually unnumbered quote page — white field, red and black type.
    n: 112,
    title: null,
    aphorism: true,
    blocks: [
      { kind: "display", text: "DON'T GET\nJEALOUS,\nWORK\nHARDER." },
      { kind: "kicker", text: "- Dr. J. Alfred Smith Sr." },
    ],
  },
  {
    n: 113,
    title: "PERSPECTIVE",
    blocks: [
      {
        kind: "p",
        text: "I once heard a story about two brothers who grew up in the same house but remembered two different childhoods.",
      },
      {
        kind: "p",
        text: "The younger brother felt life had been easier than people made it seem. The older brother saw it differently. In his mind, life felt easier for his brother because he had protected him from parts of the hardship. He carried some of the weight so his younger brother didn’t have to feel all of it.",
      },
      { kind: "p", text: "That stayed with me." },
      {
        kind: "p",
        text: "Two people can grow up under the same roof and still inherit two different memories.",
      },
      {
        kind: "p",
        text: "Perspective shapes the story we tell ourselves about what happened. It shapes what we remember, what we miss, what we survive, and what we believe life was trying to teach us.",
      },
      {
        kind: "p",
        text: "That’s why empathy matters. Perspective can be so strong it can alter memories once further context is provided.",
      },
      {
        kind: "p",
        text: "You can share blood, a home, a city, a culture, or a season with someone and still experience it differently.",
      },
      {
        kind: "strong",
        text: "Same life. Different lens.\nHonor that.\nEveryone is carrying a version of the story only they could have lived.",
      },
    ],
  },
  {
    // Title-only visual page, no visible entry number.
    n: 114,
    title: null,
    aphorism: true,
    blocks: [
      { kind: "display", text: "KNOWLEDGE" },
      { kind: "display", text: "OF SELF" },
    ],
  },
  {
    n: 115,
    title: "REINTRODUCE YOURSELF",
    blocks: [
      {
        kind: "p",
        text: "Knowledge of self means knowing who you are now, not just who people told you you were years ago.",
      },
      {
        kind: "p",
        text: "We take Myers-Briggs tests, personality assessments, astrology charts, numerology readings, love languages, strength finders, and all kinds of tools that try to give language to who we are.",
      },
      { kind: "p", text: "Those tools can be useful. But you have to revisit them." },
      {
        kind: "p",
        text: "A test you took in high school may describe a version of you that no longer exists. A label someone gave you as a child may have followed you longer than it deserved. Even your own idea of yourself can become outdated.",
      },
      { kind: "strong", text: "Build a current dossier on yourself." },
      {
        kind: "p",
        text: "Study your patterns. Your signs. Your instincts. Your strengths. Your weaknesses. Your numbers. Your energy. The rooms that drain you. The work that activates you. The way you communicate, love, lead, create, and respond under pressure.",
      },
      {
        kind: "p",
        text: "You can stretch outside your nature for a season. You can become what the moment requires. But a life spent stretching away from yourself becomes exhaustion.",
      },
      {
        kind: "strong",
        text: "Know the shape of your gift. Then build a life that lets you use it without losing yourself.",
      },
    ],
  },
  {
    // Multi-page entry: opens with the title page "RECLAIM YOUR HERO STORY".
    n: 116,
    title: "KNOW YOUR\nCHAMPION STORIES",
    blocks: [
      { kind: "display", text: "RECLAIM\nYOUR HERO\nSTORY" },
      {
        kind: "p",
        text: "A driver once told me about the hero stories she inherited from her African tribe - the legends she now gives her son.",
      },
      {
        kind: "p",
        text: "She mentioned that in America, too many of our stories begin and end with slavery. Not the resistance. Not the victories. Not the worlds our people built before it. Only the darkness.",
      },
      {
        kind: "p",
        text: "We need our champion stories back. The full depth of your history especially the moments your people survived, built, fought, and found a way through. Hold them close.",
      },
      { kind: "p", text: "The past, reframed with truth, can give the future power." },
      { kind: "strong", text: "Know your Hero-stories. Not just His-story." },
    ],
  },
  {
    n: 117,
    title: "LEAVE SPACE FOR MIRACLES",
    blocks: [
      {
        kind: "p",
        text: "Phoenix White introduced me to this concept and it has transformed my analytical mind.",
      },
      {
        kind: "p",
        text: "I am meticulous. I plan. I prepare. In a lot of the roles I have, I have to think through every scenario and hold a multi-level view of whatever situation I am in. That preparation matters.",
      },
      {
        kind: "p",
        text: "But even with all the preparation, God still laughs at our plans. You can have a vision for where things are going. You can have the framework. You can have the details. You can have the plan. But there still has to be blank canvas left for art to be made.",
      },
      {
        kind: "p",
        text: "Room for miracles. Room for magic. Room for life to surprise you. Being too stringent can work against flow.",
      },
      {
        kind: "p",
        text: "That is why I always say: frameworks to flow to freedom. The framework gets you ready. The flow lets you live. The freedom is what happens when you prepared enough to finally be present.",
      },
      { kind: "strong", text: "Leave space for miracles." },
    ],
  },
];

/* ---------- Public site copy (verbatim where noted) ---------- */

export const BOOK = {
  title: "NOTHING IS RANDOM",
  subtitle: "MAKING SENSE OF WHAT LIFE’S BEEN TRYING TO TELL YOU",
  author: "B. AMECHI",
  // Back-cover blurb — verbatim, PDF p.5
  blurb: [
    "With faith, reflection, and clear-eyed honesty, B. Amechi explores the moments most people overlook — the delays, losses, relationships, opportunities, instincts, and quiet signs that shape who we become. This book does not ask you to believe that life is easy. It asks you to believe that life is speaking.",
    "Through short reflections, personal stories, and high-level frameworks, B. Amechi challenges the idea that anything in your life is meaningless. Every experience carries information. Every season leaves evidence. Every obstacle has something to teach, if you are willing to slow down long enough to see the pattern.",
    "His words offer a way to turn pain into perspective, pressure into purpose, and memory into wisdom. For anyone standing at a crossroads, rebuilding identity, searching for meaning, or learning to trust their own path, each entry is both a mirror and a marker.",
    "Delve into these thoughts, and return to them, again and again, as you learn to see your life with more faith, clarity, and intention.",
  ],
  // Inside flap — verbatim, PDF p.132
  speakingLine: "Your life has been speaking to you the whole time.",
  listeningLine: "The question is, have you been listening?",
  // Contents — verbatim, PDF p.10
  contents: [
    { range: "13–25", label: "PATTERN / FAITH / TIMING" },
    { range: "26–37", label: "SELF-RESPECT / EGO / STANDARD" },
    { range: "38–56", label: "APPLICATION / DISCIPLINE / DECISION" },
    { range: "57–74", label: "PURPOSE / LEGACY / ADVENTURE" },
    { range: "75–88", label: "RELATIONSHIPS / COMMUNITY / VALUE" },
    { range: "89–103", label: "MIND / CREATIVITY / TASTE" },
    { range: "104–129", label: "ORIGIN / FUTURE / MIRACLES" },
    { range: "130–133", label: "REFLECTION / LEGACY / RETURN" },
  ],
  entryCount: 141,
  // Opening pages — verbatim, PDF p.11-12
  foreword: {
    lead: "NONE OF US",
    leadItalic: "arrive alone.",
    lines: [
      "Somebody prayed. Somebody sacrificed.",
      "Somebody opened a door. Somebody gave a lesson.",
      "Somebody became a warning. Somebody became proof.",
    ],
    litany: [
      "THE PAIN.",
      "THE LOVE.",
      "THE TEACHERS.",
      "THE MENTORS.",
      "THE PEERS.",
      "THE FAMILY.",
      "THE LOSSES.",
    ],
    close: [
      "Everything in this book is standing on something that came before it.",
      "The people still here.",
      "The people who are gone but never forgotten.",
      "This is not just my book.",
      "It is a thank-you note to everything that shaped me.",
      "And a reminder to whoever reads it:",
    ],
    closeMark: "NOTHING IS RANDOM",
  },
};

// Author section — verbatim from PDF p.134
export const AUTHOR = {
  name: "B. AMECHI",
  roles: "PRODUCER. STRATEGIST. BUILDER.",
  bio: [
    "B. Amechi is a multimedia entrepreneur, producer, and the Chief Managing Producer and Communications Manager for 19Keys. As the co-founder of High Lvl Media LLC, he leads production and operations for High Level Conversations, 19 Minutes, and other high-impact content under the 19Keys brand.",
    "With over a decade of experience in media, branding, and storytelling, Amechi has helped grow High Level Conversations into a powerhouse platform with more than 100 million YouTube views, 6 million+ podcast downloads, and a global reach across social media.",
    "His work extends beyond media — he’s deeply involved in building brands, hosting live events, producing documentaries, and developing educational platforms that empower individuals to think critically, build wealth, and live in alignment with their purpose.",
    "A strategist, creator, and leader, Amechi is passionate about culture, legacy, and creating systems that stand the test of time.",
  ],
  motto: "FRAMEWORKS TO FLOW TO FREEDOM",
  missionLine: "THIS BOOK IS AN EXTENSION OF THAT MISSION.",
  credentials: [
    "AWARD-WINNING PODCAST PRODUCER",
    "AI STRATEGY & SOLUTIONS",
    "FOUNDER OF CNFDNT",
  ],
  links: {
    site: "https://cnfdnt.co",
    siteLabel: "CNFDNT.CO",
    instagram: "https://instagram.com/b_amechi",
    instagramLabel: "@B_AMECHI",
    email: "mailto:CNFDNT.AI@gmail.com",
    emailLabel: "CNFDNT.AI@GMAIL.COM",
  },
};

export const FAQ = [
  {
    q: "What is Nothing Is Random?",
    a: "A book of 141 numbered entries — short reflections, personal stories, and high-level frameworks by B. Amechi — built on one conviction: every experience carries information, and life has been speaking to you the whole time.",
  },
  {
    q: "How is the book organized?",
    a: "141 entries move through eight movements: Pattern / Faith / Timing, Self-Respect / Ego / Standard, Application / Discipline / Decision, Purpose / Legacy / Adventure, Relationships / Community / Value, Mind / Creativity / Taste, Origin / Future / Miracles, and Reflection / Legacy / Return. Read it front to back, or open a page and let it meet you where you are.",
  },
  {
    q: "What is the Interactive Experience?",
    a: "Entries 1–117 of the book rebuilt as a cinematic scroll film — through the final pages, the outro, and the author's close. Your scroll is the camera: move forward to travel, scroll back to rewind, stop to read. The first ten entries are free for everyone; from Entry 11 you continue with an access code or the Digital Experience.",
  },
  {
    q: "Which formats are coming?",
    a: "Physical copy ($22.22), the Digital Experience ($11.11) — the digital book plus the full interactive online experience — and a limited-time Bundle ($24.99) with everything included. Checkout runs through our Shopify store; every button links straight to it.",
  },
  {
    q: "What is the Free 7-Day Challenge?",
    a: "A free reflection system drawn from the NoThing Is Random workbooks: Connect the Dots, Ten Things Going Right, Focus + Eliminate, Your 80-Year-Old Self, and Seven Days of Paying Attention. Enter your email and complete it online or download the workbooks — no purchase required.",
  },
  {
    q: "How do I hear about the release first?",
    a: "Follow @B_AMECHI on Instagram or visit CNFDNT.CO. The launch will be announced there first.",
  },
  {
    q: "Who is B. Amechi?",
    a: "Producer, strategist, and builder. Co-founder of High Lvl Media and Chief Managing Producer for 19Keys, with over a decade in media, branding, and storytelling. This book is an extension of that mission.",
  },
];

export const EXPERIENCE_PASSWORD = "442144";

/**
 * Access codes that unlock the full experience past Entry 10.
 * "444" is the failsafe passcode delivered with the Digital Experience and
 * Bundle purchases. 442144 remains as an owner/test code. Add more codes
 * (or a Sheets-backed list) here as needed.
 */
export const ACCESS_CODES = [
  "444",
  EXPERIENCE_PASSWORD,
];

/** How many entries are free before the paywall invitation appears. */
export const FREE_ENTRY_LIMIT = 10;

// Outro / back-cover copy — verbatim from V29 back matter.
export const OUTRO = {
  page1: {
    lead: "Wisdom for the moments, meanings, and patterns that shape who we become.",
    paras: [
      "For every moment we call coincidence, there may be a pattern we haven’t yet learned how to read.",
      "For every delay, meeting, loss, redirection, and person who arrived at the wrong time but somehow became part of the right lesson, B. Amechi offers a way of seeing life with more attention, more faith, and more responsibility.",
      "NoThing Is Random asks you to look closer at the life you’re already living.",
      "B. Amechi gathers these thoughts from the roads he has walked: family, faith, business, friendship, grief, love, pressure, purpose, and the quiet work of becoming. Some lessons came through success. Some came through pain. Some came through mentors, mistakes, and moments most people would dismiss as ordinary — until time revealed they were instructions.",
      "That is one of the gifts of this book. It teaches the reader to move forward, while looking backward with new eyes.",
    ],
    litany: [
      "The job that didn’t fit.",
      "The accident that could have ended everything.",
      "The relationship that revealed the mirror.",
      "The opportunity that arrived after the door closed.",
      "The voice inside that kept saying, “Pay attention.”",
    ],
    close: [
      "In these pages, B. Amechi isn’t trying to sound perfect. He’s trying to be useful. He writes as a man who believes wisdom should be passed down, not locked away. He writes for his ancestors, his future children, the youth who need permission to dream, and the adults still learning how much power they already carry.",
      "There are sections here about pattern, self-respect, application, faith, discipline, creativity, and identity. Beneath all of them is one central message:",
    ],
    central: [
      "Your life has been speaking to you the whole time.",
      "The question is, have you been listening?",
    ],
  },
  page2: {
    paras: [
      "B. Amechi’s philosophy is both spiritual and practical. He believes in the power of faith and the necessity of execution. He believes in signs, while understanding that signs still require movement. In his world, faith is participation with the pattern.",
      "This book is for the person standing in transition.",
    ],
    litany: [
      "The one starting over.",
      "The one becoming more serious.",
      "The one trying to understand why certain things had to happen.",
      "The one who knows they’re meant for more, but needs language for what they’ve been feeling.",
    ],
    close: [
      "It is also for the person who has already achieved something, but senses achievement alone is not the whole answer. B. Amechi is interested in alignment. In self-respect. In success that can bless a family, build a community, and echo beyond one lifetime.",
      "NoThing Is Random is a reminder that your story is shaped by what happened to you, and by the meaning you choose to make from it.",
      "Perhaps that is the highest purpose of this book: to help you become a better witness to your own life.",
      "Because once you begin to see the pattern, you also begin to see the responsibility.",
    ],
    resolve: [
      "To move with more intention.",
      "To speak with more truth.",
      "To build with more discipline.",
      "To love with more presence.",
      "It’s not random.",
    ],
    final: [
      "B. Amechi has written this book as a man still on the journey, and as someone willing to leave markers along the road for others.",
      "Read it slowly. Return to it often. Let one page meet you where you are. Let another page challenge where you’re going. Let the pattern reveal itself in pieces.",
      "And when something in these pages feels like it was written exactly for you, don’t be surprised.",
    ],
    mark: "NOTHING IS RANDOM",
  },
};
