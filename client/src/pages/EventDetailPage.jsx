import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar, MapPin, Users, Award, ArrowLeft, Phone, Mail,
  UserCheck, AlertTriangle, CheckCircle, Image as ImageIcon, Sparkles
} from "lucide-react";
import { useEvents } from "../context/EventContext";
import StatusBadge from "../components/common/StatusBadge";
import RegisterModal from "../components/events/RegisterModal";
import ImageLightbox from "../components/common/ImageLightbox";
import { resolveEventStatus, formatDateRange, getStatusTheme } from "../utils/statusResolver";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useEvents();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [spotlightImage, setSpotlightImage] = useState(null);
  const [spotlightCaption, setSpotlightCaption] = useState("");

  const event = events.find((e) => e._id === id || e.slug === id);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-2xl font-bold font-cinzel text-slate-900">Event Not Found</h2>
        <p className="text-xs text-slate-500">The event you are looking for does not exist or has been removed.</p>
        <Link to="/events" className="inline-block px-5 py-2.5 rounded-xl bg-[#ff5733] text-white text-xs font-bold shadow-md">
          Back to Events Directory
        </Link>
      </div>
    );
  }

  const status = resolveEventStatus(event);
  const theme = getStatusTheme(status);
  const { dateStr, timeStr } = formatDateRange(event.startDate, event.endDate);

  const isRegOpen =
    event.registrationSettings?.enabled &&
    (status === "upcoming" || status === "ongoing");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#ff5733] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </button>

      {/* Main Banner Header */}
      <div className="sac-card overflow-hidden border border-slate-200 shadow-xl">
        <div className="relative h-64 sm:h-80 w-full bg-slate-900">
          <img
            src={event.posterUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop"}
            alt={event.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <StatusBadge status={status} />
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-slate-800 shadow-md">
            {event.category}
          </div>
        </div>

        {/* Header Metadata */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#ff5733]">
            <span>Organized by: {event.organizingBody?.name || "SAC"}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-cinzel text-slate-900 leading-tight">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 font-semibold">
              <Calendar className="w-4 h-4 text-[#ff5733]" />
              <span>{dateStr} ({timeStr})</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 font-semibold">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{event.venue}</span>
            </div>
            {event.maxParticipants > 0 && (
              <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 font-semibold">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Max Cap: {event.maxParticipants}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="sac-card p-6 space-y-3 border border-slate-200">
            <h3 className="text-base font-bold font-cinzel text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff5733]" /> Event Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {(event.rules?.length > 0 || event.eligibility) && (
            <div className="sac-card p-6 space-y-4 border border-slate-200">
              <h3 className="text-base font-bold font-cinzel text-slate-900">Rules & Eligibility</h3>

              {event.eligibility && (
                <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200 text-[#ff5733] text-xs font-medium">
                  <strong>Eligibility:</strong> {event.eligibility}
                </div>
              )}

              {event.rules?.length > 0 && (
                <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside">
                  {event.rules.map((rule, idx) => (
                    <li key={idx} className="leading-relaxed">{rule}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {event.prizes && (
            <div className="sac-card p-6 bg-gradient-to-r from-orange-50 via-white to-white border border-orange-200 space-y-2">
              <h3 className="text-base font-bold font-cinzel text-[#ff5733] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#ff5733]" /> Prizes & Rewards
              </h3>
              <p className="text-xs text-slate-800 font-semibold">{event.prizes}</p>
            </div>
          )}

          {/* Photo Gallery with Spotlight */}
          {event.gallery && event.gallery.length > 0 && (
            <div className="sac-card p-6 space-y-4 border border-slate-200">
              <h3 className="text-base font-bold font-cinzel text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#ff5733]" /> Event Photos Spotlight
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {event.gallery.map((imgUrl, gIdx) => (
                  <div
                    key={gIdx}
                    onClick={() => {
                      setSpotlightImage(imgUrl);
                      setSpotlightCaption(`${event.title} - Photo ${gIdx + 1}`);
                    }}
                    className="h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer group relative"
                  >
                    <img src={imgUrl} alt="Event highlight" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                      Click to Spotlight
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="sac-card p-6 space-y-4 border border-slate-200 shadow-md">
            <h3 className="text-base font-bold font-cinzel text-slate-900">Event Registration</h3>

            {isRegOpen ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-600">
                  Registrations are open for eligible students. Reserve your slot now.
                </p>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 ${theme.btnColor}`}
                >
                  <UserCheck className="w-4 h-4" /> Register Now
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 space-y-1">
                <CheckCircle className="w-6 h-6 text-slate-400 mx-auto" />
                <p className="font-bold text-slate-700">
                  {status === "completed" ? "Event Completed" : "Registration Closed"}
                </p>
                <p className="text-[11px]">Registrations are closed for this event.</p>
              </div>
            )}
          </div>

          {event.coordinators?.length > 0 && (
            <div className="sac-card p-6 space-y-4 border border-slate-200">
              <h3 className="text-base font-bold font-cinzel text-slate-900">Coordinators & Contact</h3>
              <div className="space-y-3 text-xs">
                {event.coordinators.map((c, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-[#ff5733]">{c.name}</div>
                    {c.phone && (
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Phone className="w-3 h-3 text-emerald-600" /> <span>{c.phone}</span>
                      </div>
                    )}
                    {c.email && (
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Mail className="w-3 h-3 text-amber-600" /> <span>{c.email}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showRegisterModal && (
        <RegisterModal event={event} onClose={() => setShowRegisterModal(false)} />
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

export default EventDetailPage;
