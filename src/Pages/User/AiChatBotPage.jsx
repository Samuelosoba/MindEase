import { useState, useRef, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import axios from "axios";
import api from "../../Utils/axios";

export const AIChatbotPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! I'm MindEase, your AI Assistant here to help you. How are you feeling today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  const quickSuggestions = [
    "Breathing Exercises",
    "Study Tips",
    "Sleep Optimization",
    "Stress Relief Tips",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const newMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      // Replace with your backend AI route
      const res = await api.post("/chat-llm", { message: text });

      const reply = res.data.reply || "I’m here with you.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white p-4">
      {/* Top Title */}
      <h2 className="text-center text-xl font-bold text-blue-700 mb-3">
        MindEase
      </h2>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-hidden bg-gray-50 rounded-xl shadow-inner p-4"
      >
        <div className="h-full overflow-y-auto pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`my-2 p-3 rounded-lg max-w-[80%] text-sm ${
                msg.role === "assistant"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 ml-auto text-blue-800"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <p className="text-gray-500 text-xs mt-2">MindEase is typing…</p>
          )}
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="mt-3">
        <p className="text-gray-700 font-semibold text-sm mb-2">
          Quick Suggestions
        </p>

        <div className="flex flex-wrap gap-2 justify-center">
          {quickSuggestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(item)}
              className="border px-3 py-1.5 rounded-full bg-white text-xs shadow-sm hover:bg-gray-100"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-xs mt-1 text-center">{error}</p>
      )}

      {/* Input Box */}
      <div className="mt-3 flex items-center border rounded-full px-4 py-3 bg-white shadow-sm">
        <input
          type="text"
          value={input}
          placeholder="What's on your mind today?"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          className="flex-1 outline-none text-sm"
        />
        <FiMessageCircle
          className="text-blue-600 text-xl cursor-pointer"
          onClick={() => sendMessage(input)}
        />
      </div>

      <p className="text-gray-400 text-xs mt-2 text-center">
        Your conversations are secured by end-to-end encryption.
      </p>
    </div>
  );
};
