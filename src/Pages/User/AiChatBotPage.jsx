import { FiMessageCircle } from "react-icons/fi";

export const AIChatbotPage = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-xl font-bold text-blue-700 mb-6">MindEase</h2>

      <div className="w-full bg-green-100 text-green-800 p-4 rounded-xl inline-block mb-5 text-sm">
        Hi there! I'm MindEase. Your AI Assistant here to help you. How are you
        feeling today?
      </div>

      <div className="text-left mb-4 font-semibold text-gray-700">
        Quick Suggestions
      </div>

      <div className="flex gap-3 flex-wrap justify-center mb-6">
        {[
          "Breathing Exercises",
          "Study Tips",
          "Sleep Optimization",
          "Stress Relief Tips",
        ].map((item, index) => (
          <button
            key={index}
            className="border px-4 py-2 rounded-full bg-white hover:bg-gray-100 text-sm shadow-sm"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex items-center border rounded-full px-4 py-3 bg-white shadow-sm">
        <input
          type="text"
          placeholder="What's on your mind today?"
          className="flex-1 outline-none text-sm"
        />
        <FiMessageCircle className="text-blue-600 text-xl" />
      </div>

      <p className="text-gray-400 text-xs mt-4">
        Your conversations are secured by end-to-end encryption.
      </p>
    </div>
  );
};
