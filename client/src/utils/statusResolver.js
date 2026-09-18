export const resolveEventStatus = (event) => {
  if (!event) return "upcoming";

  if (event.manualStatusOverride && event.manualStatusOverride !== "automatic") {
    return event.manualStatusOverride;
  }

  const now = new Date();
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "ongoing";
  return "completed";
};

export const getStatusTheme = (status) => {
  switch (status) {
    case "upcoming":
      return {
        cardClass: "theme-upcoming-sac",
        badgeBg: "bg-[#ff5733]/10 text-[#ff5733] border-[#ff5733]/30",
        dotBg: "bg-[#ff5733]",
        label: "Upcoming",
        btnColor: "bg-[#ff5733] hover:bg-[#e04826] text-white shadow-md shadow-[#ff5733]/20"
      };
    case "ongoing":
      return {
        cardClass: "theme-ongoing-sac",
        badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-300 animate-pulse",
        dotBg: "bg-emerald-500 animate-ping",
        label: "Happening Now",
        btnColor: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
      };
    case "completed":
      return {
        cardClass: "theme-completed-sac",
        badgeBg: "bg-slate-100 text-slate-600 border-slate-300",
        dotBg: "bg-slate-400",
        label: "Completed",
        btnColor: "bg-slate-800 hover:bg-slate-900 text-white"
      };
    default:
      return {
        cardClass: "sac-card",
        badgeBg: "bg-[#ff5733]/10 text-[#ff5733] border-[#ff5733]/30",
        dotBg: "bg-[#ff5733]",
        label: status,
        btnColor: "bg-[#ff5733] hover:bg-[#e04826] text-white"
      };
  }
};

export const formatDateRange = (startDateStr, endDateStr) => {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  const startFormatted = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const startTime = start.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  const endTime = end.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return {
    dateStr: startFormatted,
    timeStr: `${startTime} - ${endTime}`
  };
};
