import { Avatar, BellIcon, GridIcon, Logo } from "./Icons";

export default function TopNav() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between bg-[#f0f2f5] px-3">
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Close"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e4e6eb] text-[#1c1e21] hover:bg-[#d8dadf]"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <a href="#top" aria-label="Facebook" className="shrink-0">
          <Logo />
        </a>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Facebook menu"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e4e6eb] text-[#1c1e21]"
        >
          <GridIcon />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e4e6eb] text-[#1c1e21]"
        >
          <BellIcon />
        </button>
        <button type="button" aria-label="Account, your profile" className="rounded-full">
          <Avatar />
        </button>
      </div>
    </header>
  );
}
