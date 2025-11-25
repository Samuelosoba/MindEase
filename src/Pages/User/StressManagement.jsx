import { useState } from "react";
import { useNavigate } from "react-router";
import { StressCard } from "../../Components/User/StressCard";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

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
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="bg-white px-4 sm:px-8 md:px-16 pt-10 pb-6"
      >
        <div className="">
          {/* Text */}
          <div className="text-center mb-6">
            <motion.h1
              className="text-lg md:text-2xl  font-semibold text-black tracking-tight mb-1"
              {...fadeUp}
            >
              Let's Ease Your Academic Stress
            </motion.h1>

            <motion.p
              className=" text-black tracking-tight"
              {...fadeUp}
              transition={{ delay: 0.1 }}
            >
              You're not alone. We're here to help you find calm and clarity.
            </motion.p>
          </div>

          {/* Image */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="bg-[#e8f2fc] rounded-2xl p-3 flex items-center justify-center h-[150px] sm:h-[170px] md:h-[210px]"
          >
            <img
              src="https://images.unsplash.com/photo-1585521551422-497df464aa43?crop=entropy&cs=tinysrgb&fit=max&q=80&w=1080"
              alt="Stack of colorful books"
              className="h-[120px] sm:h-[150px] md:h-[190px] w-auto object-contain"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 py-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab("identify")}
          className={`
            w-[120px] sm:w-[150px] md:w-[180px]
            h-[45px] sm:h-[55px] md:h-[65px]
            rounded-2xl text-xs sm:text-sm md:text-base
            transition-all border
            ${
              activeTab === "identify"
                ? "bg-[#1560b7] text-white border-[#a3c9f5]"
                : "bg-[#e8f2fc] text-[#1560b7] border-transparent"
            }
          `}
        >
          Identify
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab("solution")}
          className={`
            w-[120px] sm:w-[150px] md:w-[180px]
            h-[45px] sm:h-[55px] md:h-[65px]
            rounded-2xl text-xs sm:text-sm md:text-base
            transition-all border
            ${
              activeTab === "solution"
                ? "bg-[#1560b7] text-white border-[#a3c9f5]"
                : "bg-[#e8f2fc] text-[#1560b7] border-transparent"
            }
          `}
        >
          Solution
        </motion.button>
      </div>

      {/* Section Title */}
      <motion.h2
        {...fadeUp}
        transition={{ delay: 0.1 }}
        className="text-center mb-6 px-4 text-lg sm:text-xl md:text-2xl text-black tracking-tight"
      >
        What's on your mind today?
      </motion.h2>

      {/* Stress Cards */}
      <div className="max-w-3xl mx-auto px-4 sm:px-12 md:px-16 pb-12 space-y-5 sm:space-y-6">
        {stressCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StressCard
              title={category.title}
              description={category.description}
              image={category.image}
              route={category.route}
              navigate={navigate}
              onSelect={() => {
                const autoSwitch = ["Exam Pressure", "Academic Performance"];
                if (autoSwitch.includes(category.title)) {
                  setActiveTab("solution");
                }
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Footer Message */}
      <motion.div
        {...fadeUp}
        transition={{ delay: 0.2 }}
        className="text-center pb-10 sm:pb-12 px-4 sm:px-12 md:px-16"
      >
        <p className="text-xs sm:text-sm md:text-base text-black tracking-tight">
          Remember: It's okay to not be okay. We're here for you, every step of
          the way. 💙
        </p>
      </motion.div>
    </div>
  );
}
