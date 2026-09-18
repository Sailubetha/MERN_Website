import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield, Plus, Users, Edit, Trash2, CheckCircle2,
  XCircle, Search, AlertCircle, Sparkles, ArrowRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import StatusBadge from "../components/common/StatusBadge";
import { resolveEventStatus } from "../utils/statusResolver";
import AdminEventForm from "./AdminEventForm";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { events, registrations, deleteEvent, updateEvent } = useEvents();

  const [activeTab, setActiveTab] = useState("events");
  const [editingEvent, setEditingEvent] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedEventRegs, setSelectedEventRegs] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-[#ff5733] mx-auto" />
        <h3 className="text-xl font-bold font-cinzel text-slate-900">Admin Authentication Required</h3>
        <p className="text-xs text-slate-500">Please sign in with administrator credentials to access this page.</p>
        <Link to="/admin/login" className="inline-block px-5 py-2.5 rounded-xl bg-[#ff5733] text-white text-xs font-bold shadow-md">
          Go to Admin Login
        </Link>
      </div>
    );
  }

  const upcomingCount = events.filter((e) => resolveEventStatus(e) === "upcoming").length;
  const ongoingCount = events.filter((e) => resolveEventStatus(e) === "ongoing").length;
  const completedCount = events.filter((e) => resolveEventStatus(e) === "completed").length;

  const filteredEvents = events.filter((evt) =>
    !searchTerm ||
    evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evt.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePublish = (evt) => {
    updateEvent(evt._id, { isPublished: !evt.isPublished });
  };

  const handleDelete = (evt) => {
    if (window.confirm(`Are you sure you want to delete "${evt.title}"?`)) {
      deleteEvent(evt._id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-[#ff5733] border border-orange-200 mb-2">
            <Shield className="w-3.5 h-3.5" /> SAC Administrator Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-cinzel text-slate-900">Event Management Dashboard</h1>
          <p className="text-xs text-slate-500">Logged in as: <strong className="text-slate-800">{user.email}</strong></p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreating(true)}
            className="px-5 py-2.5 rounded-xl bg-[#ff5733] hover:bg-[#e04826] text-white text-xs font-bold shadow-md shadow-[#ff5733]/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create New Event
          </button>
          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="sac-card p-4 space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Events</div>
          <div className="text-2xl font-black font-cinzel text-slate-900">{events.length}</div>
        </div>

        <div className="sac-card p-4 border-l-4 border-l-[#ff5733] space-y-1">
          <div className="text-xs text-[#ff5733] font-bold uppercase tracking-wider">Upcoming</div>
          <div className="text-2xl font-black font-cinzel text-[#ff5733]">{upcomingCount}</div>
        </div>

        <div className="sac-card p-4 border-l-4 border-l-emerald-500 space-y-1">
          <div className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Ongoing</div>
          <div className="text-2xl font-black font-cinzel text-emerald-600">{ongoingCount}</div>
        </div>

        <div className="sac-card p-4 border-l-4 border-l-slate-400 space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Completed</div>
          <div className="text-2xl font-black font-cinzel text-slate-700">{completedCount}</div>
        </div>

        <div className="sac-card p-4 border-l-4 border-l-amber-500 space-y-1 col-span-2 lg:col-span-1">
          <div className="text-xs text-amber-700 font-bold uppercase tracking-wider">Total Registrations</div>
          <div className="text-2xl font-black font-cinzel text-amber-600">{registrations.length}</div>
        </div>
      </div>

      {/* Navigation Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "events" ? "bg-[#ff5733] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Events Catalog ({events.length})
          </button>
          <button
            onClick={() => setActiveTab("registrations")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "registrations" ? "bg-[#ff5733] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Student Registrations ({registrations.length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5733]"
          />
        </div>
      </div>

      {/* Events Table View */}
      {activeTab === "events" && (
        <div className="sac-card overflow-hidden border border-slate-200 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Event Title & Category</th>
                  <th className="px-6 py-4">Organizing Body</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Publish State</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEvents.map((evt) => {
                  const status = resolveEventStatus(evt);
                  const regCount = registrations.filter((r) => r.eventId === evt._id).length;

                  return (
                    <tr key={evt._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 text-sm font-cinzel">{evt.title}</div>
                        <div className="text-[11px] text-slate-500">{evt.category} • {evt.venue}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-[#ff5733]">
                        {evt.organizingBody?.name || "SAC"}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={status} />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublish(evt)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                            evt.isPublished
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                              : "bg-red-50 text-red-700 border border-red-300"
                          }`}
                        >
                          {evt.isPublished ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {evt.isPublished ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedEventRegs(evt)}
                            className="px-3 py-1.5 rounded-lg bg-orange-50 text-[#ff5733] border border-orange-200 text-[11px] font-bold flex items-center gap-1 hover:bg-[#ff5733] hover:text-white transition-all"
                          >
                            <Users className="w-3 h-3" /> Regs ({regCount})
                          </button>
                          <button
                            onClick={() => setEditingEvent(evt)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                            title="Edit Event"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(evt)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                            title="Delete Event"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Registrations View */}
      {activeTab === "registrations" && (
        <div className="sac-card p-6 space-y-4 border border-slate-200 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-cinzel text-slate-900">Student Registration Records</h3>
            <span className="text-xs text-slate-500 font-semibold">Total: {registrations.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Roll Number</th>
                  <th className="px-4 py-3">Branch & Year</th>
                  <th className="px-4 py-3">Event Title</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((reg) => (
                  <tr key={reg._id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold text-slate-900">{reg.studentName}</td>
                    <td className="px-4 py-3 font-mono text-[#ff5733] font-bold">{reg.rollNumber}</td>
                    <td className="px-4 py-3 font-medium">{reg.branch} ({reg.year})</td>
                    <td className="px-4 py-3 text-slate-800 font-semibold">{reg.eventTitle || "Event"}</td>
                    <td className="px-4 py-3 text-slate-500">{new Date(reg.registeredAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Event Form Modal */}
      {(isCreating || editingEvent) && (
        <AdminEventForm
          eventToEdit={editingEvent}
          onClose={() => {
            setIsCreating(false);
            setEditingEvent(null);
          }}
        />
      )}

      {/* Registrations Drawer */}
      {selectedEventRegs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <button
              onClick={() => setSelectedEventRegs(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold font-cinzel text-slate-900">
              Registrations for: <span className="text-[#ff5733]">{selectedEventRegs.title}</span>
            </h3>

            <div className="max-h-96 overflow-y-auto space-y-2 border-t border-slate-100 pt-4 text-xs">
              {registrations.filter((r) => r.eventId === selectedEventRegs._id).map((r) => (
                <div key={r._id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">{r.studentName} ({r.rollNumber})</div>
                    <div className="text-[11px] text-slate-500">{r.email} • {r.phone} • {r.branch} ({r.year})</div>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">{new Date(r.registeredAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
