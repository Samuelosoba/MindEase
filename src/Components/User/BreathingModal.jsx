import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../../Components/User/Dialog";
import { X } from "lucide-react";

export function BreathingModal({ exercise, onClose }) {
  if (!exercise) return null;

  return (
    <Dialog open={!!exercise} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 hover:bg-white transition-colors"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>

          {exercise === "4-7-8" && <FourSevenEightExercise />}
          {exercise === "box" && <BoxBreathingExercise />}
          {exercise === "deep-belly" && <DeepBellyExercise />}
          {exercise === "alternate-nostrils" && <AlternateNostrilsExercise />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ===========================================================
  4-7-8 BREATHING
=========================================================== */
function FourSevenEightExercise() {
  const [phase, setPhase] = useState("ready");
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (phase === "ready") return;

    const phases = {
      inhale: { duration: 4, next: "hold" },
      hold: { duration: 7, next: "exhale" },
      exhale: { duration: 8, next: "inhale" },
    };

    const currentPhase = phases[phase];

    if (count < currentPhase.duration) {
      const timer = setTimeout(() => setCount(count + 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCount(0);

      if (phase === "exhale") {
        setCycle(cycle + 1);

        if (cycle >= 3) {
          setPhase("ready");
          setCycle(0);
          return;
        }
      }

      setPhase(currentPhase.next);
    }
  }, [phase, count, cycle]);

  const getCircleSize = () => {
    if (phase === "inhale") return 200 + (count / 4) * 100;
    if (phase === "exhale") return 300 - (count / 8) * 100;
    return phase === "hold" ? 300 : 200;
  };

  return (
    <div className="bg-linear-to-br from-[#1a78e5] to-[#63cf80] p-12 min-h-[500px] flex flex-col items-center justify-center">
      <h2 className="text-3xl text-white mb-8">4-7-8 Breathing</h2>

      {phase === "ready" ? (
        <div className="text-center space-y-6">
          <p className="text-xl text-white">Get ready to begin...</p>
          <p className="text-lg text-white/90">
            Inhale for 4 seconds, hold 7 seconds, exhale 8 seconds
          </p>
          <button
            onClick={() => setPhase("inhale")}
            className="bg-white text-[#1a78e5] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Exercise
          </button>
        </div>
      ) : (
        <>
          <div className="relative flex items-center justify-center mb-8">
            <div
              className="rounded-full bg-white/30 backdrop-blur-sm transition-all duration-1000 ease-in-out flex items-center justify-center"
              style={{ width: getCircleSize(), height: getCircleSize() }}
            >
              <div className="text-center">
                <div className="text-6xl text-white mb-2">{count}</div>
                <div className="text-2xl text-white capitalize">{phase}</div>
              </div>
            </div>
          </div>

          <p className="text-xl text-white">Cycle {cycle + 1} of 4</p>

          {cycle >= 3 && phase === "exhale" && count >= 7 && (
            <p className="text-lg text-white/90 mt-4">
              Great job! Exercise complete.
            </p>
          )}
        </>
      )}
    </div>
  );
}

/* ===========================================================
  BOX BREATHING
=========================================================== */
function BoxBreathingExercise() {
  const [phase, setPhase] = useState("ready");
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (phase === "ready") return;

    if (count < 4) {
      const timer = setTimeout(() => setCount(count + 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCount(0);

      const nextPhase = {
        inhale: "hold1",
        hold1: "exhale",
        exhale: "hold2",
        hold2: "inhale",
      };

      if (phase === "hold2") {
        setCycle(cycle + 1);

        if (cycle >= 3) {
          setPhase("ready");
          setCycle(0);
          return;
        }
      }

      setPhase(nextPhase[phase]);
    }
  }, [phase, count, cycle]);

  const getBoxPosition = () => {
    const progress = count / 4;

    const positions = {
      inhale: { x: progress * 200, y: 0 },
      hold1: { x: 200, y: progress * 200 },
      exhale: { x: 200 - progress * 200, y: 200 },
      hold2: { x: 0, y: 200 - progress * 200 },
    };

    return positions[phase] || { x: 0, y: 0 };
  };

  const pos = getBoxPosition();

  return (
    <div className="bg-linear-to-br from-[#1a78e5] to-[#63cf80] p-12 min-h-[500px] flex flex-col items-center justify-center">
      <h2 className="text-3xl text-white mb-8">Box Breathing</h2>

      {phase === "ready" ? (
        <div className="text-center space-y-6">
          <p className="text-xl text-white">Get ready to begin...</p>
          <p className="text-lg text-white/90">
            Inhale → Hold → Exhale → Hold (4 sec each)
          </p>

          <button
            onClick={() => setPhase("inhale")}
            className="bg-white text-[#1a78e5] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Exercise
          </button>
        </div>
      ) : (
        <>
          <div className="relative w-[250px] h-[250px] mb-8">
            <div className="absolute inset-0 border-4 border-white/30 rounded-lg" />

            <div
              className="absolute w-12 h-12 bg-white rounded-full transition-all duration-1000 ease-linear flex items-center justify-center"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="text-[#1a78e5]">{count}</span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="text-2xl text-white capitalize">
              {phase === "hold1" || phase === "hold2" ? "Hold" : phase}
            </div>

            <p className="text-xl text-white">Cycle {cycle + 1} of 4</p>
          </div>

          {cycle >= 3 && phase === "hold2" && count >= 3 && (
            <p className="text-lg text-white/90 mt-4">
              Excellent! Exercise complete.
            </p>
          )}
        </>
      )}
    </div>
  );
}

/* ===========================================================
  DEEP BELLY BREATHING
=========================================================== */
function DeepBellyExercise() {
  const [phase, setPhase] = useState("ready");
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (phase === "ready") return;

    const duration = 5;

    if (count < duration) {
      const timer = setTimeout(() => setCount(count + 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCount(0);

      if (phase === "exhale") {
        setCycle(cycle + 1);

        if (cycle >= 5) {
          setPhase("ready");
          setCycle(0);
          return;
        }
      }

      setPhase(phase === "inhale" ? "exhale" : "inhale");
    }
  }, [phase, count, cycle]);

  const getCircleSize = () => {
    if (phase === "inhale") return 150 + (count / 5) * 150;
    if (phase === "exhale") return 300 - (count / 5) * 150;
    return 150;
  };

  return (
    <div className="bg-linear-to-br from-[#1a78e5] to-[#63cf80] p-12 min-h-[500px] flex flex-col items-center justify-center">
      <h2 className="text-3xl text-white mb-8">Deep Belly Breathing</h2>

      {phase === "ready" ? (
        <div className="text-center space-y-6">
          <p className="text-xl text-white">Get ready to begin...</p>

          <p className="text-lg text-white/90">Inhale 5s → Exhale 5s</p>

          <button
            onClick={() => setPhase("inhale")}
            className="bg-white text-[#1a78e5] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Exercise
          </button>
        </div>
      ) : (
        <>
          <div className="relative flex items-center justify-center mb-8">
            <div
              className="rounded-full bg-white/30 backdrop-blur-sm transition-all duration-1000 ease-in-out flex items-center justify-center"
              style={{ width: getCircleSize(), height: getCircleSize() }}
            >
              <div className="text-center">
                <div className="text-6xl text-white mb-2">{count}</div>
                <div className="text-2xl text-white capitalize">{phase}</div>
              </div>
            </div>
          </div>

          <p className="text-xl text-white">Breath {cycle + 1} of 6</p>

          {cycle >= 5 && phase === "exhale" && count >= 4 && (
            <p className="text-lg text-white/90 mt-4">You're done!</p>
          )}
        </>
      )}
    </div>
  );
}

/* ALTERNATE NOSTRILS BREATHING */
function AlternateNostrilsExercise() {
  const [phase, setPhase] = useState("ready");
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (phase === "ready") return;

    const durations = {
      "left-inhale": 4,
      hold: 4,
      "right-exhale": 4,
      "right-inhale": 4,
      hold2: 4,
      "left-exhale": 4,
    };

    const duration = durations[phase];

    if (count < duration) {
      const timer = setTimeout(() => setCount(count + 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCount(0);

      const nextPhase = {
        "left-inhale": "hold",
        hold: "right-exhale",
        "right-exhale": "right-inhale",
        "right-inhale": "hold2",
        hold2: "left-exhale",
        "left-exhale": "left-inhale",
      };

      if (phase === "left-exhale") {
        setCycle(cycle + 1);

        if (cycle >= 3) {
          setPhase("ready");
          setCycle(0);
          return;
        }
      }

      setPhase(nextPhase[phase]);
    }
  }, [phase, count, cycle]);

  const getInstruction = () => {
    const instructions = {
      "left-inhale": "👈 Close right nostril, inhale through left",
      hold: "🙏 Hold both nostrils closed",
      "right-exhale": "👉 Close left nostril, exhale through right",
      "right-inhale": "👉 Keep left nostril closed, inhale through right",
      hold2: "🙏 Hold both nostrils closed",
      "left-exhale": "👈 Close right nostril, exhale through left",
    };

    return instructions[phase] || "";
  };

  return (
    <div className="bg-linear-to-br from-[#1a78e5] to-[#63cf80] p-12 min-h-[500px] flex flex-col items-center justify-center">
      <h2 className="text-3xl text-white mb-8">Alternate Nostrils Breathing</h2>

      {phase === "ready" ? (
        <div className="text-center space-y-6">
          <p className="text-xl text-white">Get ready to begin...</p>

          <div className="text-lg text-white/90 space-y-2">
            <p>Use your thumb and ring finger</p>
            <p>Alternate closing each nostril</p>
          </div>

          <button
            onClick={() => setPhase("left-inhale")}
            className="bg-white text-[#1a78e5] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Exercise
          </button>
        </div>
      ) : (
        <>
          <div className="relative flex items-center justify-center mb-8 bg-white/20 backdrop-blur-sm rounded-3xl p-12">
            <div className="text-center space-y-6">
              <div className="text-8xl">👃</div>
              <div className="text-6xl text-white">{count}</div>

              <div className="text-2xl text-white max-w-md">
                {getInstruction()}
              </div>
            </div>
          </div>

          <p className="text-xl text-white">Round {cycle + 1} of 4</p>

          {cycle >= 3 && phase === "left-exhale" && count >= 3 && (
            <p className="text-lg text-white mt-4">
              Perfect! Exercise Completed.
            </p>
          )}
        </>
      )}
    </div>
  );
}
