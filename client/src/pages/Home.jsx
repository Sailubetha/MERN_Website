import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Calendar, ArrowRight, Zap, Award, Users, Bell, Image as ImageIcon } from "lucide-react";
import { useEvents } from "../context/EventContext";
import EventCard from "../components/events/EventCard";
import RegisterModal from "../components/events/RegisterModal";
import ImageLightbox from "../components/common/ImageLightbox";
import { mockAnnouncements } from "../data/mockEvents";
import { resolveEventStatus } from "../utils/statusResolver";

const Home = () => {
  const { events, organizingBodies } = useEvents();
  const [registeringEvent, setRegisteringEvent] = useState(null);
  const [spotlightImage, setSpotlightImage] = useState(null);
  const [spotlightCaption, setSpotlightCaption] = useState("");

  const upcomingEvents = events.filter((e) => resolveEventStatus(e) === "upcoming");
  const ongoingEvents = events.filter((e) => resolveEventStatus(e) === "ongoing");
  const completedEvents = events.filter((e) => resolveEventStatus(e) === "completed");

  const openSpotlight = (url, caption) => {
    setSpotlightImage(url);
    setSpotlightCaption(caption);
  };

  return (
    <div className="space-y-20">
      {/* 1. HERO SECTION (Full-Height Background Image + Dark Overlay + Centered Cinzel Serif Heading) */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center bg-no-repeat text-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&auto=format&fit=crop')`
        }}
      >
        {/* Darkened Overlay */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px]"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20 shadow-lg backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#ff5733]" />
            <span>Welcome to Student Activity Council</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-cinzel tracking-tight leading-tight">
            Experience the Vibrance of Campus Life with SAC!
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Discover upcoming hackathons, parliamentary debates, cultural festivals, and athletic meets. Get involved in campus leadership today.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#our-events"
              className="px-8 py-3.5 rounded-xl bg-[#ff5733] hover:bg-[#e04826] text-white font-bold text-sm shadow-xl shadow-[#ff5733]/30 transition-all hover:scale-105 flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/events"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/30 backdrop-blur-md transition-all flex items-center gap-2"
            >
              Browse All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 2. OUR EVENTS SECTION */}
        <section id="our-events" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#ff5733] uppercase tracking-widest">Campus Highlights</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-cinzel">OUR EVENTS</h2>
            <div className="w-16 h-1 bg-[#ff5733] mx-auto rounded-full"></div>
            <p className="text-xs sm:text-sm text-slate-600">
              Categorized automatically into Upcoming, Ongoing, and Completed events.
            </p>
          </div>

          {/* Ongoing Live Events */}
          {ongoingEvents.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#ff5733]">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                <h3 className="text-xl font-bold font-cinzel text-slate-900">Happening Now (Live)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ongoingEvents.map((evt) => (
                  <EventCard
                    key={evt._id}
                    event={evt}
                    onRegisterClick={setRegisteringEvent}
                    onSpotlightClick={openSpotlight}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-cinzel text-slate-900">Upcoming Events</h3>
              <Link to="/events?status=upcoming" className="text-xs font-bold text-[#ff5733] hover:underline">
                View All Upcoming →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.slice(0, 3).map((evt) => (
                <EventCard
                  key={evt._id}
                  event={evt}
                  onRegisterClick={setRegisteringEvent}
                  onSpotlightClick={openSpotlight}
                />
              ))}
            </div>
          </div>

          {/* Completed Events Section */}
          {completedEvents.length > 0 && (
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-cinzel text-slate-900">Recently Completed Events</h3>
                <Link to="/events?status=completed" className="text-xs font-bold text-slate-600 hover:text-slate-900">
                  View All Completed →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedEvents.slice(0, 3).map((evt) => (
                  <EventCard
                    key={evt._id}
                    event={evt}
                    onRegisterClick={setRegisteringEvent}
                    onSpotlightClick={openSpotlight}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 3. ABOUT SAC SECTION (Image + Text Split Layout) */}
        <section id="about" className="sac-card p-8 sm:p-12 border border-slate-200 space-y-8 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5 relative">
              <div className="h-80 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop"
                  alt="Students at SAC Event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="text-xs font-bold text-[#ff5733] uppercase tracking-wider">About Our Student Body</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-cinzel">
                Nurturing Leadership, Unity & Student Talent
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The Student Activity Council (SAC) is dedicated to enriching student life through a wide range of cultural, technical, sports, and social activities. Our mission is to foster holistic development, team spirit, and leadership skills.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 font-cinzel">Cultural & Arts</div>
                  <div className="text-slate-500">Music, dance, debate, and annual fest extravaganzas.</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 font-cinzel">Technical Innovation</div>
                  <div className="text-slate-500">24-hour hackathons, AI challenges, and coding competitions.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. GUIDING PILLAR OF SAC (Leadership Card Image + Text) */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#ff5733] uppercase tracking-widest">Leadership Vision</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-slate-900">Guiding Pillar of SAC</h2>
            <div className="w-16 h-1 bg-[#ff5733] mx-auto rounded-full"></div>
          </div>

          <div className="sac-card p-8 sm:p-10 border-l-4 border-l-[#ff5733] flex flex-col md:flex-row items-center gap-8">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop"
              alt="Dean of Student Affairs"
              className="w-32 h-32 rounded-2xl object-cover border border-slate-200 shadow-md flex-shrink-0"
            />
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-50 text-[#ff5733] border border-orange-200">
                Dean of Student Affairs Message
              </span>
              <h3 className="text-xl font-bold font-cinzel text-slate-900">Dr. K. R. Sharma</h3>
              <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                "Our Student Activity Council is the heart of student expression and teamwork. We empower students to take initiative, build real-world leadership, and create unforgettable campus experiences."
              </p>
            </div>
          </div>
        </section>

        {/* 5. SAC ANNOUNCEMENTS BOARD */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-slate-900">
              <Bell className="w-5 h-5 text-[#ff5733]" />
              <h3 className="text-lg font-bold font-cinzel">Official SAC Announcements</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">Campus Updates</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockAnnouncements.map((anc) => (
              <div key={anc.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#ff5733] font-bold">{anc.category}</span>
                  <span className="text-slate-400">{anc.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800">{anc.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{anc.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Registration Modal Trigger */}
      {registeringEvent && (
        <RegisterModal event={registeringEvent} onClose={() => setRegisteringEvent(null)} />
      )}

      {/* Image Lightbox Spotlight Trigger */}
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

export default Home;
