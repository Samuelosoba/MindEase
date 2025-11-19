import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Repeat, Volume2 } from "lucide-react";

export default function TrackCard({ track, onOpen }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [shouldReplayOnce, setShouldReplayOnce] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;

    audioRef.current.onended = () => {
      if (isRepeat) {
        audioRef.current.play();
      } else if (shouldReplayOnce) {
        audioRef.current.play();
        setShouldReplayOnce(false); // replay only once
      } else {
        setIsPlaying(false);
      }
    };
  }, [isRepeat, shouldReplayOnce, volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-2xl transition hover:shadow-lg flex flex-col gap-3">
      {/* Thumbnail */}
      <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center">
        <img
          src={track.image}
          alt={track.title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg">{track.title}</h3>

      {/* Controls */}
      <audio ref={audioRef} src={track.audio} />

      <div className="flex items-center justify-between mt-2">
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Replay Once */}
        <button
          onClick={() => setShouldReplayOnce(true)}
          className="p-2 bg-yellow-100 rounded-full hover:bg-yellow-200"
        >
          <RotateCcw size={20} />
        </button>

        {/* Repeat Loop */}
        <button
          onClick={() => setIsRepeat(!isRepeat)}
          className={`p-2 rounded-full ${
            isRepeat ? "bg-green-300" : "bg-gray-100"
          }`}
        >
          <Repeat size={20} />
        </button>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <Volume2 size={18} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-20 accent-blue-600"
          />
        </div>
      </div>

      {/* Open modal button */}
      <button
        onClick={() => onOpen(track)}
        className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
      >
        Open Playlist
      </button>
    </div>
  );
}
