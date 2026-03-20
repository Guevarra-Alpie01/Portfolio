import { startTransition, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

const PANEL_TRANSITION_MS = 180;

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 18.2V6.8A2.8 2.8 0 0 1 7.8 4h8.4A2.8 2.8 0 0 1 19 6.8v6.4a2.8 2.8 0 0 1-2.8 2.8H10l-5 2.2Z" />
    </svg>
  );
}

export default function PortfolioChatbot() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isReplying, setIsReplying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState(() => createPortfolioAssistantData());
  const [dataStatus, setDataStatus] = useState("Loading portfolio context...");
  const messagesEndRef = useRef(null);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);
  const previousFocusRef = useRef(null);
  const replyTimeoutRef = useRef(0);
  const closeTimeoutRef = useRef(0);

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
      window.clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, isReplying]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePanel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isVisible) {
      return undefined;
    }

    const focusTimeout = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 40);

    return () => window.clearTimeout(focusTimeout);
  }, [isOpen, isVisible]);

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

  function openPanel() {
    previousFocusRef.current = document.activeElement;
    setIsOpen(true);
    window.clearTimeout(closeTimeoutRef.current);
    window.requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }

  function closePanel() {
    setIsVisible(false);
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
      previousFocusRef.current?.focus?.();
      triggerRef.current?.focus();
    }, PANEL_TRANSITION_MS);
  }

  const dialog = isOpen
    ? createPortal(
        <div
          className={`chatbot-backdrop ${isVisible ? "is-open" : ""}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closePanel();
            }
          }}
        >
          <div
            id="portfolio-assistant-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-assistant-title"
            className={`chatbot-panel ${isVisible ? "is-open" : ""}`}
            data-cursor="interactive"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/8 px-4 py-4 sm:px-5">
              <div>
                <p
                  id="portfolio-assistant-title"
                  className="text-base font-semibold text-sand"
                >
                  Portfolio Assistant
                </p>
                <p className="mt-1 text-sm leading-6 text-mist">
                  Quick answers grounded in portfolio data.
                </p>
              </div>
              <button
                type="button"
                onClick={closePanel}
                className="chatbot-close inline-flex h-10 w-10 items-center justify-center rounded-full text-sand transition hover:text-emberSoft"
                aria-label="Close portfolio assistant"
              >
                <span aria-hidden="true">X</span>
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden px-4 pb-4 pt-4 sm:px-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-mist">
                {dataStatus}
              </p>

              <div
                className="nested-shell chatbot-messages mt-4 flex-1 overflow-y-auto rounded-[1.35rem] p-4"
                aria-live="polite"
              >
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`max-w-[92%] rounded-[1.2rem] px-4 py-3 text-sm leading-6 ${
                        message.role === "assistant"
                          ? "bg-white/5 text-mist"
                          : "ml-auto bg-ember text-white"
                      }`}
                    >
                      {message.text}
                    </div>
                  ))}

                  {isReplying ? (
                    <div className="max-w-[92%] rounded-[1.2rem] bg-white/5 px-4 py-3 text-sm text-mist">
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

              <form onSubmit={handleSubmit} className="mt-4">
                <label className="sr-only" htmlFor="portfolio-assistant-input">
                  Ask the portfolio assistant
                </label>
                <textarea
                  id="portfolio-assistant-input"
                  ref={inputRef}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  className="field-shell min-h-28 w-full rounded-2xl px-4 py-3 text-sand focus:border-ember"
                  placeholder="Ask about projects, stack, skills, or contact info."
                />

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-5 text-mist">
                    This assistant stays inside the portfolio data it can verify.
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
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openPanel}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="portfolio-assistant-dialog"
        className="chatbot-trigger inline-flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold text-sand transition hover:text-emberSoft"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/6 text-emberSoft">
          <ChatIcon />
        </span>
        <span>Open Chat</span>
      </button>
      {dialog}
    </>
  );
}
