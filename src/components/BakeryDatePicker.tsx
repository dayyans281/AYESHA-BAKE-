import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  Clock,
  Info,
} from 'lucide-react';

export interface BakeryDatePickerProps {
  value: string; // ISO format: 'YYYY-MM-DD'
  onChange: (dateISO: string) => void;
  minDate?: string; // ISO format 'YYYY-MM-DD', default is today
  maxDate?: string; // ISO format 'YYYY-MM-DD'
  label?: string;
  mode?: 'delivery' | 'pickup';
  showQuickPresets?: boolean;
  className?: string;
  id?: string;
}

// Safe local date formatting helpers to avoid timezone shifts
export const getTodayISO = (): string => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const getOffsetDateISO = (daysAhead: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const getNextWeekendISO = (): string => {
  const date = new Date();
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  // If today is Sunday (0), next weekend Saturday is +6 days. If Saturday (6), tomorrow Sunday is +1 day.
  let daysUntilWeekend = 6 - day;
  if (daysUntilWeekend <= 0) {
    daysUntilWeekend = (daysUntilWeekend + 7) || 7;
  }
  date.setDate(date.getDate() + daysUntilWeekend);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const formatDisplayDate = (isoString: string): { main: string; relative: string; dayName: string } => {
  if (!isoString) return { main: 'Choose a date', relative: '', dayName: '' };
  
  const [yearStr, monthStr, dayStr] = isoString.split('-');
  const y = parseInt(yearStr, 10);
  const m = parseInt(monthStr, 10) - 1;
  const d = parseInt(dayStr, 10);
  const targetDate = new Date(y, m, d);

  const todayStr = getTodayISO();
  const tomorrowStr = getOffsetDateISO(1);
  const dayAfterStr = getOffsetDateISO(2);

  let relative = '';
  if (isoString === todayStr) {
    relative = 'Today (Rush)';
  } else if (isoString === tomorrowStr) {
    relative = 'Tomorrow';
  } else if (isoString === dayAfterStr) {
    relative = 'In 2 Days';
  }

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayName = dayNames[targetDate.getDay()];
  const monthName = monthNames[m];
  const main = `${dayName}, ${monthName} ${d}, ${y}`;

  return { main, relative, dayName };
};

export const BakeryDatePicker: React.FC<BakeryDatePickerProps> = ({
  value,
  onChange,
  minDate = getTodayISO(),
  maxDate,
  label,
  mode = 'delivery',
  showQuickPresets = true,
  className = '',
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse currently selected date for calendar view or default to today
  const selectedDateObj = React.useMemo(() => {
    if (!value) return new Date();
    const [y, m, d] = value.split('-').map(Number);
    return new Date(y, m - 1, d);
  }, [value]);

  // Calendar view navigation state (year & month being viewed)
  const [viewYear, setViewYear] = useState(selectedDateObj.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDateObj.getMonth()); // 0 - 11

  // Update calendar view when value changes externally
  useEffect(() => {
    if (value) {
      const [y, m] = value.split('-').map(Number);
      if (!isNaN(y) && !isNaN(m)) {
        setViewYear(y);
        setViewMonth(m - 1);
      }
    }
  }, [value]);

  // Close calendar popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const todayISO = getTodayISO();
  const tomorrowISO = getOffsetDateISO(1);
  const dayAfterTomorrowISO = getOffsetDateISO(2);
  const nextWeekendISO = getNextWeekendISO();

  // Navigation handlers
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Generate calendar days for viewMonth and viewYear
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const monthNamesFull = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleSelectDay = (day: number) => {
    const mStr = String(viewMonth + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    const iso = `${viewYear}-${mStr}-${dStr}`;
    onChange(iso);
    setIsOpen(false);
  };

  const isDayDisabled = (day: number) => {
    const mStr = String(viewMonth + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    const iso = `${viewYear}-${mStr}-${dStr}`;
    if (minDate && iso < minDate) return true;
    if (maxDate && iso > maxDate) return true;
    return false;
  };

  const isDaySelected = (day: number) => {
    if (!value) return false;
    const mStr = String(viewMonth + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    const iso = `${viewYear}-${mStr}-${dStr}`;
    return iso === value;
  };

  const isDayToday = (day: number) => {
    const mStr = String(viewMonth + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    const iso = `${viewYear}-${mStr}-${dStr}`;
    return iso === todayISO;
  };

  const { main: displayMainDate, relative: relativeLabel } = formatDisplayDate(value);
  const isSelectedToday = value === todayISO;

  const defaultLabel = mode === 'delivery' ? 'Preferred Delivery Date *' : 'Preferred Pickup Date *';

  return (
    <div ref={containerRef} className={`space-y-2 relative ${className}`} id={id}>
      {/* Field Label with Status */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#4E342E]">
          {label || defaultLabel}
        </label>
        {relativeLabel && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FCE7F3] text-[#BE185D] border border-[#FBCFE8]">
            {relativeLabel}
          </span>
        )}
      </div>

      {/* Main Interactive Trigger Card */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full text-left px-3.5 py-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer shadow-xs ${
            isOpen
              ? 'border-[#BE185D] ring-2 ring-[#BE185D]/20 bg-white'
              : 'border-[#E8D8CF] bg-white hover:border-[#BE185D]/50'
          }`}
          aria-label="Open date picker calendar"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#FFF1F2] border border-[#FBCFE8] flex items-center justify-center text-[#BE185D] shrink-0">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="text-xs sm:text-sm font-bold text-[#3E2723] truncate">
                {displayMainDate}
              </div>
              <div className="text-[11px] text-[#8D6E63] flex items-center gap-1.5 mt-0.5">
                <span>{mode === 'delivery' ? 'Fresh Doorstep Arrival' : 'Ready at Kitchen Studio'}</span>
                {relativeLabel && <span>• <strong className="text-[#BE185D]">{relativeLabel}</strong></span>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2">
            <span className="text-xs font-semibold text-[#BE185D] bg-[#FDF2F8] px-2.5 py-1 rounded-lg border border-[#FCE7F3] hidden sm:inline-block">
              {isOpen ? 'Close Calendar' : 'Change Date'}
            </span>
            <div className="text-[#8D6E63] transition-transform duration-200">
              <ChevronRight className={`w-4 h-4 transform ${isOpen ? '-rotate-90' : 'rotate-90'}`} />
            </div>
          </div>
        </button>

        {/* Hidden / sync native input for accessible form submission */}
        <input
          type="date"
          value={value}
          min={minDate}
          max={maxDate}
          onChange={(e) => {
            if (e.target.value) {
              onChange(e.target.value);
            }
          }}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      {/* Quick Select Presets Bar */}
      {showQuickPresets && (
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[10px] font-bold uppercase text-[#8D6E63] mr-1">Quick Select:</span>
          
          <button
            type="button"
            onClick={() => onChange(todayISO)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              value === todayISO
                ? 'bg-[#BE185D] text-white shadow-xs'
                : 'bg-[#FFF9F5] text-[#6E4F42] hover:bg-[#FCE7F3] hover:text-[#BE185D] border border-[#F0DFD5]'
            }`}
          >
            <span>Today</span>
            {value === todayISO && <Check className="w-3 h-3" />}
          </button>

          <button
            type="button"
            onClick={() => onChange(tomorrowISO)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              value === tomorrowISO
                ? 'bg-[#BE185D] text-white shadow-xs'
                : 'bg-[#FFF9F5] text-[#6E4F42] hover:bg-[#FCE7F3] hover:text-[#BE185D] border border-[#F0DFD5]'
            }`}
          >
            <span>Tomorrow</span>
            {value === tomorrowISO && <Check className="w-3 h-3" />}
          </button>

          <button
            type="button"
            onClick={() => onChange(dayAfterTomorrowISO)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              value === dayAfterTomorrowISO
                ? 'bg-[#BE185D] text-white shadow-xs'
                : 'bg-[#FFF9F5] text-[#6E4F42] hover:bg-[#FCE7F3] hover:text-[#BE185D] border border-[#F0DFD5]'
            }`}
          >
            <span>In 2 Days</span>
            {value === dayAfterTomorrowISO && <Check className="w-3 h-3" />}
          </button>

          <button
            type="button"
            onClick={() => onChange(nextWeekendISO)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              value === nextWeekendISO
                ? 'bg-[#BE185D] text-white shadow-xs'
                : 'bg-[#FFF9F5] text-[#6E4F42] hover:bg-[#FCE7F3] hover:text-[#BE185D] border border-[#F0DFD5]'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Weekend</span>
            {value === nextWeekendISO && <Check className="w-3 h-3" />}
          </button>
        </div>
      )}

      {/* Interactive Calendar Popover Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 bg-white rounded-3xl border-2 border-[#FCE7F3] shadow-2xl p-4 sm:p-5 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Calendar Header: Month + Year & Nav buttons */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F5E8E0]">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-xl hover:bg-[#FAF5EE] text-[#5D4037] hover:text-[#BE185D] transition-colors cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="font-serif font-bold text-sm sm:text-base text-[#3E2723]">
                {monthNamesFull[viewMonth]} {viewYear}
              </span>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-xl hover:bg-[#FAF5EE] text-[#5D4037] hover:text-[#BE185D] transition-colors cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Days of Week Row */}
          <div className="grid grid-cols-7 gap-1 mt-3 mb-1 text-center">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, i) => (
              <span
                key={d}
                className={`text-[11px] font-bold py-1 ${
                  i === 0 || i === 6 ? 'text-[#BE185D]' : 'text-[#8D6E63]'
                }`}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty slots for days before the 1st of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-9" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const disabled = isDayDisabled(day);
              const selected = isDaySelected(day);
              const today = isDayToday(day);

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelectDay(day)}
                  className={`h-9 w-full rounded-xl text-xs font-semibold flex items-center justify-center transition-all relative cursor-pointer ${
                    selected
                      ? 'bg-[#BE185D] text-white font-bold shadow-md scale-105 z-10'
                      : disabled
                      ? 'text-gray-300 cursor-not-allowed bg-transparent'
                      : today
                      ? 'border-2 border-[#BE185D] text-[#BE185D] hover:bg-[#FCE7F3]'
                      : 'text-[#3E2723] hover:bg-[#FFF1F2] hover:text-[#BE185D]'
                  }`}
                >
                  <span>{day}</span>
                  {today && !selected && (
                    <span className="w-1 h-1 rounded-full bg-[#BE185D] absolute bottom-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Popover Info Bar */}
          <div className="mt-4 pt-3 border-t border-[#F5E8E0] flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="text-[11px] text-[#8D6E63] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#BE185D]" />
              <span>Cakes freshly baked on selected morning</span>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto px-4 py-1.5 rounded-xl bg-[#3E2723] hover:bg-[#2A1810] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Helpful Order Timing Notices */}
      {isSelectedToday ? (
        <div className="p-2.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-[11px] flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">⚡ Same-Day Rush Notice: </strong>
            Cakes require at least 3–4 hours fresh preparation. Please submit via WhatsApp so Chef Ayesha can immediately prioritize your oven slot!
          </div>
        </div>
      ) : (
        <div className="text-[11px] text-[#8D6E63] flex items-center gap-1 pl-1">
          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>All orders baked from scratch on morning of delivery.</span>
        </div>
      )}
    </div>
  );
};
