import React from "react";
import { Search, RefreshCw } from "lucide-react";

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
  selectedClub,
  setSelectedClub,
  organizingBodies = [],
  onReset
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 space-y-4 shadow-sm">
      {/* Top Bar: Search + Status Filter Pills */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events by title, keyword, or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff5733] focus:ring-1 focus:ring-[#ff5733] transition-all"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto overflow-x-auto max-w-full">
          {["all", "upcoming", "ongoing", "completed"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize whitespace-nowrap transition-all ${
                selectedStatus === st
                  ? "bg-[#ff5733] text-white shadow-md shadow-[#ff5733]/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              {st === "all" ? "All Events" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">
            Organizing Body
          </label>
          <select
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#ff5733]"
          >
            <option value="all">All Clubs & Committees</option>
            {organizingBodies.map((ob) => (
              <option key={ob._id || ob.code} value={ob._id || ob.name}>
                {ob.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#ff5733]"
          >
            <option value="all">All Categories</option>
            {["Technical", "Cultural", "Sports", "Literary", "Workshop", "Management"].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={onReset}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 rounded-xl text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
