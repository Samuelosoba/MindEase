import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import svgPaths from "../../assets/svg-36j4gnjs86";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../Components/User/Dialog";
import { Moon, BookOpen, Trees, User } from "lucide-react";
const tracks = [
  {
    id: 1,
    title: "Ocean Waves",
    duration: "57:55",
    image:
      "https://images.unsplash.com/photo-1560614685-a933167870d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzJTIwd2F0ZXJ8ZW58MXx8fHwxNzYzMjkxNjExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    audio: "https://assets.mixkit.co/active_storage/sfx/2390/2390-preview.mp3",
  },
  {
    id: 2,
    title: "Rain Fall",
    duration: "60:00",
    image:
      "https://images.unsplash.com/photo-1690198054251-8ffcdf2772b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWluJTIwZHJvcHMlMjB3aW5kb3d8ZW58MXx8fHwxNzYzMzUwOTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    audio: "https://assets.mixkit.co/active_storage/sfx/2393/2393-preview.mp3",
  },
  {
    id: 3,
    title: "White Noise",
    duration: "70:55",
    image:
      "https://images.unsplash.com/photo-1640444254020-1ecd206b4e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG5vaXNlJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzYzMzg2ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    audio: "https://assets.mixkit.co/active_storage/sfx/2390/2390-preview.mp3",
  },
  {
    id: 4,
    title: "Forest Bird",
    duration: "45:50",
    image:
      "https://images.unsplash.com/photo-1659839946290-3e4741cba27f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBiaXJkcyUyMG5hdHVyZXxlbnwxfHx8fDE3NjMzODY4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    audio: "https://assets.mixkit.co/active_storage/sfx/1210/1210-preview.mp3",
  },
  {
    id: 5,
    title: "Calm Piano",
    duration: "120:00",
    image:
      "https://images.unsplash.com/photo-1601313387875-892dd18fabb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWFubyUyMGtleXMlMjBtdXNpY3xlbnwxfHx8fDE3NjMzODY4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    audio: "https://assets.mixkit.co/music/614/614.mp3",
  },
  {
    id: 6,
    title: "Meditation Bell",
    duration: "50:00",
    image:
      "https://images.unsplash.com/photo-1762339157963-5209639d12af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwYmVsbCUyMHBlYWNlZnVsfGVufDF8fHx8MTc2MzM4Njg0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    audio: "https://assets.mixkit.co/music/127/127.mp3",
  },
  {
    id: 7,
    title: "Gentle Stream",
    duration: "55:00",
    image: "https://images.unsplash.com/photo-1519817914152-22a4f6116f81",
    audio: "https://assets.mixkit.co/active_storage/sfx/2326/2326-preview.mp3",
  },
  {
    id: 8,
    title: "Night Crickets",
    duration: "50:00",
    image: "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0",
    audio: "https://assets.mixkit.co/active_storage/sfx/2328/2328-preview.mp3",
  },
  {
    id: 9,
    title: "Soft Thunder",
    duration: "65:00",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    audio: "https://assets.mixkit.co/active_storage/sfx/2331/2331-preview.mp3",
  },
  {
    id: 10,
    title: "Wind Chimes",
    duration: "30:00",
    image: "https://images.unsplash.com/photo-1562183241-b937d1e80d76",
    audio: "https://assets.mixkit.co/active_storage/sfx/2461/2461-preview.mp3",
  },
  {
    id: 11,
    title: "Delta Waves",
    duration: "90:00",
    image: "https://images.unsplash.com/photo-1526715908961-46e1600f5b42",
    audio: "https://assets.mixkit.co/active_storage/sfx/2392/2392-preview.mp3",
  },
  {
    id: 12,
    title: "Deep Rest",
    duration: "80:00",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    audio: "https://assets.mixkit.co/active_storage/sfx/2376/2376-preview.mp3",
  },
  {
    id: 13,
    title: "Gentle Rain",
    duration: "62:00",
    image: "https://images.unsplash.com/photo-1502880704435-b44c09153a0e",
    audio: "https://assets.mixkit.co/active_storage/sfx/2332/2332-preview.mp3",
  },
  {
    id: 14,
    title: "Soft Focus",
    duration: "45:00",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    audio: "https://assets.mixkit.co/active_storage/sfx/2501/2501-preview.mp3",
  },
  {
    id: 15,
    title: "Concentration Flow",
    duration: "50:00",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967e",
    audio: "https://assets.mixkit.co/active_storage/sfx/2377/2377-preview.mp3",
  },
  {
    id: 16,
    title: "Study Ambience",
    duration: "60:00",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    audio: "https://assets.mixkit.co/active_storage/sfx/2503/2503-preview.mp3",
  },
  {
    id: 17,
    title: "Coffee Shop",
    duration: "55:00",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    audio: "https://assets.mixkit.co/active_storage/sfx/2329/2329-preview.mp3",
  },
  {
    id: 18,
    title: "Library Quiet",
    duration: "40:00",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    audio: "https://assets.mixkit.co/active_storage/sfx/2504/2504-preview.mp3",
  },
  {
    id: 19,
    title: "Mountain Wind",
    duration: "57:00",
    image: "https://images.unsplash.com/photo-1508261303786-7c7f24d54e8c",
    audio: "https://assets.mixkit.co/active_storage/sfx/2414/2414-preview.mp3",
  },
  {
    id: 20,
    title: "Jungle Morning",
    duration: "55:00",
    image: "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da",
    audio: "https://assets.mixkit.co/active_storage/sfx/2325/2325-preview.mp3",
  },
  {
    id: 21,
    title: "Desert Night",
    duration: "60:00",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    audio: "https://assets.mixkit.co/active_storage/sfx/2413/2413-preview.mp3",
  },
  {
    id: 22,
    title: "Arctic Silence",
    duration: "70:00",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    audio: "https://assets.mixkit.co/active_storage/sfx/2409/2409-preview.mp3",
  },
  {
    id: 23,
    title: "Autumn Leaves",
    duration: "42:00",
    image: "https://images.unsplash.com/photo-1445820135718-b73a1a5a5d54",
    audio: "https://assets.mixkit.co/active_storage/sfx/2374/2374-preview.mp3",
  },
  {
    id: 24,
    title: "Breathing Guide",
    duration: "15:00",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    audio: "https://assets.mixkit.co/active_storage/sfx/2505/2505-preview.mp3",
  },
  {
    id: 25,
    title: "Mindful Moments",
    duration: "18:00",
    image: "https://images.unsplash.com/photo-1506127198231-96a93caa7b81",
    audio: "https://assets.mixkit.co/active_storage/sfx/2506/2506-preview.mp3",
  },
  {
    id: 26,
    title: "Zen Garden",
    duration: "22:00",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    audio: "https://assets.mixkit.co/active_storage/sfx/2463/2463-preview.mp3",
  },
  {
    id: 27,
    title: "Morning Meditation",
    duration: "25:00",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    audio: "https://assets.mixkit.co/active_storage/sfx/2507/2507-preview.mp3",
  },
];

const playlists = [
  {
    id: 1,
    title: "Deep Sleep",
    trackCount: 12,
    icon: Moon,
    tracks: [
      "Ocean Waves",
      "Rain Fall",
      "White Noise",
      "Forest Bird",
      "Calm Piano",
      "Meditation Bell",
      "Gentle Stream",
      "Night Crickets",
      "Soft Thunder",
      "Wind Chimes",
      "Delta Waves",
      "Deep Rest",
    ],
  },
  {
    id: 2,
    title: "Study Break",
    trackCount: 8,
    icon: BookOpen,
    tracks: [
      "Calm Piano",
      "Forest Bird",
      "Gentle Rain",
      "Soft Focus",
      "Concentration Flow",
      "Study Ambience",
      "Coffee Shop",
      "Library Quiet",
    ],
  },
  {
    id: 3,
    title: "Nature Sound",
    trackCount: 15,
    icon: Trees,
    tracks: [
      "Forest Bird",
      "Ocean Waves",
      "Rain Fall",
      "Gentle Stream",
      "Mountain Wind",
      "Jungle Morning",
      "Desert Night",
      "Arctic Silence",
      "Tropical Beach",
      "Autumn Leaves",
      "Spring Garden",
      "Winter Frost",
      "Summer Meadow",
      "Canyon Echo",
      "Waterfall",
    ],
  },
  {
    id: 4,
    title: "Calm Minds",
    trackCount: 12,
    icon: User,
    tracks: [
      "Meditation Bell",
      "Calm Piano",
      "Breathing Guide",
      "Mindful Moments",
      "Inner Peace",
      "Zen Garden",
      "Temple Bells",
      "Tibetan Bowls",
      "Chakra Balance",
      "Morning Meditation",
      "Evening Reflection",
      "Deep Calm",
    ],
  },
];

/* ---------- Component ---------- */
export default function SleepSupport() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const audioRef = useRef(null);
  const [isLooping, setIsLooping] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(1);

  const handleReplay = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };
  // const toggleLoop = () => {
  //   const newLoopValue = !isLooping;
  //   setIsLooping(newLoopValue);
  //   audioRef.current.loop = newLoopValue;
  // };

  /* Keep audio element in sync whenever currentTrack changes */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Update src and load new source
    if (audio.src !== currentTrack.audio) {
      audio.src = currentTrack.audio;
      audio.load();
    }

    // If was playing, resume play for the new track
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // Autoplay might be blocked — we'll simply set playing state to false
          setIsPlaying(false);
        });
      }
    }
    // reset time states
    setCurrentTime(0);
    setDuration(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () =>
      setDuration(isNaN(audio.duration) ? 0 : audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // autoplay blocked
            setIsPlaying(false);
          });
      } else {
        setIsPlaying(true);
      }
    }
  };

  const handleTrackSelect = (track) => {
    const wasPlaying = isPlaying;
    // If selecting same track, just toggle play/pause
    if (track.id === currentTrack.id) {
      togglePlay();
      return;
    }
    setCurrentTrack(track);
    setCurrentTime(0);

    // small delay to ensure src updated then optionally play
    setTimeout(() => {
      if (wasPlaying && audioRef.current) {
        const p = audioRef.current.play();
        if (p && typeof p.then === "function") {
          p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        } else {
          setIsPlaying(true);
        }
      } else {
        setIsPlaying(false);
      }
    }, 120);
  };

  const handlePrevious = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
    handleTrackSelect(tracks[previousIndex]);
  };

  const handleNext = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
    handleTrackSelect(tracks[nextIndex]);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const formatTime = (timeInSeconds) => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  /* Play a track name (used from playlist modal) -> find matching track by title and play it */
  const playTrackByName = (name) => {
    const found = tracks.find((t) => t.title === name);
    if (found) {
      setSelectedPlaylist(null);
      handleTrackSelect(found);
      // ensure play
      setTimeout(() => {
        if (audioRef.current) {
          const p = audioRef.current.play();
          if (p && typeof p.then === "function") {
            p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
          } else {
            setIsPlaying(true);
          }
        }
      }, 150);
    }
  };
  const toggleLoop = () => {
    const newLoopValue = !isLooping;
    setIsLooping(newLoopValue);
    audioRef.current.loop = newLoopValue;
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={currentTrack.audio} />

      <div className="box-border flex flex-col gap-8 items-center pt-10 pb-14  px-4 md:px-8 w-full max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="w-full">
          <div className="text-black">
            <p className="ftext-black text-lg md:text-2xl font-medium tracking-[-1.12px]">
              Sleep Support
            </p>
            <p className="mt-1 md:text-md text-[#333]">
              Wind down with calming sounds designed to help you rest
            </p>
          </div>
        </div>

        {/* Breathing Tip */}
        <div className="bg-[#b5e3b7] w-full rounded-lg md:p-6">
          <div className="md:flex items-center p-4 md:p-6 gap-4">
            <div className="mx-auto mb-4 md:mb-0 w-[70px] h-[70px] rounded-full overflow-hidden shrink-0">
              <img
                alt="Meditation"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1689697247482-c8cb53d8f670?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBtZWRpdGF0aW9uZyUyMHlvZ2F8ZW58MXx8fDE3NjMzODY4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              />
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <p className="text-[20px] text-center md:text-left">
                Breathing Tip
              </p>
              <p className="text-[14px] text-center md:text-left md:text-[16px]">
                Try breathing in for 4 seconds and out for 4 seconds. This
                simple technique can help calm your nervous system and prepare
                your body for rest
              </p>
            </div>
          </div>
        </div>

        {/* Main Player */}
        <div className="bg-white/90 border-2 border-gray-400/20 w-full rounded-[20px]">
          <div className="p-6 md:p-10 flex flex-col items-center">
            <div className="bg-[#e8f2fc] w-full rounded-lg p-4 md:p-6">
              <div className="flex flex-col items-center">
                <p className="text-[#1560b7] text-[22px] font-bold font-['Poppins:Medium']">
                  {currentTrack.title}
                </p>

                <div className="mt-4 w-full max-w-[788px] h-[280px] md:h-[448px] rounded-md overflow-hidden">
                  <img
                    alt={currentTrack.title}
                    className="w-full h-full object-cover rounded-md"
                    src={currentTrack.image}
                  />
                </div>

                {/* Progress bar */}
                <div className="mt-6 w-full max-w-[892px]">
                  <div
                    className="relative w-full h-3 md:h-2 cursor-pointer"
                    onClick={handleProgressClick}
                    onTouchStart={handleProgressClick}
                    role="button"
                    tabIndex={0}
                    aria-label="Seek progress"
                  >
                    <svg
                      className="w-full h-full block"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 550 10"
                    >
                      <rect
                        height="5"
                        rx="2.5"
                        stroke="#CECCCC"
                        strokeLinecap="round"
                        strokeWidth="5"
                        width="545"
                        x="2.5"
                        y="2.5"
                      />
                    </svg>

                    <div
                      className="absolute left-0 top-0 bottom-0"
                      style={{ width: `${progressPercentage}%` }}
                    >
                      <svg
                        className="w-full h-full block"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 300 10"
                      >
                        <rect
                          height="5"
                          rx="2.5"
                          stroke="#4531C6"
                          strokeLinecap="round"
                          strokeWidth="5"
                          width="295"
                          x="2.5"
                          y="2.5"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="flex justify-between mt-2 text-[#1560b7]">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="mt-4 flex items-center gap-4">
                  {/* Previous */}
                  <button
                    onClick={handlePrevious}
                    className="w-11 h-11 rounded-full flex items-center justify-center hover:opacity-80 transition"
                    aria-label="Previous"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 50 50" fill="none">
                      <path d={svgPaths.p38735680} fill="black" />
                    </svg>
                  </button>

                  {/* PLAY / PAUSE */}
                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full flex items-center justify-center transition"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    <svg className="w-12 h-12" viewBox="0 0 50 50" fill="none">
                      <rect fill="#DEEBF9" height="50" rx="25" width="50" />
                      <path
                        d={isPlaying ? svgPaths.p2402fb00 : svgPaths.p29886500}
                        fill="black"
                      />
                    </svg>
                  </button>

                  {/* Next */}
                  <button
                    onClick={handleNext}
                    className="w-11 h-11 rounded-full flex items-center justify-center hover:opacity-80 transition"
                    aria-label="Next"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 50 50" fill="none">
                      <path d={svgPaths.p29886500} fill="black" />
                    </svg>
                  </button>

                  {/* Loop / Keep Replaying */}
                  <button
                    onClick={toggleLoop}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
                      isLooping ? "bg-[#d2e5f9]" : ""
                    }`}
                    aria-label="Loop Track"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                    >
                      <path d="M3 12a9 9 0 0 1 9-9h3" />
                      <path d="M21 12a9 9 0 0 1-9 9h-3" />
                      <polyline points="12 2 15 5 12 8" />
                      <polyline points="12 22 9 19 12 16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Sounds */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xl   font-['Open_Sans:Regular']">
              Recommended Sounds
            </p>
          </div>

          {/* Responsive Grid: 1 column on mobile, 2 on md, 3 on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.slice(0, 6).map((t) => (
              <TrackCard
                key={t.id}
                track={t}
                isActive={currentTrack?.id === t.id}
                onClick={() => handleTrackSelect(t)}
              />
            ))}
          </div>
        </div>

        {/* Curated Playlists */}
        <div className="bg-white w-full rounded-[20px] px-4 md:px-6 py-4 md:py-6">
          <div className="mb-4">
            <p className="text-[20px] md:text-[24px]">Curated Playlists</p>
          </div>

          <div className="space-y-4">
            {playlists.map((pl) => (
              <PlaylistCard
                key={pl.id}
                playlist={pl}
                onClick={() => setSelectedPlaylist(pl)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Playlist Modal */}

      <Dialog
        open={!!selectedPlaylist}
        onOpenChange={() => setSelectedPlaylist(null)}
      >
        <DialogContent className="max-w-[600px] max-h-[80vh] overflow-y-auto bg-gray-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4">
              {selectedPlaylist && (
                <>
                  {(() => {
                    const Icon = selectedPlaylist.icon;
                    return (
                      <div className="w-[60px] h-[60px] flex items-center justify-center bg-[#e8f2fc] rounded-full">
                        <Icon className="w-8 h-8 text-[#1560b7]" />
                      </div>
                    );
                  })()}

                  <div>
                    <div className="text-[20px] md:text-[28px] text-[#1560b7] font-['Poppins:Medium']">
                      {selectedPlaylist.title}
                    </div>
                    <div className="text-[14px] text-[#0a305c]">
                      {selectedPlaylist.trackCount} Tracks
                    </div>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedPlaylist && (
            <div className="mt-4 px-2">
              {selectedPlaylist.tracks.map((trackName, idx) => {
                const track = tracks.find((t) => t.title === trackName);

                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  >
                    {/* Track Index */}
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e8f2fc] text-[#1560b7] font-semibold">
                      {idx + 1}
                    </div>

                    {/* Track Info */}
                    <div className="flex-1">
                      <div className="text-[16px]">{trackName}</div>
                      <div className="text-[12px] text-gray-500">
                        {track?.duration ?? ""}
                      </div>
                    </div>

                    {/* Play Button */}
                    <button
                      onClick={() => playTrackByName(trackName)}
                      className="px-3 py-1 rounded-md bg-[#1560b7] text-white text-sm"
                      aria-label={`Play ${trackName}`}
                    >
                      Play
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ---------- TrackCard component (in-file) ---------- */

function TrackCard({ track, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={`w-full h-60 sm:h-[260px] rounded-2xl cursor-pointer text-left
        focus:outline-none overflow-hidden 
        ${
          isActive
            ? "bg-[#d2e5f9] border-2 border-[#104889] shadow-md"
            : "bg-[#e8f2fc] border border-[#104889] shadow-sm"
        }`}
      aria-pressed={isActive}
    >
      <div className="flex flex-col items-center justify-center h-full p-3 sm:p-4">
        {/* Image */}
        <div className="w-20 h-20 sm:w-[90px] sm:h-[90px] rounded-xl overflow-hidden">
          <img
            alt={track.title}
            className="w-full h-full object-cover"
            src={track.image}
          />
        </div>

        {/* Title + duration */}
        <div className="mt-3 text-center text-[#1560b7]">
          <p className="text-sm sm:text-base font-medium leading-tight">
            {track.title}
          </p>

          <p className="text-xs sm:text-sm text-[#333] mt-1">
            {track.duration}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

/* ---------- PlaylistCard component (in-file) ---------- */
function PlaylistCard({ playlist, onClick }) {
  const IconComponent = playlist.icon;
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#d2e5f9] rounded-lg p-4 flex items-center gap-4 hover:bg-[#c5ddf5] transition-colors text-left"
    >
      <div className="w-[72px] h-[72px] flex items-center justify-center rounded-md shrink-0">
        <IconComponent className="w-10 h-10 text-[#0a305c]" strokeWidth={1.5} />
      </div>

      <div className="flex flex-col items-start">
        <p className=" text-[#0a305c]">{playlist.title}</p>
        <p className="text-[14px] text-[#0a305c]">
          {playlist.trackCount} Tracks
        </p>
      </div>
    </button>
  );
}
