import React, { useState } from "react";
import { X, Plus, Trash2, Save, Sparkles, Layers } from "lucide-react";
import { useEvents } from "../context/EventContext";

const AdminEventForm = ({ eventToEdit, onClose }) => {
  const { addEvent, updateEvent, organizingBodies } = useEvents();

  const [formData, setFormData] = useState({
    title: eventToEdit?.title || "",
    shortDescription: eventToEdit?.shortDescription || "",
    description: eventToEdit?.description || "",
    category: eventToEdit?.category || "Technical",
    organizingBody: eventToEdit?.organizingBody?._id || organizingBodies[0]?._id,
    startDate: eventToEdit?.startDate ? eventToEdit.startDate.substring(0, 16) : "",
    endDate: eventToEdit?.endDate ? eventToEdit.endDate.substring(0, 16) : "",
    venue: eventToEdit?.venue || "",
    posterUrl: eventToEdit?.posterUrl || "",
    maxParticipants: eventToEdit?.maxParticipants || 0,
    prizes: eventToEdit?.prizes || "",
    eligibility: eventToEdit?.eligibility || "",
    manualStatusOverride: eventToEdit?.manualStatusOverride || "automatic",
    registrationEnabled: eventToEdit?.registrationSettings?.enabled ?? true,
    customFields: eventToEdit?.registrationSettings?.customFields || []
  });

  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");

  const addCustomField = () => {
    if (!newFieldLabel.trim()) return;
    setFormData((prev) => ({
      ...prev,
      customFields: [
        ...prev.customFields,
        { fieldLabel: newFieldLabel.trim(), fieldType: newFieldType, required: true }
      ]
    }));
    setNewFieldLabel("");
  };

  const removeCustomField = (index) => {
    setFormData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedBody = organizingBodies.find(
      (b) => b._id === formData.organizingBody || b.name === formData.organizingBody
    ) || organizingBodies[0];

    const payload = {
      title: formData.title,
      shortDescription: formData.shortDescription,
      description: formData.description,
      category: formData.category,
      organizingBody: selectedBody,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      venue: formData.venue,
      posterUrl: formData.posterUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
      maxParticipants: Number(formData.maxParticipants),
      prizes: formData.prizes,
      eligibility: formData.eligibility,
      manualStatusOverride: formData.manualStatusOverride,
      registrationSettings: {
        enabled: formData.registrationEnabled,
        customFields: formData.customFields
      }
    };

    if (eventToEdit) {
      updateEvent(eventToEdit._id, payload);
    } else {
      addEvent(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-[#ff5733] border border-orange-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> SAC Admin Event Form
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900">
            {eventToEdit ? "Edit Event Details" : "Create New SAC Event"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Event Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. RoboWars 2026 Championship"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
              >
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Literary">Literary</option>
                <option value="Workshop">Workshop</option>
                <option value="Management">Management</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Organizing Body *</label>
              <select
                value={formData.organizingBody}
                onChange={(e) => setFormData({ ...formData, organizingBody: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
              >
                {organizingBodies.map((ob) => (
                  <option key={ob._id} value={ob._id}>
                    {ob.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Start Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">End Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Venue *</label>
              <input
                type="text"
                required
                placeholder="e.g. Main Auditorium & Open Air Theatre"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Poster Image URL</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.posterUrl}
                onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Short Description *</label>
              <input
                type="text"
                required
                placeholder="Brief 1-line summary for event cards"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Full Description *</label>
              <textarea
                rows={4}
                required
                placeholder="Detailed event breakdown, guidelines, schedule..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Max Participant Limit (0 = Unlimited)</label>
              <input
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Status Override (Optional)</label>
              <select
                value={formData.manualStatusOverride}
                onChange={(e) => setFormData({ ...formData, manualStatusOverride: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
              >
                <option value="automatic">Automatic (Date-Based)</option>
                <option value="upcoming">Force Upcoming</option>
                <option value="ongoing">Force Ongoing</option>
                <option value="completed">Force Completed</option>
              </select>
            </div>
          </div>

          {/* Dynamic Registration Fields */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-[#ff5733] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Event Registration Schema Builder
            </h4>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add custom field (e.g. Team Name, GitHub Profile)"
                value={newFieldLabel}
                onChange={(e) => setNewFieldLabel(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
              />
              <button
                type="button"
                onClick={addCustomField}
                className="px-4 py-2 rounded-xl bg-[#ff5733] hover:bg-[#e04826] text-white font-bold flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add Field
              </button>
            </div>

            {formData.customFields.length > 0 && (
              <div className="space-y-1.5">
                {formData.customFields.map((field, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-800 font-semibold">{field.fieldLabel}</span>
                    <button
                      type="button"
                      onClick={() => removeCustomField(idx)}
                      className="text-red-600 hover:text-red-700 p-1 font-bold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#ff5733] hover:bg-[#e04826] text-white font-bold flex items-center gap-1.5 shadow-md shadow-[#ff5733]/25"
            >
              <Save className="w-4 h-4" /> Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEventForm;
