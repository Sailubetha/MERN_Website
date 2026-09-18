import React, { useState } from "react";
import { X, CheckCircle, AlertCircle, Send, Sparkles, User, Mail, Phone, BookOpen, Layers } from "lucide-react";
import { useEvents } from "../../context/EventContext";

const RegisterModal = ({ event, onClose }) => {
  const { registerStudent } = useEvents();

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
    rollNumber: "",
    branch: "Computer Science & Engineering",
    year: "3rd",
    section: "A",
    customAnswers: {}
  });

  const [error, setError] = useState(null);
  const [submittedReg, setSubmittedReg] = useState(null);

  if (!event) return null;

  const handleCustomChange = (fieldLabel, value) => {
    setFormData((prev) => ({
      ...prev,
      customAnswers: {
        ...prev.customAnswers,
        [fieldLabel]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.studentName || !formData.email || !formData.phone || !formData.rollNumber) {
      setError("Please fill in all required standard student information.");
      return;
    }

    const res = registerStudent(event._id, formData);
    if (!res.success) {
      setError(res.message);
      return;
    }

    setSubmittedReg(res.registration);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-[#ff5733] border border-orange-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Event Registration Form
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900">
            {event.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Organized by: <strong className="text-slate-800">{event.organizingBody?.name || "SAC"}</strong>
          </p>
        </div>

        {submittedReg ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 shadow-md">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-cinzel text-slate-900">Registration Successful!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your registration for <span className="text-[#ff5733] font-bold">{event.title}</span> has been confirmed and recorded.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto text-left text-xs space-y-2 text-slate-700 shadow-inner">
              <div className="flex justify-between">
                <span className="text-slate-500">Registration ID:</span>
                <span className="font-mono text-[#ff5733] font-bold">{submittedReg._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-semibold">{submittedReg.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Roll Number:</span>
                <span className="font-semibold">{submittedReg.rollNumber}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#ff5733] hover:bg-[#e04826] text-white text-xs font-bold shadow-md shadow-[#ff5733]/25"
            >
              Done & Return to Website
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#ff5733]" /> Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Betha Sailu"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#ff5733]" /> College Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sailu@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#ff5733]" /> Roll Number / Student ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 23FE1A0515"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#ff5733]" /> Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Branch / Department *</label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Artificial Intelligence & ML">Artificial Intelligence & ML</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Year *</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
                  >
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                    <option value="PG">Postgraduate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Section</label>
                  <input
                    type="text"
                    placeholder="Section A"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
                  />
                </div>
              </div>
            </div>

            {event.registrationSettings?.customFields?.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-[#ff5733] uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Event Specific Requirements
                </h4>
                {event.registrationSettings.customFields.map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-slate-700 font-bold mb-1">
                      {field.fieldLabel} {field.required && "*"}
                    </label>
                    {field.fieldType === "select" ? (
                      <select
                        required={field.required}
                        value={formData.customAnswers[field.fieldLabel] || ""}
                        onChange={(e) => handleCustomChange(field.fieldLabel, e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
                      >
                        <option value="">Select option...</option>
                        {field.options?.map((opt, oIdx) => (
                          <option key={oIdx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.fieldType || "text"}
                        required={field.required}
                        placeholder={`Enter ${field.fieldLabel}`}
                        value={formData.customAnswers[field.fieldLabel] || ""}
                        onChange={(e) => handleCustomChange(field.fieldLabel, e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#ff5733]"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#ff5733] hover:bg-[#e04826] text-white font-bold shadow-md shadow-[#ff5733]/25 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Submit Registration
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterModal;
