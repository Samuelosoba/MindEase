import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true, // only trigger once
    threshold: 0.3, // trigger when 30% visible
  });

  return (
    <section ref={ref} className="py-35 bg-[#e8f2fc]  text-center">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-[#1560B7]">
            {inView ? <CountUp end={10000} duration={2.5} suffix="+" /> : "0"}
          </h2>
          <p className="mt-2 text-[#1560B7]">Students Helped</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[#1560B7]">
            {inView ? <CountUp end={85} duration={2.5} suffix="%" /> : "0%"}
          </h2>
          <p className="mt-2 text-[#1560B7]">Reduced Stress</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[#1560B7]">
            {inView ? <CountUp end={4.8} decimals={1} duration={2.5} /> : "0"}
          </h2>
          <p className="mt-2 text-[#1560B7]">User Rating</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[#1560B7]">
            {inView ? <CountUp end={24} duration={2.5} suffix="/7" /> : "0/7"}
          </h2>
          <p className="mt-2 text-[#1560B7]">Support Available</p>
        </div>
      </div>
    </section>
  );
}
