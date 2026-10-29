export function Logo() {
  return (
    <svg viewBox="0 0 36 36" className="h-10 w-10" aria-hidden="true">
      <path
        fill="#0866FF"
        d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z"
      />
      <path
        fill="#fff"
        d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z"
      />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M6.85 2.2a4.65 4.65 0 1 0 2.92 8.27l3.08 3.08a.75.75 0 0 0 1.06-1.06L10.8 9.38A4.65 4.65 0 0 0 6.85 2.2ZM3.7 6.85a3.15 3.15 0 1 1 6.3 0 3.15 3.15 0 0 1-6.3 0Z" />
    </svg>
  );
}

export function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#1c1e21]" aria-hidden="true">
      <path d="M4.8 7.2h10.4L10 13.4 4.8 7.2Z" fill="currentColor" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 text-[#0866ff]" aria-hidden="true">
      <path d="M4.5 10.5 8 14l7.5-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#1c1e21]" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.8a6.2 6.2 0 0 0-6.2 6.2c0 4.7 6.2 12.2 6.2 12.2s6.2-7.5 6.2-12.2A6.2 6.2 0 0 0 12 2.8Zm0 8.4a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Z"
      />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
      <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 8h12M8 2c1.6 1.8 2.4 3.8 2.4 6S9.6 12.2 8 14C6.4 12.2 5.6 10.2 5.6 8S6.4 3.8 8 2Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function PhotoIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#e4e6eb" />
      <rect x="11" y="11" width="18" height="18" rx="4" fill="#1c1e21" />
      <path d="M20 14.6v10.8M14.6 20h10.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function VideoIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#e4e6eb" />
      <path
        fill="#1c1e21"
        d="M9.5 14.2h13.2a2.4 2.4 0 0 1 2.4 2.4v7.2a2.4 2.4 0 0 1-2.4 2.4H9.5a2.4 2.4 0 0 1-2.4-2.4v-7.2a2.4 2.4 0 0 1 2.4-2.4Z"
      />
      <path d="M25.2 17.2 31 14.4v11.2l-5.8-2.8v-5.6Z" fill="#1c1e21" />
      <path d="M16.2 17.4v5.2M13.6 20h5.2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <rect x="7.2" y="2.2" width="9.6" height="19.6" rx="2" fill="currentColor" />
      <rect x="10.2" y="17.4" width="3.6" height="1.4" rx="0.7" fill="#f0f2f5" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function NavGlyph({ children, active }) {
  return (
    <span className={active ? "text-[#0866ff]" : "text-[#1c1e21]"}>
      {children}
    </span>
  );
}

export function HomeIcon() {
  return (
    <NavGlyph>
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    </NavGlyph>
  );
}

export function ReelsIcon() {
  return (
    <NavGlyph>
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M10 9.2v5.6l5-2.8-5-2.8Z" fill="currentColor" />
      </svg>
    </NavGlyph>
  );
}

export function StoreIcon({ active }) {
  return (
    <NavGlyph active={active}>
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
          d="M4 9.5 5.4 5.5h13.2L20 9.5V20a1 1 0 0 1-1 1h-4.2v-6H9.2V21H5a1 1 0 0 1-1-1V9.5Z"
        />
      </svg>
    </NavGlyph>
  );
}

export function GroupsIcon() {
  return (
    <NavGlyph>
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <circle cx="9" cy="9" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="16" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4.5 18.5c.6-2.4 2.4-3.6 4.5-3.6s3.9 1.2 4.5 3.6M14 15.2c1.6.1 2.9 1 3.5 3.3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </NavGlyph>
  );
}

export function GamingIcon() {
  return (
    <NavGlyph>
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <rect x="3" y="8" width="18" height="9" rx="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 12.5v3M6.5 14h3M15.5 12.5h.01M17.5 14.5h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </NavGlyph>
  );
}

export function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => (
        <rect
          key={index}
          x={4 + (index % 3) * 6}
          y={4 + Math.floor(index / 3) * 6}
          width="3.2"
          height="3.2"
          rx="0.6"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M6 16.5h12l-1.2-2V11a4.8 4.8 0 0 0-9.6 0v3.5L6 16.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 16.5a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function Avatar({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#D8DADF" />
      <circle cx="20" cy="16" r="6" fill="#8D949E" />
      <path d="M8 33.5c1.8-5 6-7.5 12-7.5s10.2 2.5 12 7.5" fill="#8D949E" />
    </svg>
  );
}
