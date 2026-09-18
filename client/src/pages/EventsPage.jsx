import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sparkles, Search } from "lucide-react";
import { useEvents } from "../context/EventContext";
import EventCard from "../components/events/EventCard";
import FilterBar from "../components/events/FilterBar";
import RegisterModal from "../components/events/RegisterModal";
import ImageLightbox from "../components/common/ImageLightbox";
import { resolveEventStatus } from "../utils/statusResolver";

const EventsPage = () => {
  const { events, organizingBodies } = useEvents();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedClub, setSelectedClub] = useState("all");
  const [registeringEvent, setRegisteringEvent] = useState(null);
  const [spotlightImage, setSpotlightImage] = useState(null);
  const [spotlightCaption, setSpotlightCaption] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusParam = params.get("status");
    const clubParam = params.get("club");

    if (statusParam && ["all", "upcoming", "ongoing", "completed"].includes(statusParam)) {
      setSelectedStatus(statusParam);
    }
    if (clubParam) {
      setSelectedClub(clubParam);
    }
  }, [location.search]);

  const filteredEvents = events.filter((evt) => {
    const status = resolveEventStatus(evt);
    const matchesStatus = selectedStatus === "all" || status === selectedStatus;
    const matchesCategory = selectedCategory === "all" || evt.category === selectedCategory;

    const clubIdOrName = evt.organizingBody?._id || evt.organizingBody?.name || "";
    const matchesClub = selectedClub === "all" || clubIdOrName === selectedClub;

    const matchesSearch =
      !searchTerm ||
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesCategory && matchesClub && matchesSearch;
  });

  const handleReset = () => {
    setSearchTerm("");
    setSelectedStatus("all");
    setSelectedCategory("all");
    setSelectedClub("all");
  };

  const openSpotlight = (url, caption) => {
    setSpotlightImage(url);
    setSpotlightCaption(caption);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="text-left space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-[#ff5733] border border-orange-200">
          <Sparkles className="w-3.5 h-3.5" /> SAC Events Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-cinzel">
          Browse All <span className="text-[#ff5733]">SAC Events</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
          Categorized automatically into Upcoming, Ongoing, and Completed events.
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedClub={selectedClub}
        setSelectedClub={setSelectedClub}
        organizingBodies={organizingBodies}
        onReset={handleReset}
      />

      {/* Results Count & Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing <strong className="text-slate-900">{filteredEvents.length}</strong> events</span>
          {selectedStatus !== "all" && (
            <span className="capitalize font-bold text-[#ff5733]">
              Active Filter: {selectedStatus} Events
            </span>
          )}
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <EventCard
                key={evt._id}
                event={evt}
                onRegisterClick={setRegisteringEvent}
                onSpotlightClick={openSpotlight}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-cinzel text-slate-900">No Matching Events Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search criteria or clearing your category & status filters.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-[#ff5733] hover:bg-[#e04826] text-white text-xs font-bold shadow-md shadow-[#ff5733]/20"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {registeringEvent && (
        <RegisterModal event={registeringEvent} onClose={() => setRegisteringEvent(null)} />
      )}

      {spotlightImage && (
        <ImageLightbox
          imageUrl={spotlightImage}
          caption={spotlightCaption}
          onClose={() => setSpotlightImage(null)}
        />
      )}
    </div>
  );
};

export default EventsPage;
