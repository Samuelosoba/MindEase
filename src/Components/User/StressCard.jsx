import { motion } from "framer-motion";

export function StressCard({
  title,
  description,
  image,
  route,
  navigate,
  index,
  onSelect,
}) {
  return (
    <motion.div
      onClick={() => {
        if (onSelect) onSelect(); // <-- callback to parent
        navigate(route);
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1, // stagger each card
        ease: "easeOut",
      }}
      className="
        bg-white rounded-2xl p-4 sm:p-5 md:p-6 
        shadow-[0px_5px_10px_0px_rgba(0,0,0,0.25)] 
        border border-[#d2e5f9]
        hover:shadow-lg transition-shadow cursor-pointer
      "
    >
      <div className="flex flex-col gap-6 sm:gap-7 md:gap-8">
        {/* Image */}
        <div
          className="
            w-[70px] h-[70px]
            sm:w-[85px] sm:h-[85px]
            md:w-[100px] md:h-[100px]
            rounded-2xl overflow-hidden mx-auto sm:mx-0
          "
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Text */}
        <div className="text-center sm:text-left">
          <h3
            className="
              text-xl sm:text-2xl md:text-3xl 
              text-[#333333] mb-1 md:mb-2 tracking-tight
            "
          >
            {title}
          </h3>

          <p
            className="
              text-sm sm:text-base md:text-lg 
              text-[#333333] tracking-tight leading-snug
            "
          >
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
