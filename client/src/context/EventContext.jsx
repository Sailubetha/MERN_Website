import React, { createContext, useContext, useState, useEffect } from "react";
import { mockEvents, mockOrganizingBodies } from "../data/mockEvents";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("sac_events_cache");
    return saved ? JSON.parse(saved) : mockEvents;
  });

  const [organizingBodies] = useState(mockOrganizingBodies);

  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem("sac_registrations_cache");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(false);

  // Sync state with localStorage cache for smooth offline demonstration
  useEffect(() => {
    localStorage.setItem("sac_events_cache", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("sac_registrations_cache", JSON.stringify(registrations));
  }, [registrations]);

  // Fetch events from Express API when available
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.log("Using cached/mock events data.");
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData) => {
    // Attempt API save
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData)
      });
      if (res.ok) {
        const newEvt = await res.json();
        setEvents((prev) => [newEvt, ...prev]);
        return { success: true, event: newEvt };
      }
    } catch (err) {
      console.log("Saving locally to state cache...");
    }

    // Local state fallback
    const newEvt = {
      ...eventData,
      _id: "evt_" + Date.now(),
      slug: (eventData.title || "event").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      isPublished: true,
      manualStatusOverride: eventData.manualStatusOverride || "automatic",
      gallery: eventData.gallery || [],
      registrationSettings: eventData.registrationSettings || { enabled: true, customFields: [] }
    };

    setEvents((prev) => [newEvt, ...prev]);
    return { success: true, event: newEvt };
  };

  const updateEvent = (id, updatedData) => {
    setEvents((prev) =>
      prev.map((item) => (item._id === id || item.slug === id ? { ...item, ...updatedData } : item))
    );
    return { success: true };
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((item) => item._id !== id && item.slug !== id));
    return { success: true };
  };

  const registerStudent = (eventId, studentData) => {
    const targetEvent = events.find((e) => e._id === eventId || e.slug === eventId);
    if (!targetEvent) return { success: false, message: "Event not found" };

    // Duplicate check by roll number
    const existing = registrations.find(
      (r) => r.eventId === eventId && r.rollNumber.toLowerCase() === studentData.rollNumber.toLowerCase()
    );

    if (existing) {
      return {
        success: false,
        message: `Roll Number ${studentData.rollNumber} is already registered for this event!`
      };
    }

    const newReg = {
      _id: "reg_" + Date.now(),
      eventId: targetEvent._id,
      eventTitle: targetEvent.title,
      ...studentData,
      registeredAt: new Date().toISOString()
    };

    setRegistrations((prev) => [newReg, ...prev]);
    return { success: true, registration: newReg };
  };

  return (
    <EventContext.Provider
      value={{
        events,
        organizingBodies,
        registrations,
        loading,
        fetchEvents,
        addEvent,
        updateEvent,
        deleteEvent,
        registerStudent
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
