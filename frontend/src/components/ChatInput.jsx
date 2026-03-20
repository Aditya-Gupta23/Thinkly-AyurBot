import { useEffect, useRef, useState } from "react";
import { Mic, Send, Square } from "lucide-react";
export default function ChatInput({ onSend }) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);
  const shouldKeepListeningRef = useRef(false);
  const manuallyStoppedRef = useRef(false);
  const restartTimeoutRef = useRef(null);
  const transcriptBaseRef = useRef("");
  const finalTranscriptRef = useRef("");
  const interimTranscriptRef = useRef("");

  const buildTranscriptValue = () =>
    `${transcriptBaseRef.current}${finalTranscriptRef.current}${interimTranscriptRef.current}`.trim();

  const commitTranscriptToInput = () => {
    const transcript = buildTranscriptValue();
    setInput(transcript);
    return transcript;
  };

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    if (isListening) {
      manuallyStoppedRef.current = true;
      shouldKeepListeningRef.current = false;
      commitTranscriptToInput();
      recognitionRef.current?.stop?.();
      setIsListening(false);
    }
    onSend(trimmedInput);
    setInput("");
    transcriptBaseRef.current = "";
    finalTranscriptRef.current = "";
    interimTranscriptRef.current = "";
  };

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    const nextHeight = Math.min(textareaRef.current.scrollHeight, 96);
    textareaRef.current.style.height = `${Math.max(nextHeight, 48)}px`;
  }, [input]);

  useEffect(() => {
    return () => {
      if (restartTimeoutRef.current) {
        window.clearTimeout(restartTimeoutRef.current);
      }
      shouldKeepListeningRef.current = false;
      manuallyStoppedRef.current = true;
      recognitionRef.current?.stop?.();
    };
  }, []);

  const handleMicToggle = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    if (isListening) {
      manuallyStoppedRef.current = true;
      shouldKeepListeningRef.current = false;
      commitTranscriptToInput();
      recognitionRef.current?.stop?.();
      setIsListening(false);
      return;
    }

    shouldKeepListeningRef.current = true;
    manuallyStoppedRef.current = false;
    transcriptBaseRef.current = input ? `${input.trim()} ` : "";
    finalTranscriptRef.current = "";
    interimTranscriptRef.current = "";

    let recognition = recognitionRef.current;

    if (!recognition) {
      recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.continuous = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let index = event.resultIndex; index < event.results.length; index += 1) {
          const result = event.results[index];
          const text = result[0]?.transcript || "";

          if (result.isFinal) {
            finalTranscript += text;
          } else {
            interimTranscript += text;
          }
        }

        if (finalTranscript) {
          finalTranscriptRef.current += finalTranscript;
        }

        interimTranscriptRef.current = interimTranscript;
        commitTranscriptToInput();
      };

      recognition.onend = () => {
        if (manuallyStoppedRef.current || !shouldKeepListeningRef.current) {
          commitTranscriptToInput();
          setIsListening(false);
          return;
        }

        restartTimeoutRef.current = window.setTimeout(() => {
          try {
            recognition.start();
          } catch {
            setIsListening(false);
          }
        }, 180);
      };

      recognition.onerror = (event) => {
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          shouldKeepListeningRef.current = false;
          manuallyStoppedRef.current = true;
          setIsListening(false);
          return;
        }

        if (event.error === "aborted") {
          return;
        }
      };

      recognitionRef.current = recognition;
    }

    try {
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div className="pointer-events-none mt-4 shrink-0 flex justify-center px-2 pb-1 md:mt-6 md:px-0">
      <div className="pointer-events-auto flex w-full max-w-5xl items-end gap-2 rounded-[24px] border border-[#d7b48d] bg-[#fff8f1]/95 px-3 py-2 shadow-[0_22px_60px_rgba(115,65,31,0.14)] backdrop-blur md:gap-3 md:rounded-[30px] md:px-4 md:py-3">
        <textarea
          ref={textareaRef}
          rows={1}
          className="min-h-[42px] flex-1 resize-none bg-transparent py-2 text-sm text-[#5f4128] outline-none placeholder:text-[#9d7c59] md:min-h-[48px] md:py-3"
          placeholder="What's on your mind today?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <button
          type="button"
          onClick={handleMicToggle}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-white shadow-[0_14px_28px_rgba(115,65,31,0.18)] transition hover:scale-[1.03] md:h-12 md:w-12 ${
            isListening
              ? "border-[#73411F] bg-[#b6885d]"
              : "border-[#d79a54] bg-[#ead2b4] text-[#73411F]"
          }`}
          aria-label={isListening ? "Stop microphone" : "Start microphone"}
        >
          {isListening ? <Square size={18} /> : <Mic size={18} />}
        </button>

        <button
          type="button"
          onClick={handleSend}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#73411F] text-white shadow-[0_14px_28px_rgba(115,65,31,0.24)] transition hover:scale-[1.03] md:h-12 md:w-12"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
