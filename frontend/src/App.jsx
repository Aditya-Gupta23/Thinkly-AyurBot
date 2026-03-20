import { useState } from "react";
import axios from "axios";
import LeafImg from "./assets/LeafImg.png";
import ChatWindow from "./components/ChatWindow";

const API_BASE_URL = "/api";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeMode, setActiveMode] = useState("General Ayurvedic");
  const [showNewChatConfirm, setShowNewChatConfirm] = useState(false);

  const handleNewChat = () => {
    setShowNewChatConfirm(true);
  };

  const confirmNewChat = () => {
    setShowNewChatConfirm(false);
    window.location.reload();
  };

  const sendMessage = async (text) => {
    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/chat`, {
        message: text,
        mode: activeMode,
      });

      const botMessage = {
        role: "bot",
        content:
          data.reply ||
          "I couldn't generate a full response just now, but I'm still here to help.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "I couldn't reach the API right now. If you're running locally, use the Vercel serverless route or set VITE_API_BASE_URL.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#E0C4A0]">
      <div className="fixed inset-0 pointer-events-none">
        <img
          src={LeafImg}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[70vh] w-auto min-h-[460px] max-h-[900px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.22] saturate-[0.9]"
        />
      </div>

      <div className="relative flex h-screen w-full flex-col overflow-hidden border-[4px] border-[#452815] bg-[#e8cfb0]/88 shadow-[0_30px_80px_rgba(69,40,21,0.16)] backdrop-blur-[2px]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,249,241,0.4),rgba(224,196,160,0.15))]" />
        <div className="relative z-10 border-b border-[#6a3d1f] bg-[#452815] text-[#fff7ef]">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    if (window.innerWidth >= 1280) {
                      setIsSidebarVisible((current) => !current);
                      return;
                    }

                    setIsSidebarOpen((current) => !current);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b6885d] bg-[#5a341c] text-[#fff7ef] transition hover:scale-[1.03]"
                  aria-label="Toggle sidebar"
                >
                  <span
                    className={`flex flex-col gap-1.5 transition-transform duration-300 ${
                      (window.innerWidth >= 1280 && !isSidebarVisible) ||
                      (window.innerWidth < 1280 && isSidebarOpen)
                        ? "rotate-180"
                        : ""
                    }`}
                  >
                    <span className="block h-0.5 w-5 rounded-full bg-current" />
                    <span className="block h-0.5 w-5 rounded-full bg-current" />
                    <span className="block h-0.5 w-5 rounded-full bg-current" />
                  </span>
                </button>
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.4em] text-[#f4dfc4]">
                Thinkly
              </span>
              <span className="hidden rounded-full border border-[#b6885d] bg-[#5a341c] px-3 py-1 text-xs text-[#f4dfc4] lg:inline-flex">
                {activeMode}
              </span>
            </div>

            <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
              <a href="#about" className="transition hover:text-[#E0C4A0]">
                About Us
              </a>
              <a href="#services" className="transition hover:text-[#E0C4A0]">
                Our Services
              </a>
              <a href="#contact" className="transition hover:text-[#E0C4A0]">
                Contact
              </a>
            </nav>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1">
          <ChatWindow
            messages={messages}
            onSend={sendMessage}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            isLoading={isLoading}
            onNewChat={handleNewChat}
          />
        </div>

        {showNewChatConfirm && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#452815]/35 px-4 backdrop-blur-[4px]">
            <div className="w-full max-w-md rounded-[30px] border border-[#b6885d] bg-[linear-gradient(180deg,rgba(255,248,239,0.96),rgba(243,229,209,0.98))] p-6 shadow-[0_30px_80px_rgba(69,40,21,0.22)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#73411F] text-xl font-semibold text-[#fff7ef] shadow-[0_14px_24px_rgba(115,65,31,0.22)]">
                !
              </div>

              <h2 className="mt-5 text-2xl font-semibold text-[#452815]">
                Start A New Chat?
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#6a4a2b]">
                Your current conversation will be lost. If you want to keep it,
                copy anything important before continuing.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowNewChatConfirm(false)}
                  className="rounded-full border border-[#d7b48d] bg-[#fff8f1] px-5 py-3 text-sm font-medium text-[#73411F] transition hover:bg-[#f6e8d4]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmNewChat}
                  className="rounded-full bg-[#73411F] px-5 py-3 text-sm font-medium text-[#fff7ef] shadow-[0_14px_24px_rgba(115,65,31,0.22)] transition hover:translate-y-[-1px]"
                >
                  Start New Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
