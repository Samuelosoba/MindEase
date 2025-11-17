// TrackCard.jsx
export default function TrackCard({ track, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-full max-w-[320px] rounded-xl overflow-hidden shadow-md 
        transition-all hover:scale-[1.02] ${
          isActive ? "ring-4 ring-blue-500" : "ring-1 ring-gray-200"
        }`}
    >
      <img
        src={track.image}
        alt={track.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">{track.title}</h3>
        <p className="text-sm text-gray-500">{track.duration}</p>
      </div>
    </div>
  );
}
