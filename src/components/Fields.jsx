import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckIcon, ChevronIcon, PinIcon } from "./Icons";

function useMenu(open, onClose) {
  const rootRef = useRef(null);
  const anchorRef = useRef(null);
  const menuRef = useRef(null);
  const [box, setBox] = useState(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const measure = () => {
    const rect = anchorRef.current?.getBoundingClientRect();
    if (!rect) return;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUp = spaceBelow < 220 && spaceAbove > spaceBelow;
    const available = (openUp ? spaceAbove : spaceBelow) - 12;
    setBox({
      left: rect.left,
      width: rect.width,
      top: rect.bottom + 4,
      bottom: window.innerHeight - rect.top + 4,
      openUp,
      maxHeight: Math.max(140, Math.min(320, available)),
    });
  };

  useEffect(() => {
    if (!open) return undefined;
    const close = () => onCloseRef.current();
    const onPointer = (event) => {
      const target = event.target;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      close();
    };
    const onKey = (event) => {
      if (event.key === "Escape") close();
    };
    const onScroll = (event) => {
      if (menuRef.current?.contains(event.target)) return;
      close();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return { rootRef, anchorRef, menuRef, box, measure };
}

function menuStyle(box) {
  if (!box) return { display: "none" };
  const edge = box.openUp ? { bottom: box.bottom } : { top: box.top };
  return { left: box.left, width: box.width, maxHeight: box.maxHeight, ...edge };
}

const menuClass =
  "fixed z-50 overflow-auto rounded-lg bg-white py-1 shadow-[0_12px_28px_rgba(0,0,0,0.18),0_2px_4px_rgba(0,0,0,0.08)]";

export function TextField({ label, value, onChange, inputMode }) {
  const filled = value.length > 0;
  return (
    <label className="relative block h-[58px] rounded-xl border border-[#ced0d4] bg-white focus-within:border-[#0866ff]">
      <span
        className={`pointer-events-none absolute left-4 text-[#606770] ${
          filled
            ? "top-2 text-[12px] font-semibold leading-4"
            : "top-1/2 -translate-y-1/2 text-[16px] font-normal leading-5 text-[#65686c]"
        }`}
      >
        {label}
      </span>
      <input
        aria-label={label}
        value={value}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        className="h-full w-full bg-transparent px-4 pt-[26px] pb-[10px] text-[16px] leading-5 text-[#080809] outline-none"
      />
    </label>
  );
}

export function TextAreaField({ label, value, onChange }) {
  return (
    <div className="rounded-xl border border-[#ced0d4] bg-white focus-within:border-[#0866ff]">
      <textarea
        aria-label={label}
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[118px] w-full resize-none rounded-xl bg-transparent px-4 py-4 text-[16px] leading-5 text-[#080809] outline-none placeholder:text-[#65686c]"
      />
    </div>
  );
}

export function SelectField({ label, value, options, open, onOpenChange, onChange }) {
  const { rootRef, anchorRef, menuRef, box, measure } = useMenu(open, () => onOpenChange(false));

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={anchorRef}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          if (!open) measure();
          onOpenChange(!open);
        }}
        className={`relative h-[58px] w-full rounded-xl border bg-white text-left ${
          open ? "border-[#0866ff]" : "border-[#ced0d4]"
        }`}
      >
        <span
          className={`pointer-events-none absolute left-4 ${
            value
              ? "top-2 text-[12px] font-semibold leading-4 text-[#606770]"
              : "top-1/2 -translate-y-1/2 text-[16px] leading-5 text-[#65686c]"
          }`}
        >
          {label}
        </span>
        {value ? (
          <span className="absolute right-10 bottom-[10px] left-4 truncate text-[16px] leading-5 text-[#080809]">
            {value}
          </span>
        ) : null}
        <span className="absolute top-1/2 right-3 -translate-y-1/2">
          <ChevronIcon />
        </span>
      </button>
      {open && box
        ? createPortal(
            <ul ref={menuRef} role="listbox" aria-label="Select an option" className={menuClass} style={menuStyle(box)}>
          {options.map((option) => {
            const selected = option === value;
            return (
              <li key={option} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option);
                    onOpenChange(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-[15px] text-[#080809] hover:bg-[#f2f2f2]"
                >
                  <span>{option}</span>
                  {selected ? <CheckIcon /> : null}
                </button>
              </li>
            );
          })}
            </ul>,
            document.body,
          )
        : null}
    </div>
  );
}

export function LocationField({ value, suggestions, open, onOpenChange, onChange }) {
  const { rootRef, anchorRef, menuRef, box, measure } = useMenu(open, () => onOpenChange(false));
  const filled = value.length > 0;

  return (
    <div ref={rootRef} className="relative">
      <label
        ref={anchorRef}
        className={`flex h-[58px] items-center gap-2 rounded-xl border bg-white px-3 focus-within:border-[#0866ff] ${
          open ? "border-[#0866ff]" : "border-[#ced0d4]"
        }`}
      >
        <PinIcon />
        <span className="relative block h-full flex-1">
          <span
            className={`pointer-events-none absolute left-1 ${
              filled
                ? "top-2 text-[12px] font-semibold leading-4 text-[#606770]"
                : "top-1/2 -translate-y-1/2 text-[16px] leading-5 text-[#65686c]"
            }`}
          >
            Location
          </span>
          <input
            aria-label="Location"
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
              if (!open) {
                measure();
                onOpenChange(true);
              }
            }}
            onFocus={() => {
              measure();
              onOpenChange(true);
            }}
            className="h-full w-full bg-transparent pt-[22px] pr-2 pb-1.5 pl-1 text-[16px] leading-5 text-[#080809] outline-none"
          />
        </span>
      </label>
      {open && box && suggestions.length > 0
        ? createPortal(
            <ul ref={menuRef} role="listbox" aria-label="Select an option" className={menuClass} style={menuStyle(box)}>
          {suggestions.map((city) => (
            <li key={city} role="option" aria-selected={city === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(city);
                  onOpenChange(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] text-[#080809] hover:bg-[#f2f2f2]"
              >
                <PinIcon />
                <span>{city}</span>
              </button>
            </li>
          ))}
            </ul>,
            document.body,
          )
        : null}
    </div>
  );
}
