const STATIC_PROFILE = {
  name: "Alpie Guevarra",
  role: "Full-Stack Developer",
  summary:
    "Alpie builds modern web applications with Django, Python, JavaScript, and practical database-backed workflows.",
  focusAreas: [
    "Responsive interfaces for desktop and mobile devices",
    "Backend APIs and database-backed applications",
    "Clean, organized workflows with Git and GitHub",
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/Guevarra-Alpie01",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/guevarra-alpie-m-984103371",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/share/1Amphg5LSD/",
    },
  ],
  cvLabel: "Download CV",
  cvPath: "/documents/alpie-guevarra-cv.txt",
};

const STOP_WORDS = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "can",
  "for",
  "from",
  "has",
  "have",
  "his",
  "her",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "the",
  "their",
  "to",
  "what",
  "who",
  "with",
  "you",
  "your",
]);

export const PORTFOLIO_CHATBOT_SUGGESTIONS = [
  "What tech stack does Alpie use?",
  "Tell me about the featured projects.",
  "What are Alpie's strongest skills?",
  "How can I contact Alpie?",
];

function normalizeText(value) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(value) {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function formatList(items) {
  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function getOverlapScore(question, text) {
  const questionTokens = tokenize(question);
  const textTokens = new Set(tokenize(text));

  return questionTokens.reduce((score, token) => (
    textTokens.has(token) ? score + 1 : score
  ), 0);
}

function pickTopSkills(skills, count = 6) {
  return [...skills]
    .sort((left, right) => right.level - left.level || left.name.localeCompare(right.name))
    .slice(0, count);
}

function getProjectMatch(question, projects) {
  const normalizedQuestion = normalizeText(question);
  let bestMatch = null;
  let bestScore = 0;

  for (const project of projects) {
    const title = normalizeText(project.title);
    const description = normalizeText(project.description);
    let score = getOverlapScore(question, `${project.title} ${project.description} ${project.tech_stack}`);

    if (normalizedQuestion.includes(title)) {
      score += 10;
    }

    if (title.split(" ").some((token) => token && normalizedQuestion.includes(token))) {
      score += 2;
    }

    if (description.includes(normalizedQuestion) && normalizedQuestion.length > 8) {
      score += 2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = project;
    }
  }

  return bestScore >= 2 ? bestMatch : null;
}

function getSkillMatches(question, skills) {
  const normalizedQuestion = normalizeText(question);

  return skills
    .map((skill) => {
      const name = normalizeText(skill.name);
      let score = getOverlapScore(question, skill.name);

      if (normalizedQuestion.includes(name)) {
        score += 4;
      }

      return {
        ...skill,
        score,
      };
    })
    .filter((skill) => skill.score > 0)
    .sort((left, right) => right.score - left.score || right.level - left.level)
    .slice(0, 4);
}

function buildKnowledgeBase({ projects, skills, cvText }) {
  const topSkills = pickTopSkills(skills);
  const projectSummaries = projects.map(
    (project) => `${project.title}: ${project.description} Built with ${project.tech_stack}.`,
  );
  const skillSummary = topSkills.map((skill) => `${skill.name} (${skill.level}%)`);

  const documents = [
    {
      id: "summary",
      text: `${STATIC_PROFILE.summary} Focus areas: ${STATIC_PROFILE.focusAreas.join(". ")}.`,
    },
    {
      id: "skills",
      text: `Current highlighted skills include ${formatList(skillSummary)}.`,
    },
    ...projectSummaries.map((text, index) => ({
      id: `project-${index}`,
      text,
    })),
    {
      id: "cv",
      text: cvText,
    },
  ];

  return {
    profile: STATIC_PROFILE,
    projects,
    skills,
    topSkills,
    cvText,
    documents,
  };
}

function answerGreeting() {
  return {
    answer:
      "I can help with Alpie's projects, skills, stack, portfolio links, and contact options. Try asking about featured work, strongest skills, or how to get in touch.",
    suggestions: PORTFOLIO_CHATBOT_SUGGESTIONS,
  };
}

function answerProfileSummary(knowledgeBase) {
  const topSkills = knowledgeBase.topSkills.slice(0, 4).map((skill) => skill.name);

  return {
    answer:
      `${knowledgeBase.profile.name} is a ${knowledgeBase.profile.role} focused on modern web applications. ` +
      `The portfolio highlights ${formatList(topSkills)} as key strengths, along with database-backed application work and responsive UI delivery.`,
    suggestions: [
      "What projects has Alpie built?",
      "What backend technologies does Alpie use?",
      "How can I contact Alpie?",
    ],
  };
}

function answerSkills(question, knowledgeBase) {
  const matches = getSkillMatches(question, knowledgeBase.skills);
  const highlightedSkills = pickTopSkills(knowledgeBase.skills, 6);

  if (matches.length > 0) {
    const details = matches.map((skill) => `${skill.name} (${skill.level}%)`);

    return {
      answer:
        `Based on the current portfolio data, relevant skills here are ${formatList(details)}. ` +
        `Alpie's work is centered on Django, Python, frontend development, and practical database usage.`,
      suggestions: [
        "What projects use those skills?",
        "What is Alpie's strongest skill?",
        "Tell me about the tech stack.",
      ],
    };
  }

  const topSkillText = highlightedSkills.map((skill) => `${skill.name} (${skill.level}%)`);

  return {
    answer:
      `Alpie's strongest highlighted skills are ${formatList(topSkillText)}. ` +
      `The portfolio also emphasizes Django and Python for backend work, plus JavaScript, HTML, CSS, Tailwind CSS, and Bootstrap on the frontend.`,
    suggestions: [
      "Tell me about the featured projects.",
      "What databases does Alpie use?",
      "How can I contact Alpie?",
    ],
  };
}

function answerProjects(question, knowledgeBase) {
  const matchedProject = getProjectMatch(question, knowledgeBase.projects);

  if (matchedProject) {
    return {
      answer:
        `${matchedProject.title} is one of the featured projects. ${matchedProject.description} ` +
        `Its stack includes ${matchedProject.tech_stack}. GitHub: ${matchedProject.github_link}`,
      suggestions: [
        "What other projects are featured?",
        "What skills support that project?",
        "How can I contact Alpie?",
      ],
    };
  }

  if (knowledgeBase.projects.length === 0) {
    return {
      answer:
        "The chatbot could not load project records right now, but the portfolio is focused on practical full-stack work with Django, React, and database-backed applications.",
      suggestions: PORTFOLIO_CHATBOT_SUGGESTIONS,
    };
  }

  const projectLines = knowledgeBase.projects.slice(0, 3).map(
    (project) => `${project.title} uses ${project.tech_stack}`,
  );

  return {
    answer:
      `The featured portfolio work includes ${formatList(projectLines)}. ` +
      `Each project is presented as practical, portfolio-ready work with a clear GitHub reference.`,
    suggestions: [
      "Tell me about a specific project.",
      "What tech stack does Alpie use?",
      "Which databases show up in the projects?",
    ],
  };
}

function answerContact(knowledgeBase) {
  const socialLines = knowledgeBase.profile.socials.map(
    (social) => `${social.label}: ${social.href}`,
  );

  return {
    answer:
      `You can reach Alpie through the contact form in this section, which saves messages to the portfolio backend. ` +
      `Public portfolio links are ${formatList(socialLines)}. The current public CV text does not list a direct email address or phone number yet.`,
    suggestions: [
      "Show me Alpie's GitHub.",
      "What projects are featured?",
      "What skills are strongest?",
    ],
  };
}

function answerResume(knowledgeBase) {
  return {
    answer:
      `The portfolio includes a downloadable CV here: ${knowledgeBase.profile.cvPath}. ` +
      `It summarizes Alpie as a full-stack developer working with Django, Python, Bootstrap, Tailwind CSS, HTML, CSS, JavaScript, MySQL, PostgreSQL, SQLite, Git, and GitHub.`,
    suggestions: [
      "What tech stack does Alpie use?",
      "How can I contact Alpie?",
      "Tell me about the featured projects.",
    ],
  };
}

function answerSocial(question, knowledgeBase) {
  const normalizedQuestion = normalizeText(question);
  const matchedSocial = knowledgeBase.profile.socials.find((social) => (
    normalizedQuestion.includes(normalizeText(social.label))
  ));

  if (matchedSocial) {
    return {
      answer: `${matchedSocial.label}: ${matchedSocial.href}`,
      suggestions: [
        "How can I contact Alpie?",
        "Tell me about the featured projects.",
        "What are Alpie's strongest skills?",
      ],
    };
  }

  return answerContact(knowledgeBase);
}

function answerFallback(question, knowledgeBase) {
  const rankedDocuments = knowledgeBase.documents
    .map((document) => ({
      ...document,
      score: getOverlapScore(question, document.text),
    }))
    .sort((left, right) => right.score - left.score);

  if (!rankedDocuments[0] || rankedDocuments[0].score === 0) {
    return {
      answer:
        "I can answer questions grounded in the portfolio data, especially about projects, skills, stack, social links, and contact options. If you ask about experience or details not shown in the portfolio yet, I may not have that information.",
      suggestions: PORTFOLIO_CHATBOT_SUGGESTIONS,
    };
  }

  return {
    answer:
      `Based on the portfolio data, ${rankedDocuments[0].text}`,
    suggestions: PORTFOLIO_CHATBOT_SUGGESTIONS,
  };
}

export function createPortfolioAssistantData({
  projects = [],
  skills = [],
  cvText = "",
} = {}) {
  return buildKnowledgeBase({
    projects,
    skills,
    cvText,
  });
}

export function answerPortfolioQuestion(question, knowledgeBase) {
  const normalizedQuestion = normalizeText(question);

  if (!normalizedQuestion) {
    return answerGreeting();
  }

  if (/(hello|hi|hey|good morning|good afternoon|good evening)\b/.test(normalizedQuestion)) {
    return answerGreeting();
  }

  if (/(who is|about alpie|introduce|summary|tell me about alpie)/.test(normalizedQuestion)) {
    return answerProfileSummary(knowledgeBase);
  }

  if (/(resume|cv|curriculum vitae)/.test(normalizedQuestion)) {
    return answerResume(knowledgeBase);
  }

  if (/(github|linkedin|facebook|social)/.test(normalizedQuestion)) {
    return answerSocial(question, knowledgeBase);
  }

  if (/(contact|reach|hire|email|phone|collaborate|freelance|message)/.test(normalizedQuestion)) {
    return answerContact(knowledgeBase);
  }

  if (/(project|projects|work|built|build|portfolio cms|student hub|task sprint|repository|github repo)/.test(normalizedQuestion)) {
    return answerProjects(question, knowledgeBase);
  }

  if (/(skill|skills|stack|tech|technology|frontend|backend|database|python|django|react|javascript|html|css|tailwind|bootstrap|mysql|postgresql|sqlite|git)/.test(normalizedQuestion)) {
    return answerSkills(question, knowledgeBase);
  }

  return answerFallback(question, knowledgeBase);
}
