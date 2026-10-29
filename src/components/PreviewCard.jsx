import { Avatar } from "./Icons";

function money(digits) {
  if (!digits) return null;
  return `$${Number(digits).toLocaleString("en-US")}`;
}

function SpecIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-[#65686c]" aria-hidden="true">
      <path
        fill="currentColor"
        d="M2.2 11.2 3.6 7.6h12.8l1.4 3.6v3.6h-1.5a2 2 0 0 1-3.8 0H7.5a2 2 0 0 1-3.8 0H2.2v-3.6Zm2.4-2h10.8l-.7-1.6H5.3l-.7 1.6ZM6.2 13.6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm7.6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
      />
    </svg>
  );
}

function ReddingMap() {
  return (
    <div className="relative mt-3 h-[72px] overflow-hidden rounded-lg">
      <img src={`${import.meta.env.BASE_URL}redding-map.png`} alt="" className="h-full w-full object-cover object-center" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35 ring-1 ring-white/80"
        style={{ left: "42%", top: "46%" }}
      />
      <svg
        viewBox="0 0 24 36"
        aria-hidden="true"
        className="pointer-events-none absolute h-5 w-3.5 -translate-x-1/2 -translate-y-[85%]"
        style={{ left: "42%", top: "42%" }}
      >
        <path
          fill="#e41e3f"
          d="M12 0C6.2 0 1.6 4.6 1.6 10.2 1.6 18 12 28 12 28s10.4-10 10.4-17.8C22.4 4.6 17.8 0 12 0Z"
        />
        <circle cx="12" cy="10" r="3.6" fill="#fff" />
      </svg>
      <span className="absolute top-1/2 right-1.5 flex h-[22px] w-[22px] -translate-y-1/2 items-center justify-center rounded-full bg-white text-[12px] font-bold text-[#1c1e21] shadow-[0_1px_3px_rgba(0,0,0,0.25)]">
        i
      </span>
    </div>
  );
}

export default function PreviewCard({ form, spec, photoUrl }) {
  const title = [form.year, form.make, form.model].filter(Boolean).join(" ") || "Title";
  const price = money(form.price);
  const details = [];
  if (spec.mileage && form.mileage) details.push(`${Number(form.mileage).toLocaleString("en-US")} miles`);
  if (spec.body && form.body) details.push(form.body);
  if (spec.exterior && form.exterior) details.push(`${form.exterior} exterior`);
  if (spec.interior && form.interior) details.push(`${form.interior} interior`);
  if (spec.fuel && form.fuel) details.push(form.fuel);
  if (spec.transmission && form.transmission) details.push(form.transmission);
  if (spec.condition && form.condition) details.push(form.condition);
  if (spec.cleanTitle && form.cleanTitle) details.push("Clean title");

  return (
    <section className="flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.04)]">
      <h2 className="px-4 pt-3 pb-2 text-[15px] leading-5 font-semibold text-[#080809]">Preview</h2>
      <div className="flex min-h-0 flex-1 gap-0 px-3 pb-3">
        <div className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden rounded-xl bg-[#f0f2f5] px-10">
          {photoUrl ? <img src={photoUrl} alt="" className="absolute inset-0 h-full w-full object-cover" /> : null}
          {photoUrl ? null : (
            <div className="max-w-[460px] text-center">
              <p className="text-[20px] leading-6 font-semibold text-[#65686c]">Your listing preview</p>
              <p className="mt-2 text-[15px] leading-5 text-[#8a8d91]">
                As you create your listing, you can preview how it will appear to others on Marketplace.
              </p>
            </div>
          )}
        </div>
        <aside className="flex w-[272px] shrink-0 flex-col overflow-y-auto bg-white pt-1 pr-4 pl-3">
          <h3 className="text-[20px] leading-6 font-bold text-[#080809]">{title}</h3>
          <p className={`mt-0.5 text-[15px] leading-5 ${price ? "font-semibold text-[#080809]" : "text-[#65686c]"}`}>
            {price || "Price"}
          </p>
          <p className="mt-1 text-[12px] leading-4 text-[#65686c]">
            Listed a few seconds ago in {form.location || "your area"}
          </p>

          <h4 className="mt-5 text-[17px] leading-5 font-bold text-[#080809]">About this vehicle</h4>
          <div className="mt-2 flex flex-col gap-2">
            {details.length === 0 ? (
              <p className="text-[15px] leading-5 text-[#65686c]">Vehicle details will appear here.</p>
            ) : (
              details.map((detail) => (
                <div key={detail} className="flex items-start gap-2">
                  <SpecIcon />
                  <p className="max-w-[9.5rem] text-[15px] leading-5 text-[#080809]">{detail}</p>
                </div>
              ))
            )}
          </div>

          <h4 className="mt-5 text-[17px] leading-5 font-bold text-[#080809]">Seller's description</h4>
          <p className="mt-1 text-[15px] leading-5 whitespace-pre-wrap text-[#65686c]">
            {form.description || "Description will appear here."}
          </p>
          <ReddingMap />
          <p className="mt-2 text-[13px] leading-4 text-[#080809]">
            {form.location || "Location"} · Location is approximate
          </p>

          <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#e4e6eb] pt-3">
            <h4 className="text-[15px] leading-5 font-semibold text-[#080809]">Seller information</h4>
            <p className="text-[13px] text-[#65686c]">Seller details</p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Avatar className="h-9 w-9" />
            <p className="text-[15px] font-semibold text-[#080809]">Hamza Maqbool</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
