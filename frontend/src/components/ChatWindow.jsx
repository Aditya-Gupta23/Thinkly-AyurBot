import { useEffect, useRef } from "react";
import { PanelLeftClose } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import BotLogo from "../assets/BotLogo.png";

const modeSelect = [
  "General Ayurvedic",
  "Diet Planner",
  "Disease Specialist",
  "Yoga teacher",
];

function SidebarContent({
  activeMode,
  onSelectMode,
  onNewChat,
  onCollapseSidebar,
}) {
  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.45em] text-[#452815]">
            Thinkly
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#452815]">
            Ayur Bot
          </h2>
        </div>
        {onCollapseSidebar && (
          <button
            type="button"
            onClick={onCollapseSidebar}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#d7b48d] bg-[#fff8f1] text-[#73411F] shadow-sm transition hover:scale-[1.03] xl:flex"
            aria-label="Close sidebar"
          >
            <PanelLeftClose size={18} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onNewChat}
          className="flex-1 rounded-full bg-[#73411F] px-5 py-3 text-sm font-medium text-[#fff7ef] shadow-[0_14px_24px_rgba(115,65,31,0.28)] transition hover:translate-y-[-1px]"
        >
          + New chat
        </button>
       
      </div>

      <div className="mt-8 flex items-center justify-between text-xs text-[#8a6644]">
        <span>Your Modes</span>
        <span className="font-medium text-[#73411F]">Select any</span>
      </div>

      <div className="mt-4 space-y-2">
        {modeSelect.map((mode) => {
          const isActive = activeMode === mode;

          return (
            <button
              key={mode}
              type="button"
              onClick={() => onSelectMode(mode)}
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${
                isActive
                  ? "bg-[#ead2b4] text-[#73411F] shadow-[0_8px_24px_rgba(115,65,31,0.12)]"
                  : "text-[#5f4128] hover:bg-[#efe0cb]"
              }`}
            >
              <span className="text-base">{isActive ? "◉" : "◌"}</span>
              <span className="truncate">{mode}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto space-y-3 pt-6">
        <div className="flex items-center gap-3 rounded-full border border-[#d7b48d] bg-[#fff7ef] px-4 py-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#73411F] text-sm font-semibold text-white">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-[#452815]">Aditya&apos;s Ayur Bot</p>
            <p className="text-xs text-[#8a6644]">Made for Thinkly Labs</p>
          </div>
        </div>
      </div>
    </>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-md rounded-[28px] border border-[#d7b48d] bg-[#fff8f1]/78 px-5 py-5 shadow-[0_18px_40px_rgba(115,65,31,0.1)] md:px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b6885d] text-sm font-semibold text-white">
            <img src={BotLogo} alt="" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a6644]">
              Thinkly AyurBot
            </p>
            <p className="mt-1 text-sm font-medium text-[#452815]">
              typing...
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#b6885d] [animation-delay:0ms]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#b6885d] [animation-delay:150ms]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#b6885d] [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

export default function ChatWindow({
  messages,
  onSend,
  isSidebarOpen,
  setIsSidebarOpen,
  isSidebarVisible,
  setIsSidebarVisible,
  activeMode,
  setActiveMode,
  isLoading,
  onNewChat,
}) {
  const endRef = useRef(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  return (
    <div className="flex h-full min-h-0 flex-1 items-start gap-0 overflow-hidden p-0 md:gap-6 md:p-6">
      <aside
        className={`hidden h-full shrink-0 overflow-hidden rounded-[32px] border border-[#c6a27d] bg-[#f6e8d4]/95 shadow-[0_24px_70px_rgba(115,65,31,0.12)] backdrop-blur transition-all duration-300 ease-out xl:flex xl:flex-col ${
          isSidebarVisible
            ? "w-[290px] translate-x-0 p-5 opacity-100"
            : "pointer-events-none w-0 -translate-x-4 p-0 opacity-0 border-transparent"
        }`}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
          <SidebarContent
            activeMode={activeMode}
            onSelectMode={setActiveMode}
            onNewChat={onNewChat}
            onCollapseSidebar={() => setIsSidebarVisible(false)}
          />
        </div>
      </aside>

      <section className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-none border-y-[3px] border-[#d7b48d] bg-[linear-gradient(180deg,rgba(255,248,239,0.84),rgba(243,229,209,0.9))] shadow-none backdrop-blur md:rounded-[34px] md:border md:shadow-[0_32px_90px_rgba(115,65,31,0.12)]">
        {isSidebarOpen && (
          <div className="absolute inset-0 z-40 xl:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-[#452815]/20 backdrop-blur-[2px]"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close menu"
            />
            <aside className="absolute left-2 top-2 bottom-2 flex w-[min(320px,calc(100%-1rem))] flex-col overflow-hidden rounded-[28px] border border-[#c6a27d] bg-[#f6e8d4]/98 p-4 shadow-[0_24px_70px_rgba(115,65,31,0.18)]">
              <div className="mb-4 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7b48d] bg-[#fff8f1] text-xl text-[#452815]"
                  aria-label="Close menu"
                >
                  ×
                </button>
              </div>
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
                <SidebarContent
                  activeMode={activeMode}
                  onSelectMode={setActiveMode}
                  onNewChat={onNewChat}
                  onCollapseSidebar={null}
                />
              </div>
            </aside>
          </div>
        )}

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-4 md:px-8 md:py-6 xl:px-10">
          {!hasMessages ? (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="flex shrink-0 flex-col items-center justify-center py-10 text-center">
                <div className="max-w-2xl">
                  <p className="text-sm font-medium uppercase tracking-[0.5em] text-[#8a6644]">
                    Thinkly Ayur Bot
                  </p>
                  <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#452815] md:text-5xl">
                    Ask about digestion, sleep, immunity, or a balanced daily
                    routine.
                  </h1>
                  <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#8a6644]">
                    A calmer, more premium chat surface inspired by the
                    reference UI, adapted for your wellness assistant.
                  </p>
                </div>
              </div>

              <div className="min-h-0 flex-1" />
            </div>
          ) : (
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <div className="flex min-h-full flex-col gap-6 pb-6">
                {messages.map((message, index) => (
                  <MessageBubble
                    key={`${message.role}-${index}`}
                    id={`${message.role}-${index}`}
                    role={message.role}
                    content={message.content}
                  />
                ))}

                {isLoading && <TypingIndicator />}

                <div ref={endRef} />
              </div>
            </div>
          )}

          <ChatInput onSend={onSend} />
        </div>
      </section>
    </div>
  );
}
