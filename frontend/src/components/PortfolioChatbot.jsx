import { startTransition, useEffect, useRef, useState } from "react";

import { fetchPortfolioCvText, fetchProjects, fetchSkills } from "../api";
import {
  answerPortfolioQuestion,
  createPortfolioAssistantData,
  PORTFOLIO_CHATBOT_SUGGESTIONS,
} from "../lib/portfolioAssistant";

let messageSequence = 0;

function createMessage(role, text) {
  messageSequence += 1;

  return {
    id: `${role}-${messageSequence}`,
    role,
    text,
  };
}

const INITIAL_MESSAGE = createMessage(
  "assistant",
  "Ask about Alpie's stack, featured projects, strongest skills, or contact options. I only answer from the portfolio data shown on this site.",
);

export default function PortfolioChatbot() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isReplying, setIsReplying] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState(() => createPortfolioAssistantData());
  const [dataStatus, setDataStatus] = useState("Loading portfolio context...");
  const messagesEndRef = useRef(null);
  const replyTimeoutRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    async function loadKnowledgeBase() {
      const [projectsResult, skillsResult, cvResult] = await Promise.allSettled([
        fetchProjects(),
        fetchSkills(),
        fetchPortfolioCvText(),
      ]);

      if (!isMounted) {
        return;
      }

      const projects = projectsResult.status === "fulfilled" ? projectsResult.value : [];
      const skills = skillsResult.status === "fulfilled" ? skillsResult.value : [];
      const cvText = cvResult.status === "fulfilled" ? cvResult.value : "";

      setKnowledgeBase(createPortfolioAssistantData({ projects, skills, cvText }));

      if (
        projectsResult.status === "fulfilled" &&
        skillsResult.status === "fulfilled" &&
        cvResult.status === "fulfilled"
      ) {
        setDataStatus("Live portfolio data loaded.");
        return;
      }

      setDataStatus("Using the portfolio data currently available on this page.");
    }

    loadKnowledgeBase();

    return () => {
      isMounted = false;
      window.clearTimeout(replyTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isReplying]);

  function queueAssistantReply(question) {
    const reply = answerPortfolioQuestion(question, knowledgeBase);
    setIsReplying(true);
    window.clearTimeout(replyTimeoutRef.current);
    replyTimeoutRef.current = window.setTimeout(() => {
      startTransition(() => {
        setMessages((current) => [...current, createMessage("assistant", reply.answer)]);
      });
      setIsReplying(false);
    }, 220);
  }

  function submitQuestion(question) {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isReplying) {
      return;
    }

    setMessages((current) => [...current, createMessage("user", trimmedQuestion)]);
    setInputValue("");
    queueAssistantReply(trimmedQuestion);
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitQuestion(inputValue);
  }

  return (
    <div className="card-shell rounded-[1.5rem] p-5 md:rounded-[1.75rem] md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-sand">Portfolio Assistant</p>
          <p className="mt-2 text-sm leading-6 text-mist">
            A built-in chatbot that answers from portfolio content, project data,
            skills, and the public CV text.
          </p>
        </div>
        <span className="chip-outline rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.25em] text-emberSoft">
          Beta
        </span>
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.24em] text-mist">
        {dataStatus}
      </p>

      <div
        className="nested-shell mt-5 h-[23rem] overflow-y-auto rounded-[1.4rem] p-4 sm:p-5"
        aria-live="polite"
      >
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[92%] rounded-[1.25rem] px-4 py-3 text-sm leading-6 ${
                message.role === "assistant"
                  ? "bg-white/5 text-mist"
                  : "ml-auto bg-ember text-white"
              }`}
            >
              {message.text}
            </div>
          ))}

          {isReplying ? (
            <div className="max-w-[92%] rounded-[1.25rem] bg-white/5 px-4 py-3 text-sm text-mist">
              Thinking from the portfolio data...
            </div>
          ) : null}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {PORTFOLIO_CHATBOT_SUGGESTIONS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => submitQuestion(prompt)}
            className="ghost-button rounded-full px-3 py-2 text-xs font-medium text-sand transition hover:text-emberSoft"
          >
            {prompt}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-5">
        <label className="grid gap-2 text-sm text-mist">
          Ask the portfolio assistant
          <textarea
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="field-shell min-h-28 rounded-2xl px-4 py-3 text-sand focus:border-ember"
            placeholder="Ask about projects, tech stack, skills, or contact info."
          />
        </label>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-mist">
            This assistant does not invent details outside the portfolio data.
          </p>
          <button
            type="submit"
            disabled={isReplying}
            className="inline-flex items-center justify-center rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff786d] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isReplying ? "Answering..." : "Ask Assistant"}
          </button>
        </div>
      </form>
    </div>
  );
}
