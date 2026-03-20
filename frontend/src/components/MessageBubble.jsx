import { useState } from "react";
import { Copy, ThumbsDown, ThumbsUp, Volume2 } from "lucide-react";
import BotLogo from "../assets/BotLogo.png";
import ReactMarkdown from "react-markdown";


export default function MessageBubble({ role, content, id }) {
  const isUser = role === "user";
  const [reaction, setReaction] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleReaction = (nextReaction) => {
    setReaction((current) => (current === nextReaction ? null : nextReaction));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="flex max-w-3xl items-start gap-3">
          <div className="rounded-[24px] rounded-tr-md border border-[#8f5b33] bg-[#73411F] px-5 py-4 text-sm leading-7 text-[#fff8f1] shadow-[0_18px_36px_rgba(115,65,31,0.2)]">
            {content}
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#452815] text-sm font-semibold text-white">
            U
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start" data-message-id={id}>
      <div className="max-w-4xl rounded-[28px] border border-[#d7b48d] bg-[#fff8f1]/78 px-5 py-5 shadow-[0_18px_40px_rgba(115,65,31,0.1)] md:px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b6885d] text-sm font-semibold text-white">
            <img src={BotLogo} alt="" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a6644]">
              Thinkly AyurBot
            </p>
          </div>
        </div>

        <div className="whitespace-pre-wrap mt-3 text-[15px] text-[#5f4128]">
          {/* {content} */}
<ReactMarkdown
  components={{
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-[#452815] mb-2">
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="text-[#5f4128] leading-6 mb-1">
        {children}
      </p>
    ),

    ul: ({ children }) => (
      <ul className="mt-1 mb-2 space-y-1">
        {children}
      </ul>
    ),

    li: ({ children }) => (
      <li className="ml-4 list-disc text-[#5f4128] leading-6">
        {children}
      </li>
    ),

    strong: ({ children }) => (
      <span className="font-semibold text-[#73411F]">
        {children}
      </span>
    ),
  }}
>
  {content}
</ReactMarkdown>

        </div>

        <div className="mt-5 flex items-center gap-3 text-xs text-[#8a6644]">
          <button
            type="button"
            onClick={() => toggleReaction("up")}
            className={`flex h-10 w-10 items-center justify-center rounded-full border bg-[#fffaf4] text-lg transition duration-200 hover:scale-105 active:scale-95 ${
              reaction === "up"
                ? "border-[#73411F] text-[#73411F] shadow-[0_8px_18px_rgba(115,65,31,0.18)]"
                : "border-[#dcc0a2] text-[#8a6644]"
            }`}
            aria-label="Thumbs up"
          >
            <ThumbsUp
              size={18}
              fill={reaction === "up" ? "currentColor" : "none"}
            />
          </button>
          <button
            type="button"
            onClick={() => toggleReaction("down")}
            className={`flex h-10 w-10 items-center justify-center rounded-full border bg-[#fffaf4] text-lg transition duration-200 hover:scale-105 active:scale-95 ${
              reaction === "down"
                ? "border-[#73411F] text-[#73411F] shadow-[0_8px_18px_rgba(115,65,31,0.18)]"
                : "border-[#dcc0a2] text-[#8a6644]"
            }`}
            aria-label="Thumbs down"
          >
            <ThumbsDown
              size={18}
              fill={reaction === "down" ? "currentColor" : "none"}
            />
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex h-10 w-10 items-center justify-center rounded-full border bg-[#fffaf4] text-lg transition duration-200 hover:scale-105 active:scale-95 ${
              copied
                ? "border-[#73411F] text-[#73411F] shadow-[0_8px_18px_rgba(115,65,31,0.18)]"
                : "border-[#dcc0a2] text-[#8a6644]"
            }`}
            aria-label="Copy response"
          >
            <Copy size={18} />
          </button>
          <button
            type="button"
            onClick={handleSpeak}
            className={`flex h-10 w-10 items-center justify-center rounded-full border bg-[#fffaf4] text-lg transition duration-200 hover:scale-105 active:scale-95 ${
              isSpeaking
                ? "border-[#73411F] text-[#73411F] shadow-[0_8px_18px_rgba(115,65,31,0.18)]"
                : "border-[#dcc0a2] text-[#8a6644]"
            }`}
            aria-label="Read response aloud"
          >
            <Volume2 size={18} fill={isSpeaking ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}
