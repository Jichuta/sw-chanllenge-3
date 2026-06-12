"use client";

import { useState } from "react";
import { ENGLISH_LEVELS } from "@/src/lib/constants";

type Filters = {
  country: string;
  city: string;
  englishLevel: string;
};

type CandidateFiltersProps = Readonly<{
  onFilter: (filters: Filters) => void;
}>;

export const CandidateFilters = ({ onFilter }: CandidateFiltersProps) => {
  const [filters, setFilters] = useState<Filters>({
    country: "",
    city: "",
    englishLevel: ""
  });

  const handleChange = (field: keyof Filters, value: string) => {
    const next = { ...filters, [field]: value };
    setFilters(next);
  };

  const handleApply = () => onFilter(filters);

  const handleClear = () => {
    const cleared = { country: "", city: "", englishLevel: "" };
    setFilters(cleared);
    onFilter(cleared);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleApply();
  };

  return (
    <div className="flex flex-wrap items-end gap-3" onKeyDown={handleKeyDown}>
      <div>
        <label htmlFor="filter-country" className="mb-1 block text-xs font-medium text-muted-foreground">
          Country
        </label>
        <input
          id="filter-country"
          type="text"
          value={filters.country}
          onChange={(e) => handleChange("country", e.target.value)}
          placeholder="Any country"
          className="w-44 rounded-md border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="filter-city" className="mb-1 block text-xs font-medium text-muted-foreground">
          City
        </label>
        <input
          id="filter-city"
          type="text"
          value={filters.city}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="Any city"
          className="w-44 rounded-md border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="filter-level" className="mb-1 block text-xs font-medium text-muted-foreground">
          English level
        </label>
        <select
          id="filter-level"
          value={filters.englishLevel}
          onChange={(e) => handleChange("englishLevel", e.target.value)}
          className="w-40 rounded-md border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All levels</option>
          {ENGLISH_LEVELS.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleApply}
        className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition hover:opacity-90"
      >
        Apply
      </button>

      <button
        type="button"
        onClick={handleClear}
        className="inline-flex h-9 items-center rounded-md border border-border px-4 text-xs font-medium text-foreground transition hover:bg-muted"
      >
        Clear
      </button>
    </div>
  );
};
