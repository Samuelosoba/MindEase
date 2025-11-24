import { useState } from "react";
import { useNavigate } from "react-router";
import { StressCard } from "../../Components/User/StressCard";

const stressCategories = [
  {
    title: "Exam Pressure",
    description: "Upcoming tests and deadlines",
    image:
      "https://images.unsplash.com/photo-1585521551422-497df464aa43?crop=entropy&cs=tinysrgb&fit=max&q=80&w=1080",
    route: "/user/stress-management/academics",
  },
  {
    title: "Time Management",
    description: "Too much to do, too little time",
    image:
      "https://images.unsplash.com/photo-1761058556617-ddd0f3b9795e?crop=entropy&cs=tinysrgb&fit=max&q=80&w=1080",
    route: "/user/time-management",
  },
  {
    title: "Academic Performance",
    description: "Worried about grades",
    image:
      "https://images.unsplash.com/photo-1633940907831-945322bc60f3?crop=entropy&cs=tinysrgb&fit=max&q=80&w=1080",
    route: "/academic-performance",
  },
  {
    title: "Other concern",
    description: "Something else on your mind",
    image:
      "https://images.unsplash.com/photo-1620302044615-3883082d075a?crop=entropy&cs=tinysrgb&fit=max&q=80&w=1080",
    route: "/user/assistant",
  },
];

export default function StressManagement() {
  const [activeTab, setActiveTab] = useState("identify");
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Header Section */}
      <div className="bg-white px-4 sm:px-8 md:px-16 pt-10 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Text */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-[32px] font-semibold text-black tracking-tight mb-1">
              Let's Ease Your Academic Stress
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-black tracking-tight">
              You're not alone. We're here to help you find calm and clarity.
            </p>
          </div>

          {/* Image */}
          <div className="bg-[#e8f2fc] rounded-2xl p-3 flex items-center justify-center h-[160px] sm:h-[180px] md:h-[222px]">
            <img
              src="https://images.unsplash.com/photo-1585521551422-497df464aa43?crop=entropy&cs=tinysrgb&fit=max&q=80&w=1080"
              alt="Stack of colorful books"
              className="h-[130px] sm:h-[160px] md:h-[200px] w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 py-6">
        <button
          onClick={() => setActiveTab("identify")}
          className={`
            w-[130px] sm:w-[165px] md:w-[200px]
            h-[50px] sm:h-[60px] md:h-[70px]
            rounded-2xl text-sm sm:text-base md:text-lg
            transition-colors
            ${
              activeTab === "identify"
                ? "bg-[#1560b7] text-white border border-[#a3c9f5]"
                : "bg-[#e8f2fc] text-[#1560b7]"
            }
          `}
        >
          Identify
        </button>

        <button
          onClick={() => setActiveTab("solution")}
          className={`
            w-[130px] sm:w-[165px] md:w-[200px]
            h-[50px] sm:h-[60px] md:h-[70px]
            rounded-2xl text-sm sm:text-base md:text-lg
            transition-colors
            ${
              activeTab === "solution"
                ? "bg-[#1560b7] text-white border border-[#a3c9f5]"
                : "bg-[#e8f2fc] text-[#1560b7]"
            }
          `}
        >
          Solution
        </button>
      </div>

      {/* Section Title */}
      <div className="text-center mb-6 px-4">
        <h2 className="text-2xl sm:text-[28px] md:text-[32px] text-black tracking-tight">
          What's on your mind today?
        </h2>
      </div>

      {/* Stress Cards */}
      <div className="max-w-3xl mx-auto px-4 sm:px-12 md:px-16 pb-12 space-y-5 sm:space-y-6">
        {stressCategories.map((category, index) => (
          <StressCard
            key={index}
            title={category.title}
            description={category.description}
            image={category.image}
            route={category.route}
            navigate={navigate}
          />
        ))}
      </div>

      {/* Footer Message */}
      <div className="text-center pb-10 sm:pb-12 px-4 sm:px-12 md:px-16">
        <p className="text-sm sm:text-base md:text-lg text-black tracking-tight">
          Remember: It's okay to not be okay. We're here for you, every step of
          the way. 💙
        </p>
      </div>
    </div>
  );
}
