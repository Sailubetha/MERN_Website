import React from "react";
import { X } from "lucide-react";

const ImageLightbox = ({ imageUrl, caption, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 spotlight-backdrop backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] p-2 bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:bg-[#ff5733] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full max-h-[75vh] overflow-hidden rounded-2xl flex items-center justify-center bg-slate-950">
          <img
            src={imageUrl}
            alt={caption || "Spotlight view"}
            className="w-full h-full object-contain max-h-[75vh]"
          />
        </div>

        {caption && (
          <div className="p-3 text-center text-xs font-semibold text-slate-300">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageLightbox;
