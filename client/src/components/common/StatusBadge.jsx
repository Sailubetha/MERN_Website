import React from "react";
import { getStatusTheme } from "../../utils/statusResolver";

const StatusBadge = ({ status, customLabel }) => {
  const theme = getStatusTheme(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md transition-all ${theme.badgeBg}`}
    >
      <span className={`w-2 h-2 rounded-full ${theme.dotBg}`}></span>
      {customLabel || theme.label}
    </span>
  );
};

export default StatusBadge;
