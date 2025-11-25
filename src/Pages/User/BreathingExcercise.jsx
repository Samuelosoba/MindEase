import { useState } from "react";
import { Smile, Box, Wind, Users } from "lucide-react";
import { BreathingModal } from "../../Components/User/BreathingModal";

const exercises = [
  {
    id: "4-7-8",
    title: "4-7-8",
    description: "Perfect for calming anxiety and falling asleep",
    icon: Smile,
    iconBg: "bg-yellow-100",
    level: "Beginner",
    duration: "2 min",
    benefits: ["Reduce Anxiety", "Improves Sleep", "Calm Minds"],
    gradient: "from-[#1a78e5] to-[#63cf80]",
  },
  {
    id: "box",
    title: "Box Breathing",
    description: "Used by athletes and Navy Seals to focus",
    icon: Box,
    iconBg: "bg-orange-100",
    level: "Beginner",
    duration: "3 min",
    benefits: ["Enhances Focus", "Reduces Stress", "Boost Performance"],
    gradient: "from-[#1a78e5] to-[#63cf80]",
  },
  {
    id: "deep-belly",
    title: "Deep Belly Breathing",
    description: "Simple and effective for instant calm",
    icon: Wind,
    iconBg: "bg-pink-100",
    level: "Beginner",
    duration: "3 min",
    benefits: ["Quick Relaxation", "Lowers Heart Rate", "Easy To Learn"],
    gradient: "from-[#1a78e5] to-[#63cf80]",
  },
  {
    id: "alternate-nostrils",
    title: "Alternate Nostrils",
    description: "Balance energy and clear the mind",
    icon: Users,
    iconBg: "bg-blue-100",
    level: "Intermediate",
    duration: "4 min",
    benefits: ["Balance Energy", "Improve Focus", "Reduces Tension"],
    gradient: "from-[#1a78e5] to-[#63cf80]",
  },
];

export function BreathingExercises() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Header Section */}
      <div className="bg-white px-4 sm:px-8 md:px-12 lg:px-16 pt-10 sm:pt-14 md:pt-16 pb-6">
        <div className="max-w-3xl mx-auto">
          {/* Center Illustration */}
          <div className="bg-[#e8f2fc] rounded-2xl p-3 flex items-center justify-center h-[180px] sm:h-[220px] mb-6">
            <div className="text-7xl sm:text-8xl">🧘</div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-[32px] text-black tracking-tight mb-1">
              Breathing Exercises
            </h1>
            <p className="text-base sm:text-lg text-black tracking-tight">
              Take a moment to center yourself. Choose a breathing technique
              that resonates with you.
            </p>
          </div>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 md:py-12 space-y-6">
        {exercises.map((exercise) => {
          const Icon = exercise.icon;
          return (
            <div
              key={exercise.id}
              className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d2e5f9]"
            >
              <div className="space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                  <div
                    className={`w-20 h-20 sm:w-[100px] sm:h-[100px] ${exercise.iconBg} rounded-2xl flex items-center justify-center`}
                  >
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700" />
                  </div>

                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl text-[#333333] mb-1 sm:mb-2 tracking-tight">
                        {exercise.title}
                      </h3>
                      <p className="text-base sm:text-lg text-[#333333] tracking-tight">
                        {exercise.description}
                      </p>
                    </div>

                    {/* Level + Duration */}
                    <div className="flex flex-wrap gap-4 sm:gap-8">
                      <div className="bg-[#d2e5f9] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl">
                        <span className="text-sm sm:text-lg text-[#1560b7]">
                          {exercise.level}
                        </span>
                      </div>
                      <div className="bg-[#daf1db] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl border border-[#6bc76f]">
                        <span className="text-sm sm:text-lg text-[#0e250f]">
                          {exercise.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <p className="text-base sm:text-lg text-[#333333]">
                    Benefits:
                  </p>
                  <p className="text-base sm:text-lg text-[#333333]">
                    {exercise.benefits.map((benefit, idx) => (
                      <span key={idx}>
                        <span className="text-[#43a047] text-xl sm:text-2xl">
                          •{" "}
                        </span>
                        {benefit}
                        {idx < exercise.benefits.length - 1 ? "  " : ""}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Start Button */}
                <button
                  onClick={() => setSelectedExercise(exercise.id)}
                  className={`w-full h-16 sm:h-20 bg-linear-to-r ${exercise.gradient} text-white rounded-lg border border-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
                >
                  <span className="text-sm sm:text-base">Start exercise</span>
                  <svg
                    width="26"
                    height="26"
                    className="sm:w-[30px] sm:h-[30px]"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path d="M8.75 5L21.25 15L8.75 25V5Z" fill="white" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pb-10 sm:pb-12">
        <div className="bg-[#fffbea] rounded-2xl p-4 sm:p-6 border border-[#ffd666]">
          <h3 className="text-lg sm:text-xl text-[#333333] mb-3 sm:mb-4 tracking-tight">
            💡 Breathing Tips for Best Results
          </h3>
          <ul className="space-y-2 text-base sm:text-lg text-[#333333]">
            <li>
              ✓ Find a quiet, comfortable space where you won't be disturbed
            </li>
            <li>✓ Sit or lie down in a relaxed position</li>
            <li>✓ Focus on the rhythm and let go of distracting thoughts</li>
            <li>✓ Practice regularly for maximum benefits</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-10 sm:pb-12 px-4 sm:px-16">
        <p className="text-base sm:text-lg text-black tracking-tight">
          Remember: It's okay to not be okay. We're here for you, every step of
          the way. 💙
        </p>
      </div>

      {/* Modal */}
      <BreathingModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </div>
  );
}
