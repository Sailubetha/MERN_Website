import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowRight, UserCheck } from "lucide-react";
import StatusBadge from "../common/StatusBadge";
import { resolveEventStatus, getStatusTheme, formatDateRange } from "../../utils/statusResolver";

const EventCard = ({ event, onRegisterClick, onSpotlightClick }) => {
  const status = resolveEventStatus(event);
  const theme = getStatusTheme(status);
  const { dateStr, timeStr } = formatDateRange(event.startDate, event.endDate);

  const isRegistrationOpen =
    event.registrationSettings?.enabled &&
    (status === "upcoming" || status === "ongoing");

  return (
    <div
      className={`group relative rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${theme.cardClass}`}
    >
      {/* Top Banner Image */}
      <div className="space-y-4">
        <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={event.posterUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop"}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <StatusBadge status={status} />
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
            {event.category}
          </div>
        </div>

        {/* Organizing Body Tag */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#ff5733]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5733]"></span>
          <span>{event.organizingBody?.name || "Student Activity Council"}</span>
        </div>

        {/* Title & Short Description */}
        <div>
          <h3 className="text-lg font-bold font-cinzel text-slate-900 group-hover:text-[#ff5733] transition-colors line-clamp-1">
            {event.title}
          </h3>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {event.shortDescription || event.description}
          </p>
        </div>

        {/* Event Meta Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#ff5733] flex-shrink-0" />
            <span className="truncate font-medium">{dateStr}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="truncate font-medium">{event.venue}</span>
          </div>
          {event.maxParticipants > 0 && (
            <div className="flex items-center gap-1.5 col-span-2 text-slate-500">
              <Users className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Cap: {event.maxParticipants} Participants</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          to={`/events/${event._id || event.slug}`}
          className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#ff5733] bg-slate-100 hover:bg-orange-50 transition-all flex items-center gap-1"
        >
          Details <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {isRegistrationOpen ? (
          <button
            onClick={() => onRegisterClick && onRegisterClick(event)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${theme.btnColor}`}
          >
            <UserCheck className="w-3.5 h-3.5" /> Register Now
          </button>
        ) : (
          <button
            onClick={() => {
              if (status === "completed" && event.posterUrl && onSpotlightClick) {
                onSpotlightClick(event.posterUrl, event.title);
              }
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 transition-all"
          >
            {status === "completed" ? "View Highlights" : "Reg. Closed"}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
