import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";
import Nav from "../../Components/Nav";

export default function SelectionPage() {
  const [selectedCard, setSelectedCard] = useState("stress");
  const navigate = useNavigate();

  const cards = [
    {
      id: "stress",
      title: "Stress Management",
      description:
        "Track your stress levels, access guided relaxation exercises, and learn coping techniques.",
      image:
        "https://images.unsplash.com/photo-1756032433560-56547efed550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      bg: "bg-gray-50",
      route: "/user/stress-management",
    },
    {
      id: "time",
      title: "Time Management",
      description:
        "Plan your sessions effectively, set realistic goals, and maintain balance.",
      image:
        "https://images.unsplash.com/photo-1763529896738-9eafa27c1324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      bg: "bg-white",
      route: "/user/time-management",
    },
    {
      id: "sleep",
      title: "Sleep Optimization",
      description:
        "Improve your sleep quality with tracking, routines, and relaxation tips.",
      image:
        "https://images.unsplash.com/photo-1615890265358-7a4c4df30036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      bg: "bg-white",
      route: "/user/sleep-support",
    },
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card.id);
    navigate(card.route);
  };

  const handleContinue = () => {
    const selected = cards.find((card) => card.id === selectedCard);
    if (selected) navigate(selected.route);
  };

  // ANIMATION VARIANTS
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // load one-by-one on mobile
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  };

  return (
    <>
      <Nav />

      <div className="bg-gray-50 flex flex-col min-h-screen md:min-h-[calc(100vh)] pt-20 overflow-x-hidden">
        <div className="flex-1 flex flex-col items-center px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 max-w-2xl"
          >
            <h2 className="text-[24px] md:text-[30px] font-semibold text-black mb-1">
              What do you want to improve today?
            </h2>
            <p className="text-[16px] md:text-[20px] text-black">
              Choose your focus area and we'll personalize everything for you.
            </p>
          </motion.div>

          {/* Cards Grid with Stagger Animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="
              grid 
              grid-cols-1 
              md:grid-cols-3 
              gap-4 
              md:gap-6 
              mb-10 
              w-full
              max-w-5xl
            "
          >
            {cards.map((card) => (
              <motion.button
                key={card.id}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(card)}
                className={`
                  ${card.bg}
                  rounded-2xl 
                  p-4 
                  transition-all 
                  cursor-pointer 
                  border 
                  text-left
                  w-full
                  ${
                    selectedCard === card.id
                      ? "border-2 border-[#1560b7]"
                      : "border-[rgba(0,0,0,0.2)]"
                  }
                `}
              >
                <div className="mb-4 rounded-xl overflow-hidden h-[150px] md:h-[170px]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-[18px] md:text-[20px] font-semibold text-black mb-1">
                  {card.title}
                </h3>
                <p className="text-[14px] md:text-[16px] text-black leading-[1.4]">
                  {card.description}
                </p>
              </motion.button>
            ))}
          </motion.div>

          {/* Continue Button */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            onClick={handleContinue}
            className="bg-[#1560b7] text-white px-8 py-3 rounded-full text-[15px] hover:bg-[#104889] transition-all mb-10"
          >
            Continue
          </motion.button>
        </div>
      </div>
    </>
  );
}
