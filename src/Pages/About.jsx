import { useNavigate } from "react-router";
import { Heart, Shield, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function About() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 px-6 sm:px-10 md:px-16 py-3"></div>

      {/* PAGE WRAPPER WITH CONSISTENT PADDING */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-6">
        {/* HERO */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-6"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl text-black mb-2">
            We're Here for You
          </h2>
        </motion.div>

        {/* MISSION SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-12"
        >
          <h3 className="text-xl md:text-2xl text-black mb-3">Our Mission</h3>

          <p className="text-sm md:text-base lg:text-lg text-[#333333] mb-3 leading-relaxed">
            Mindease was created for students. Having walked the same path, we
            truly understand the academic pressure and emotional challenges
            students face every day.
          </p>

          <p className="text-sm md:text-base lg:text-lg text-[#333333] mb-3 leading-relaxed">
            We believe every student deserves access to mental health support
            without barriers. MindEase provides free science-backed tools to
            help manage stress, improve sleep and build healthy habits.
          </p>

          <p className="text-sm md:text-base lg:text-lg text-[#333333] leading-relaxed">
            Academic success shouldn't come at the cost of your wellbeing —
            we're here to help you thrive both in and out of the classroom.
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="bg-[#e8f2fc] px-3 py-2 rounded-2xl">
              <span className="text-[#1560b7] text-xs md:text-sm lg:text-base">
                Student-centered
              </span>
            </div>

            <div className="bg-[#edf7ed] px-3 py-2 rounded-2xl">
              <span className="text-[#2a6f2d] text-xs md:text-sm lg:text-base">
                Evidence-Based
              </span>
            </div>

            <div className="bg-[rgba(156,25,179,0.18)] px-3 py-2 rounded-2xl">
              <span className="text-[#cb30e0] text-xs md:text-sm lg:text-base">
                Always Free
              </span>
            </div>
          </div>
        </motion.div>

        {/* HOW WE HELP SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
        >
          {[1, 2, 3].map((num, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="bg-white rounded-2xl p-5 border border-[#d2e5f9]"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#1560b7] rounded-full flex items-center justify-center mb-4">
                <span className="text-xl text-white">{num}</span>
              </div>
              <h4 className="text-lg text-[#333333] mb-1">
                {num === 1
                  ? "Listen & Understand"
                  : num === 2
                  ? "Provide Tools"
                  : "Support Growth"}
              </h4>
              <p className="text-sm md:text-base text-[#333333]">
                {num === 1
                  ? "We hear your challenges and validate your experiences."
                  : num === 2
                  ? "Access practical, research-backed wellness strategies."
                  : "Celebrate your progress and build lasting wellness habits."}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* WHAT DRIVES US */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-12"
        >
          <h3 className="text-xl md:text-2xl text-center mb-6">
            What Drives Us
          </h3>

          <div className="space-y-5">
            {/* EMPATHY */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#1560b7] rounded-full flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="text-lg mb-1">Empathy First</h4>
                <p className="text-sm md:text-base">
                  We approach everything with compassion and understanding.
                </p>
              </div>
            </div>

            {/* SECURITY */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#34a853] rounded-full flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="text-lg mb-1">Privacy & Security</h4>
                <p className="text-sm md:text-base">
                  Your personal information is always safe and never shared.
                </p>
              </div>
            </div>

            {/* INNOVATION */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#cb30e0] rounded-full flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="text-lg mb-1">Continuous Innovation</h4>
                <p className="text-sm md:text-base">
                  We keep improving based on research and your feedback.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* COMMUNITY SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="bg-gradient-to-r from-[#1560b7] to-[#34a853] rounded-3xl p-6 text-white mb-8 mt-12"
        >
          <h3 className="text-xl md:text-2xl text-center mb-4">
            Built by a Community of Supporters
          </h3>

          <p className="text-sm md:text-base max-w-3xl mx-auto text-center mb-6">
            MindEase is supported by mental health professionals and student
            wellness advocates passionate about accessible mental health care.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {[
              "Licensed Therapists",
              "Academic Advisors",
              "Sleep Researchers",
              "Student Advocates",
            ].map((tag) => (
              <div key={tag} className="bg-white/20 px-3 py-2 rounded-2xl">
                <span className="text-xs md:text-sm">{tag}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/stress-management")}
              className="bg-[#e8f2fc] text-[#1560b7] px-6 py-2 rounded-xl text-sm md:text-base hover:bg-white"
            >
              Join our Mission
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
