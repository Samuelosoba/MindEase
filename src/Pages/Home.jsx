import React from "react";
import { motion } from "framer-motion";
import Stress from "../assets/Stress.png";
import Time from "../assets/time.png";
import Sleep from "../assets/sleep.png";
import Stats from "../Components/Stats";
import { redirect, useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* HERO SECTION (NO ANIMATION) */}
      <section className="bg-[#F9FAFB] min-h-screen md:h-[600px] flex items-center py-10">
        <div className="px-6 sm:px-10 md:px-16 w-full">
          <h1 className="text-[#1560B7] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Ease Your Mind.
            <br /> Focus on What Matters.
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg">
            Navigate academic stress, improve your sleep, and master time
            management with personalized support designed for students like you.
          </p>

          <div className="flex flex-wrap mt-6 gap-4">
            <button
              className="border-[#1560B7] border-2 px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base"
              onClick={() => {
                navigate("/auth");
              }}
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

          <div className="flex flex-wrap gap-3 mt-6 text-sm sm:text-base">
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
        className="px-6 sm:px-10 md:px-16 mb-12"
      >
        {[
          {
            bg: "bg-[#f6f9fe]",
            border: "border-[#E8F2FC]",
            image: Stress,
            title: "Stress Level",
            text: "Managable",
          },
          {
            bg: "bg-[#f7fcf8]",
            border: "border-[#ECF8ED]",
            image: Sleep,
            title: "Sleep Quality",
            text: "75% Toady",
          },
          {
            bg: "bg-[#FEF6F6]",
            border: "border-[#F9D4D2]",
            image: Stress,
            title: "Focus Time",
            text: "4 hours",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`${item.bg} border ${item.border} rounded-md p-6 flex items-center gap-4 mb-4`}
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
      </motion.section>

      {/* FEATURES SECTION WITH INDIVIDUAL CARD ANIMATIONS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
        className="bg-[#f9fafc] px-6 sm:px-10 md:px-16 py-12"
      >
        <div className="flex flex-col items-center text-center gap-2">
          <button
            className="px-6 py-3 sm:px-8 sm:py-4 mb-2 rounded-xl text-[#1560B7] border border-[#1560B7] text-sm sm:text-base"
            id="features"
          >
            Features You Need
          </button>
          <h1 className="text-xl sm:text-2xl font-bold">
            Everything You Need To Thrive
          </h1>
          <p className="text-sm sm:text-base">
            Comprehensive tools designed specifically for student wellness
          </p>
        </div>

        {/* INDIVIDUAL CARD ANIMATION GRID */}
        <motion.div
          className="mt-12 flex flex-col gap-6"
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
              text: "Plan your study sessions effectively, set realistic goals, and maintain a healthy work-life balance.",
              title: "Time Management",
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
              className={`${item.bg} border ${item.border} rounded-md p-6 flex flex-col space-y-3`}
            >
              <img
                src={item.image}
                alt=""
                className="w-40 md:w-60 md:h-60 h-40 object-cover rounded-2xl"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm sm:text-base">{item.text}</p>
              </div>
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
