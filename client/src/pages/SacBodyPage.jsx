import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Users, Award, Shield, Mail, Phone, ArrowRight } from "lucide-react";
import { useEvents } from "../context/EventContext";

const SacBodyPage = () => {
  const { organizingBodies, events } = useEvents();

  const leadershipList = [
    {
      name: "Dr. K. R. Sharma",
      role: "Dean of Student Affairs",
      dept: "Faculty Advisory Board",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop",
      bio: "Guiding student initiatives, fostering leadership, and overseeing all campus cultural & technical societies."
    },
    {
      name: "Prof. M. V. Reddy",
      role: "SAC General Convener",
      dept: "Department of Computer Science",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
      bio: "Coordinating inter-college fests, annual athletic meets, and hackathons across departments."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-50 text-[#ff5733] border border-orange-200">
          <Sparkles className="w-4 h-4" /> Governance & Student Leadership
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-cinzel tracking-tight">
          The SAC Body & Clubs
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          The apex student governing body driving cultural festivals, technical hackathons, athletic championships, and literary debates.
        </p>
        <div className="w-16 h-1 bg-[#ff5733] mx-auto rounded-full"></div>
      </div>

      {/* Leadership / Faculty Advisors Section */}
      <section className="space-y-6">
        <div className="text-left space-y-1">
          <span className="text-xs font-bold text-[#ff5733] uppercase tracking-wider">Faculty Advisory Board</span>
          <h2 className="text-2xl font-bold font-cinzel text-slate-900">SAC Guiding Leadership</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leadershipList.map((leader, idx) => (
            <div key={idx} className="sac-card p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 border-l-4 border-l-[#ff5733]">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-24 h-24 rounded-2xl object-cover border border-slate-200 shadow-md flex-shrink-0"
              />
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-[#ff5733] border border-orange-200 uppercase">
                  {leader.dept}
                </span>
                <h3 className="text-xl font-bold font-cinzel text-slate-900">{leader.name}</h3>
                <p className="text-xs font-semibold text-[#ff5733]">{leader.role}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Organizing Bodies / Student Clubs Grid */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div className="text-left space-y-1">
          <span className="text-xs font-bold text-[#ff5733] uppercase tracking-wider">Campus Clubs & Societies</span>
          <h2 className="text-2xl font-bold font-cinzel text-slate-900">Organizing Bodies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizingBodies.map((ob) => {
            const clubEventsCount = events.filter(
              (e) => (e.organizingBody?._id || e.organizingBody?.name) === (ob._id || ob.name)
            ).length;

            return (
              <div key={ob._id} className="sac-card p-6 space-y-4 border border-slate-200 hover:border-[#ff5733]/40">
                <div className="flex items-center gap-4">
                  <img
                    src={ob.logoUrl}
                    alt={ob.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300">
                      {ob.category}
                    </span>
                    <h3 className="text-base font-bold font-cinzel text-slate-900 mt-1">{ob.name}</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {ob.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Organized <strong>{clubEventsCount}</strong> events</span>
                  <Link
                    to={`/events?club=${encodeURIComponent(ob.name)}`}
                    className="text-[#ff5733] font-bold hover:underline flex items-center gap-1"
                  >
                    View Events <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SacBodyPage;
