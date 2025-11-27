import React from "react";
import { motion } from "framer-motion";
import Stress from "../assets/Stress.png";
import Time from "../assets/time.png";
import Sleep from "../assets/sleep.png";
import Stats from "../Components/Stats";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="bg-[#F9FAFB] min-h-screen md:h-[600px] flex items-center py-12">
        <div className="px-6 sm:px-10 md:px-16 w-full">
          <h1 className="text-[#1560B7] text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Ease Your Mind.
            <br /> Focus on What Matters.
          </h1>

          <p className="mt-6 max-w-2xl text-sm sm:text-lg md:text-xl">
            Navigate academic stress, improve your sleep, and master time
            management with personalized support designed for students like you.
          </p>

          <div className="flex flex-wrap mt-6 gap-4">
            <button
              className="border-[#1560B7] border-2 px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base"
              onClick={() => navigate("/auth")}
            >
              Start Now
            </button>

            <button
              className="bg-[#1560B7] text-white px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base"
              onClick={() => navigate("/about")}
            >
              Learn More
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-6 text-xs sm:text-base">
            <p>100% Free</p>
            <p>Science-backed</p>
            <p>Student-focused</p>
          </div>
        </div>
      </section>

      {/* LEVELS SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="px-6 sm:px-10 md:px-16 my-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              bg: "bg-[#f6f9fe]",
              border: "border-[#E8F2FC]",
              image: Stress,
              title: "Stress Level",
              text: "Manageable",
            },
            {
              bg: "bg-[#f7fcf8]",
              border: "border-[#ECF8ED]",
              image: Sleep,
              title: "Sleep Quality",
              text: "75% Today",
            },
            {
              bg: "bg-[#FEF6F6]",
              border: "border-[#F9D4D2]",
              image: Time,
              title: "Focus Time",
              text: "4 hours",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.bg} border ${item.border} rounded-xl p-6 flex items-center gap-4`}
            >
              <img
                src={item.image}
                alt=""
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm sm:text-base">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* FEATURES SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
        className="bg-[#f9fafc] px-6 sm:px-10 md:px-16 py-12"
        id="features"
      >
        <div className="flex flex-col items-center text-center gap-2">
          <button className="px-6 py-3 sm:px-8 sm:py-4 mb-2 rounded-xl text-[#1560B7] border border-[#1560B7] text-sm sm:text-base">
            Features You Need
          </button>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Everything You Need To Thrive
          </h1>

          <p className="text-sm sm:text-base max-w-xl">
            Comprehensive tools designed specifically for student wellness
          </p>
        </div>

        {/* Responsive Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
        >
          {[
            {
              bg: "bg-[#f6f9fe]",
              border: "border-[#E8F2FC]",
              image: Stress,
              title: "Stress Management",
              text: "Track your stress levels, access guided relaxation exercises, and learn evidence-based coping strategies.",
            },
            {
              bg: "bg-[#f7fcf8]",
              border: "border-[#ECF8ED]",
              image: Time,
              title: "Time Management",
              text: "Plan your study sessions effectively, set realistic goals, and maintain a healthy work-life balance.",
            },
            {
              bg: "bg-[#FEF6F6]",
              border: "border-[#F9D4D2]",
              image: Sleep,
              title: "Sleep Optimization",
              text: "Improve your sleep quality with personalized bedtime routines, sleep tracking, and relaxation techniques.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className={`${item.bg} border ${item.border} rounded-xl p-6 flex flex-col items-start space-y-4`}
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-48 md:h-56 object-cover rounded-2xl"
              />

              <h2 className="text-lg sm:text-xl font-semibold">{item.title}</h2>
              <p className="text-sm sm:text-base">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* STATS SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <Stats />
      </motion.section>
    </div>
  );
}
