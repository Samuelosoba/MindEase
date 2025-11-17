import { useState, useRef, useEffect } from "react";
import svgPaths from "../../assets/svg-36j4gnjs86";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../Components/User/Dialog";
import { Moon, BookOpen, Trees, User } from "lucide-react";

/* ---------- Data (unchanged) ---------- */
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
    audio: "https://assets.mixkit.co/active_storage/sfx/2462/2462-preview.mp3",
  },
  {
    id: 5,
    title: "Calm Piano",
    duration: "120:00",
    image:
      "https://images.unsplash.com/photo-1601313387875-892dd18fabb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWFubyUyMGtleXMlMjBtdXNpY3xlbnwxfHx8fDE3NjMzODY4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    audio: "https://assets.mixkit.co/active_storage/sfx/2390/2390-preview.mp3",
  },
  {
    id: 6,
    title: "Meditation Bell",
    duration: "50:00",
    image:
      "https://images.unsplash.com/photo-1762339157963-5209639d12af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwYmVsbCUyMHBlYWNlZnVsfGVufDF8fHx8MTc2MzM4Njg0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    audio: "https://assets.mixkit.co/active_storage/sfx/2462/2462-preview.mp3",
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

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={currentTrack.audio} />

      <div className="box-border flex flex-col gap-8 items-center py-14 px-6 md:px-10 lg:px-16 w-full max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="w-full">
          <div className="text-black">
            <p className="font-['Poppins:Medium',sans-serif] text-[28px] md:text-[32px] tracking-[-1.12px]">
              Sleep Support
            </p>
            <p className="mt-1 text-[15px] md:text-[18px] text-[#333]">
              Wind down with calming sounds designed to help you rest
            </p>
          </div>
        </div>

        {/* Breathing Tip */}
        <div className="bg-[#b5e3b7] w-full rounded-lg">
          <div className="flex items-center p-4 md:p-6">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden shrink-0">
              <img
                alt="Meditation"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1689697247482-c8cb53d8f670?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBtZWRpdGF0aW9uZyUyMHlvZ2F8ZW58MXx8fDE3NjMzODY4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              />
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <p className="text-[20px]">Breathing Tip</p>
              <p className="text-[14px] md:text-[16px]">
                Try breathing in for 4 seconds and out for 4 seconds. This
                simple technique can help calm your nervous system and prepare
                your body for rest
              </p>
            </div>
          </div>
        </div>

        {/* Main Player */}
        <div className="bg-white w-full rounded-[20px]">
          <div className="p-6 md:p-10 flex flex-col items-center">
            <div className="bg-[#e8f2fc] w-full rounded-lg p-4 md:p-6">
              <div className="flex flex-col items-center">
                <p className="text-[#1560b7] text-[22px] md:text-[32px] font-['Poppins:Medium']">
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
                  <button
                    onClick={handlePrevious}
                    className="w-[44px] h-[44px] rounded-full flex items-center justify-center hover:opacity-80 transition"
                    aria-label="Previous"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 50 50" fill="none">
                      <path d={svgPaths.p38735680} fill="black" />
                    </svg>
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-[56px] h-[56px] rounded-full flex items-center justify-center transition"
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

                  <button
                    onClick={handleNext}
                    className="w-[44px] h-[44px] rounded-full flex items-center justify-center hover:opacity-80 transition"
                    aria-label="Next"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 50 50" fill="none">
                      <path d={svgPaths.p29886500} fill="black" />
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
            <p className="text-[20px] md:text-[24px] font-['Open_Sans:Regular']">
              Recommended Sounds
            </p>
          </div>

          {/* Responsive Grid: 1 column on mobile, 2 on md, 3 on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((t) => (
              <TrackCard
                key={t.id}
                track={t}
                isActive={currentTrack.id === t.id}
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
        <DialogContent className="max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4">
              {selectedPlaylist && (
                <>
                  <div className="w-[60px] h-[60px] flex items-center justify-center bg-[#e8f2fc] rounded-full">
                    <selectedPlaylist.icon className="w-8 h-8 text-[#1560b7]" />
                  </div>
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
              {selectedPlaylist.tracks.map((trackName, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e8f2fc] text-[#1560b7] font-semibold">
                    {idx + 1}
                  </div>

                  <div className="flex-1">
                    <div className="text-[16px]">{trackName}</div>
                    <div className="text-[12px] text-gray-500">
                      {/* Try to find duration if track exists in our tracks array */}
                      {tracks.find((t) => t.title === trackName)?.duration ??
                        ""}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => playTrackByName(trackName)}
                      className="px-3 py-1 rounded-md bg-[#1560b7] text-white text-sm"
                      aria-label={`Play ${trackName}`}
                    >
                      Play
                    </button>
                  </div>
                </div>
              ))}
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
    <button
      onClick={onClick}
      className={`w-full h-[300px] rounded-[16px] transition-transform transform hover:scale-[1.02] cursor-pointer text-left focus:outline-none ${
        isActive
          ? "bg-[#d2e5f9] border-2 border-[#104889]"
          : "bg-[#e8f2fc] border border-[#104889]"
      }`}
      aria-pressed={isActive}
    >
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="w-[100px] h-[100px] rounded-[8px] overflow-hidden">
          <img
            alt={track.title}
            className="w-full h-full object-cover"
            src={track.image}
          />
        </div>

        <div className="mt-4 text-center text-[#1560b7]">
          <p className="text-[18px] md:text-[24px]">{track.title}</p>
          <p className="text-[14px] md:text-[16px] text-[#333]">
            {track.duration}
          </p>
        </div>
      </div>
    </button>
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
        <p className="text-[18px] md:text-[24px] text-[#0a305c]">
          {playlist.title}
        </p>
        <p className="text-[14px] text-[#0a305c]">
          {playlist.trackCount} Tracks
        </p>
      </div>
    </button>
  );
}
