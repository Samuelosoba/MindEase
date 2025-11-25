import { ArrowLeft, CheckCircle2, Heart, Music, Video } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const solutions = {
  "exam-pressure": {
    title: "Exam Pressure",
    image:
      "https://images.unsplash.com/photo-1585521551422-497df464aa43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJvb2tzJTIwc3RhY2t8ZW58MXx8fHwxNzYzOTYxNTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  "time-management": {
    title: "Time Management",
    image:
      "https://images.unsplash.com/photo-1761058556617-ddd0f3b9795e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHRpbWUlMjBtYW5hZ2VtZW50fGVufDF8fHx8MTc2Mzk4ODUyOXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  "academic-performance": {
    title: "Academic Performance",
    image:
      "https://images.unsplash.com/photo-1633940907831-945322bc60f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMGRlc2slMjBhY2FkZW1pY3xlbnwxfHx8fDE3NjM5ODg1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  "other-concern": {
    title: "Other Concern",
    image:
      "https://images.unsplash.com/photo-1620302044615-3883082d075a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlc3MlMjBhbnhpZXR5JTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2Mzk4ODUzMHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
};

export function AcademicStressSolution() {
  const [activeTab, setActiveTab] = useState("solution");
  const navigate = useNavigate();
  const location = useLocation();

  const pathKey = location.pathname.substring(1);
  const solution = solutions[pathKey] || solutions["exam-pressure"];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Header Section */}
      <div className="bg-white px-4 sm:px-8 md:px-12 lg:px-16 pt-6 pb-6">
        <div className="">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] text-black tracking-tight mb-1">
              Let's Ease Your Academic Stress
            </h1>
            <p className="text-base sm:text-lg text-black tracking-tight">
              You're not alone. We're here to help you find calm and clarity.
            </p>
          </div>

          {/* Image */}
          <div className="bg-[#e8f2fc] rounded-2xl p-3 flex items-center justify-center h-[180px] sm:h-[200px] md:h-[220px]">
            <img
              src={solution.image}
              alt={solution.title}
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 py-6">
        <button
          onClick={() => setActiveTab("identify")}
          className={`w-full sm:w-[180px] h-[60px] sm:h-[70px] rounded-2xl transition-colors ${
            activeTab === "identify"
              ? "bg-[#1560b7] text-white border border-[#a3c9f5]"
              : "bg-[#e8f2fc] text-[#1560b7]"
          }`}
        >
          <span
            className="text-base sm:text-lg"
            onClick={() => navigate("/user/stress-management")}
          >
            Identify
          </span>
        </button>

        <button
          onClick={() => setActiveTab("solution")}
          className={`w-full sm:w-[180px] h-[60px] sm:h-[70px] rounded-2xl transition-colors ${
            activeTab === "solution"
              ? "bg-[#1560b7] text-white border border-[#a3c9f5]"
              : "bg-[#e8f2fc] text-[#1560b7]"
          }`}
        >
          <span className="text-base sm:text-lg">Solution</span>
        </button>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate("/user/stress-management")}
          className="bg-[#1560b7] text-white w-full sm:w-[200px] h-[60px] sm:h-[70px] rounded-2xl flex items-center justify-center gap-3 hover:bg-[#124d94] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-base sm:text-lg">Back</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-16 pb-12 space-y-6">
        {/* Success Message */}
        <div className="bg-[#e8f2fc] rounded-2xl p-4 sm:p-6 flex items-start sm:items-center gap-4 sm:gap-8">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#43a047] shrink-0" />
          <div>
            <h2 className="text-xl sm:text-2xl text-[#333333] mb-2 tracking-tight">
              Here's Your Personalized Support
            </h2>
            <p className="text-base sm:text-lg text-[#333333] tracking-tight">
              We've curated these resources just for you
            </p>
          </div>
        </div>

        {/* Calm Music Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d2e5f9]">
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="w-20 h-20 sm:w-[100px] sm:h-[100px] bg-[#1560b7] rounded-2xl flex items-center justify-center">
              <Music className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl text-[#333333] tracking-tight">
                Calm Music
              </h3>
              <p className="text-base sm:text-lg text-[#333333] tracking-tight">
                Focus and calm study mix
              </p>
              <button
                className="w-full h-[60px] sm:h-20 bg-[#1560b7] text-white rounded-lg border border-white hover:bg-[#124d94] transition-colors"
                onClick={() => {
                  navigate("/user/sleep-support");
                }}
              >
                Listen Now
              </button>
            </div>
          </div>
        </div>

        {/* Breathing Exercise Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d2e5f9]">
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="w-20 h-20 sm:w-[100px] sm:h-[100px] bg-[#38943c] rounded-2xl flex items-center justify-center">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl text-[#333333] tracking-tight">
                Breathing Exercise
              </h3>
              <p className="text-base sm:text-lg text-[#333333] tracking-tight">
                4-7-8 Breathing
              </p>
              <button
                className="w-full h-[60px] sm:h-20 bg-[#38943c] text-white rounded-lg border border-white hover:bg-[#2d7530] transition-colors"
                onClick={() => {
                  navigate("/user/stress-management/breathing");
                }}
              >
                Start Exercise
              </button>
            </div>
          </div>
        </div>

        {/* Guided Video Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d2e5f9]">
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="w-20 h-20 sm:w-[100px] sm:h-[100px] bg-[#9c19b3] rounded-2xl flex items-center justify-center">
              <Video className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl text-[#333333] tracking-tight">
                Guided Video
              </h3>
              <p className="text-base sm:text-lg text-[#333333] tracking-tight">
                Exam Anxiety Relief
              </p>
              <button className="w-full h-[60px] sm:h-20 bg-[#9c19b3] text-white rounded-lg border border-white hover:bg-[#7d1490] transition-colors">
                Watch Video
              </button>
            </div>
          </div>
        </div>

        {/* Need More Support Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d2e5f9]">
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl text-[#333333] mb-2 tracking-tight">
                Need More Support?
              </h3>
              <p className="text-base sm:text-lg text-[#333333] tracking-tight">
                Connect with our AI assistant or reach out to our partners
              </p>
            </div>

            <div className="space-y-3">
              <button
                className="w-full h-[60px] sm:h-20 bg-[#1a78e5] text-white rounded-lg border border-white hover:bg-[#1560b7] transition-colors"
                onClick={() => {
                  navigate("/user/assistant");
                }}
              >
                Chat with an AI Assistant
              </button>
              <button className="w-full h-[60px] sm:h-20 bg-[#46b94b] text-white rounded-lg border border-white hover:bg-[#38943c] transition-colors">
                Connect with an NGO Partner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center pb-10 px-4 sm:px-16">
        <p className="text-base sm:text-lg text-black tracking-tight">
          Remember: It's okay to not be okay. We're here for you every step of
          the way. 💙
        </p>
      </div>
    </div>
  );
}
