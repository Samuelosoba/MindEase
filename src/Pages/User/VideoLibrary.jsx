import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Play, Clock, Eye } from "lucide-react";
import { Dialog, DialogContent } from "../../Components/User/Dialog";
import stress from "../../assets/Stress.png";
import sleep from "../../assets/sleep.png";

const videos = [
  {
    id: "1",
    title: "Exam Stress Relief - 10 Minute Guided Meditation",
    duration: "10:32",
    views: "2.1M",
    thumbnail: sleep,
    embedUrl: "https://www.youtube.com/embed/ZToicYcHIOU",
    category: "Exam Stress",
    description: "Calm your mind before exams with this guided meditation",
  },
  {
    id: "2",
    title: "Study Motivation - Beat Academic Anxiety",
    duration: "15:20",
    views: "1.8M",
    thumbnail: "https://img.youtube.com/vi/lsSC2vx7zFQ/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/lsSC2vx7zFQ",
    category: "Motivation",
    description:
      "Motivational video to overcome study anxiety and boost confidence",
  },
  {
    id: "3",
    title: "Breathing Exercises for Students - Reduce Stress Fast",
    duration: "8:45",
    views: "3.2M",
    thumbnail: "https://img.youtube.com/vi/tybOi4hjZFQ/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/tybOi4hjZFQ",
    category: "Breathing",
    description: "Quick breathing techniques to manage exam stress",
  },
  {
    id: "4",
    title: "Deep Sleep Meditation for Students",
    duration: "20:15",
    views: "5.4M",
    thumbnail: "https://img.youtube.com/vi/aEqlQvczMJQ/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/aEqlQvczMJQ",
    category: "Sleep",
    description: "Fall asleep quickly and wake up refreshed for your studies",
  },
  {
    id: "5",
    title: "Focus Music - Study Without Distractions",
    duration: "30:00",
    views: "8.9M",
    thumbnail: "https://img.youtube.com/vi/5qap5aO4i9A/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/5qap5aO4i9A",
    category: "Focus",
    description: "Concentration music to boost productivity while studying",
  },
  {
    id: "6",
    title: "Overcoming Test Anxiety - Psychology Tips",
    duration: "12:30",
    views: "1.2M",
    thumbnail: stress,
    embedUrl: "https://www.youtube.com/embed/t-5ajMazD94",
    category: "Exam Stress",
    description: "Evidence-based strategies to manage test anxiety",
  },
  {
    id: "7",
    title: "Morning Meditation for Students - Start Your Day Right",
    duration: "10:00",
    views: "2.7M",
    thumbnail: "https://img.youtube.com/vi/inpok4MKVLM/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/inpok4MKVLM",
    category: "Meditation",
    description: "Begin your study day with clarity and calm",
  },
  {
    id: "8",
    title: "Time Management for Students - Study Smart",
    duration: "14:22",
    views: "4.1M",
    thumbnail: "https://img.youtube.com/vi/iONDebHX9qk/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/iONDebHX9qk",
    category: "Productivity",
    description:
      "Learn effective time management strategies for academic success",
  },
  {
    id: "9",
    title: "Calm Piano Music for Studying",
    duration: "45:00",
    views: "12.3M",
    thumbnail: "https://img.youtube.com/vi/lTRiuFIWV54/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/lTRiuFIWV54",
    category: "Focus",
    description: "Peaceful piano music to help you focus on your studies",
  },
  {
    id: "10",
    title: "Dealing with Academic Pressure - Mental Health Tips",
    duration: "11:45",
    views: "900K",
    thumbnail: "https://img.youtube.com/vi/4O2JK_94g3Y/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/4O2JK_94g3Y",
    category: "Mental Health",
    description: "Professional advice on managing academic pressure",
  },
  {
    id: "11",
    title: "Body Scan Meditation for Stress Relief",
    duration: "15:30",
    views: "3.5M",
    thumbnail: "https://img.youtube.com/vi/15q-N-_kkrU/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/15q-N-_kkrU",
    category: "Meditation",
    description: "Release tension and stress from your body",
  },
  {
    id: "12",
    title: "Study Break Yoga - 10 Minutes",
    duration: "10:15",
    views: "1.6M",
    thumbnail: "https://img.youtube.com/vi/g_tea8ZNk5A/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/g_tea8ZNk5A",
    category: "Exercise",
    description: "Quick yoga session to refresh your mind during study breaks",
  },
];

const categories = [
  "All",
  "Exam Stress",
  "Meditation",
  "Focus",
  "Motivation",
  "Mental Health",
];

export function VideoLibrary() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 mt-12">
      {/* Header */}
      <div className="bg-[#1560b7] px-6 sm:px-12 lg:px-16 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/20 backdrop-blur-sm text-white px-4 py-3 sm:px-6 rounded-lg flex items-center gap-2 hover:bg-white/30 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-2">
            Video Library 🎥
          </h1>
          <p className="text-sm sm:text-lg text-white/90">
            Curated videos to help you manage stress and succeed academically
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl text-[#333333] mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-colors text-sm sm:text-base ${
                  selectedCategory === category
                    ? "bg-[#1560b7] text-white"
                    : "bg-white text-[#5b6776] border border-[#d2e5f9] hover:border-[#1560b7]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#d2e5f9] hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video bg-gray-200">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-[#1560b7] ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs sm:text-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <span className="inline-block bg-[#e8f2fc] text-[#1560b7] px-3 py-1 rounded-full text-sm">
                    {video.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg text-[#333333] mb-2 line-clamp-2">
                  {video.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {video.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {video.views} views
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              No videos found in this category
            </p>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-12 bg-[#fffbea] rounded-2xl p-6 border border-[#ffd666]">
          <h3 className="text-lg sm:text-xl text-[#333333] mb-3">
            💡 Tips for Getting the Most Out of These Videos
          </h3>
          <ul className="space-y-2 text-base sm:text-lg text-[#333333]">
            <li>✓ Find a quiet space where you won't be interrupted</li>
            <li>✓ Use headphones for better immersion</li>
            <li>✓ Practice regularly for best results</li>
            <li>✓ Take notes on techniques that work best for you</li>
            <li>✓ Share helpful videos with classmates</li>
          </ul>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <Dialog
          open={!!selectedVideo}
          onOpenChange={() => setSelectedVideo(null)}
        >
          <DialogContent
            className="
        w-[95%] 
        max-w-[700px] 
        md:max-w-[800px] 
        lg:max-w-[1000px]
        p-0 
        rounded-xl 
        overflow-hidden
      "
          >
            <div className="relative w-full">
              {/* Responsive Video */}
              <div className="relative w-full pt-[56.25%] bg-black">
                <iframe
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Content Area */}
              <div className="p-4 sm:p-5 md:p-6 bg-white">
                {/* Category Tag */}
                <span className="inline-block bg-[#e8f2fc] text-[#1560b7] px-3 py-1 rounded-full text-xs sm:text-sm">
                  {selectedVideo.category}
                </span>

                {/* Title */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-[#333333] mt-3">
                  {selectedVideo.title}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 mt-2 md:mt-3">
                  {selectedVideo.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 mt-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedVideo.duration}
                  </div>

                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedVideo.views} views
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
