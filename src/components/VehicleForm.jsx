import { useMemo, useRef, useState } from "react";
import {
  BODY_STYLES,
  CITIES,
  COLORS,
  CONDITIONS,
  EMPTY_FORM,
  FUEL_TYPES,
  MAKES,
  TRANSMISSIONS,
  VEHICLE_TYPES,
  YEARS,
  fieldsFor,
} from "../data/options";
import { LocationField, SelectField, TextAreaField, TextField } from "./Fields";
import { Avatar, CloseIcon, GlobeIcon, PhoneIcon, PhotoIcon, VideoIcon } from "./Icons";
import PreviewCard from "./PreviewCard";
import TopNav from "./TopNav";

const DRAFT_KEY = "marketplace-vehicle-draft";

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    const next = { ...EMPTY_FORM };
    for (const key of Object.keys(EMPTY_FORM)) {
      if (key === "cleanTitle") next.cleanTitle = Boolean(data.cleanTitle);
      else if (typeof data[key] === "string") next[key] = data[key];
    }
    return next;
  } catch {
    return null;
  }
}

function digitsOnly(value, max) {
  return value.replace(/\D/g, "").slice(0, max);
}

function withCommas(digits) {
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
}

function applyType(current, vehicleType) {
  const spec = fieldsFor(vehicleType);
  return {
    ...current,
    vehicleType,
    mileage: spec.mileage ? current.mileage : "",
    body: spec.body ? current.body : "",
    exterior: spec.exterior ? current.exterior : "",
    interior: spec.interior ? current.interior : "",
    cleanTitle: spec.cleanTitle ? current.cleanTitle : false,
    condition: spec.condition ? current.condition : "",
    fuel: spec.fuel ? current.fuel : "",
    transmission: spec.transmission ? current.transmission || "Automatic transmission" : "",
  };
}

export default function VehicleForm() {
  const [form, setForm] = useState(() => {
    const draft = loadDraft();
    return draft ? applyType(draft, draft.vehicleType) : EMPTY_FORM;
  });
  const [openName, setOpenName] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
  const [showPhoneHint, setShowPhoneHint] = useState(false);
  const [draftLabel, setDraftLabel] = useState("Save draft");
  const [step, setStep] = useState(1);
  const photoRef = useRef(null);
  const videoRef = useRef(null);

  const spec = fieldsFor(form.vehicleType);
  const citySuggestions = useMemo(() => {
    const query = form.location.trim().toLowerCase();
    const list = query
      ? CITIES.filter((city) => city.toLowerCase().includes(query))
      : CITIES;
    return list.slice(0, 8);
  }, [form.location]);

  const dirty =
    form.vehicleType !== "" ||
    form.location !== "Redding" ||
    form.year !== "" ||
    form.make !== "" ||
    form.model !== "" ||
    form.mileage !== "" ||
    form.price !== "" ||
    form.body !== "" ||
    form.exterior !== "" ||
    form.interior !== "" ||
    form.cleanTitle ||
    form.condition !== "" ||
    form.fuel !== "" ||
    (form.transmission !== "" && form.transmission !== "Automatic transmission") ||
    form.description !== "" ||
    photos.length > 0 ||
    Boolean(video);

  const canNext = Boolean(
    form.vehicleType &&
      form.location.trim() &&
      form.year &&
      form.make.trim() &&
      form.model.trim() &&
      form.price &&
      (!spec.mileage || form.mileage),
  );

  function update(partial) {
    setStep(1);
    setForm((current) => ({ ...current, ...partial }));
  }

  function chooseType(vehicleType) {
    setStep(1);
    setForm((current) => applyType(current, vehicleType));
  }

  function addPhotos(fileList) {
    const incoming = [...fileList].filter((file) => file.type.startsWith("image/") || /\.(heic|heif)$/i.test(file.name));
    if (incoming.length === 0) return;
    setPhotos((current) => {
      const room = 20 - current.length;
      const next = incoming.slice(0, room).map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
        url: URL.createObjectURL(file),
        name: file.name,
      }));
      return [...current, ...next];
    });
    setStep(1);
  }

  function addVideo(file) {
    if (!file) return;
    setVideo((current) => {
      if (current) URL.revokeObjectURL(current.url);
      return { url: URL.createObjectURL(file), name: file.name };
    });
    setStep(1);
  }

  function removePhoto(id) {
    setPhotos((current) => {
      const found = current.find((photo) => photo.id === id);
      if (found) URL.revokeObjectURL(found.url);
      return current.filter((photo) => photo.id !== id);
    });
  }

  function removeVideo() {
    setVideo((current) => {
      if (current) URL.revokeObjectURL(current.url);
      return null;
    });
  }

  function saveDraft() {
    const payload = { ...form };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    setDraftLabel("Draft saved");
    window.setTimeout(() => setDraftLabel("Save draft"), 1600);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5]">
      <TopNav />
      <div className="flex min-h-0 flex-1 gap-3 px-3 pb-3">
        <form
          className="flex h-full w-[clamp(300px,32%,420px)] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.04)]"
          onSubmit={(event) => {
            event.preventDefault();
            if (canNext) setStep(2);
          }}
        >
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 pt-4">
              <p className="text-[13px] leading-4 text-[#65686c]">Marketplace</p>
              <div className="mt-0.5 flex items-center justify-between gap-3">
                <h1 className="text-[24px] leading-7 font-bold text-[#080809]">Vehicle for sale</h1>
                <button
                  type="button"
                  disabled={!dirty}
                  onClick={saveDraft}
                  className={`shrink-0 text-[15px] font-semibold ${
                    dirty ? "text-[#0866ff] hover:underline" : "cursor-not-allowed text-[#bcc0c4]"
                  }`}
                >
                  {draftLabel}
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 px-4">
              <Avatar />
              <div>
                <p className="text-[15px] leading-5 font-semibold text-[#080809]">Hamza Maqbool</p>
                <p className="flex items-center gap-1 text-[13px] leading-4 text-[#65686c]">
                  <span>Listing to Marketplace</span>
                  <span aria-hidden="true">·</span>
                  <GlobeIcon />
                  <span>Public</span>
                </p>
              </div>
            </div>

            <div className="mt-4 px-4">
              <SelectField
                label="Vehicle type"
                value={form.vehicleType}
                options={VEHICLE_TYPES}
                open={openName === "vehicleType"}
                onOpenChange={(next) => setOpenName(next ? "vehicleType" : null)}
                onChange={chooseType}
              />
            </div>

            <div className="mt-4 px-4">
              <p className="text-[13px] leading-4 font-semibold text-[#65686c]">
                Photos · {photos.length} / 20 Videos · {video ? 1 : 0} / 1
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <MediaTile
                  title={photos.length ? "Add more photos" : "Add photos"}
                  subtitle="or drag and drop"
                  icon={<PhotoIcon />}
                  active={dragTarget === "photo"}
                  onClick={() => photoRef.current?.click()}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragTarget("photo");
                  }}
                  onDragLeave={() => setDragTarget(null)}
                  onDrop={(event) => {
                    event.preventDefault();
                    setDragTarget(null);
                    addPhotos(event.dataTransfer.files);
                  }}
                >
                  {photos.length > 0 ? (
                    <div className="grid grid-cols-3 gap-1 p-1">
                      {photos.map((photo) => (
                        <div key={photo.id} className="relative aspect-square overflow-hidden rounded bg-[#f0f2f5]">
                          <img src={photo.url} alt={photo.name} className="h-full w-full object-cover" />
                          <button
                            type="button"
                            aria-label={`Remove ${photo.name}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              removePhoto(photo.id);
                            }}
                            className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white"
                          >
                            <CloseIcon />
                          </button>
                        </div>
                      ))}
                      {photos.length < 20 ? (
                        <button
                          type="button"
                          onClick={() => photoRef.current?.click()}
                          className="flex aspect-square items-center justify-center rounded bg-[#f0f2f5] text-[13px] font-semibold text-[#1c1e21]"
                        >
                          Add
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </MediaTile>
                <MediaTile
                  title="Add video"
                  subtitle={"or drag and drop\n(1 minute max)"}
                  icon={<VideoIcon />}
                  active={dragTarget === "video"}
                  onClick={() => videoRef.current?.click()}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragTarget("video");
                  }}
                  onDragLeave={() => setDragTarget(null)}
                  onDrop={(event) => {
                    event.preventDefault();
                    setDragTarget(null);
                    const file = [...event.dataTransfer.files].find((item) => item.type.startsWith("video/"));
                    if (file) addVideo(file);
                  }}
                >
                  {video ? (
                    <div className="relative min-h-[162px]">
                      <video src={video.url} className="h-[162px] w-full object-cover" muted />
                      <button
                        type="button"
                        aria-label="Remove video"
                        onClick={(event) => {
                          event.stopPropagation();
                          removeVideo();
                        }}
                        className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white"
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  ) : null}
                </MediaTile>
              </div>
              <input
                ref={photoRef}
                type="file"
                accept="image/*,image/heif,image/heic"
                multiple
                className="hidden"
                onChange={(event) => {
                  addPhotos(event.target.files);
                  event.target.value = "";
                }}
              />
              <input
                ref={videoRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(event) => {
                  addVideo(event.target.files?.[0]);
                  event.target.value = "";
                }}
              />

              <div className="mt-2 flex items-center gap-2 rounded-lg bg-[#f0f2f5] px-3 py-2">
                <PhoneIcon />
                <p className="min-w-0 flex-1 text-[13px] leading-[18px] text-[#080809]">
                  Upload photos directly from your phone.{" "}
                  <button
                    type="button"
                    className="font-semibold text-[#0866ff]"
                    onClick={() => setShowPhoneHint((value) => !value)}
                  >
                    Learn more
                  </button>
                </p>
                <button
                  type="button"
                  onClick={() => photoRef.current?.click()}
                  className="h-8 shrink-0 rounded-lg bg-[#e4e6eb] px-3 text-[14px] font-semibold text-[#1c1e21] hover:bg-[#d8dadf]"
                >
                  Try it
                </button>
              </div>
              {showPhoneHint ? (
                <p className="mt-2 text-[13px] leading-5 text-[#65686c]">
                  On Facebook this opens a QR code for your phone. This page keeps every photo on your device.
                </p>
              ) : null}
            </div>

            <section className="mt-4 border-t border-[#d0d3d7] px-4 pt-4">
              <h2 className="text-[17px] leading-5 font-semibold text-[#080809]">About this vehicle</h2>
              <p className="mt-1 text-[15px] leading-5 text-[#65686c]">
                Help buyers know more about the vehicle you're listing.
              </p>
              <div className="mt-4 flex flex-col gap-4">
                <LocationField
                  value={form.location}
                  suggestions={citySuggestions}
                  open={openName === "location"}
                  onOpenChange={(next) => setOpenName(next ? "location" : null)}
                  onChange={(location) => update({ location })}
                />
                <SelectField
                  label="Year"
                  value={form.year}
                  options={YEARS}
                  open={openName === "year"}
                  onOpenChange={(next) => setOpenName(next ? "year" : null)}
                  onChange={(year) => update({ year })}
                />
                {spec.makeSelect ? (
                  <SelectField
                    label="Make"
                    value={form.make}
                    options={MAKES}
                    open={openName === "make"}
                    onOpenChange={(next) => setOpenName(next ? "make" : null)}
                    onChange={(make) => update({ make })}
                  />
                ) : (
                  <TextField label="Make" value={form.make} onChange={(make) => update({ make })} />
                )}
                <TextField label="Model" value={form.model} onChange={(model) => update({ model })} />
                {spec.mileage ? (
                  <TextField
                    label="Mileage"
                    inputMode="numeric"
                    value={withCommas(form.mileage)}
                    onChange={(mileage) => update({ mileage: digitsOnly(mileage, 7) })}
                  />
                ) : null}
              </div>
            </section>

            <section className="mt-4 border-t border-[#d0d3d7] px-4 pt-4">
              <h2 className="text-[17px] leading-5 font-semibold text-[#080809]">Price</h2>
              <p className="mt-1 text-[15px] leading-5 text-[#65686c]">Enter your price for this vehicle.</p>
              <div className="mt-4 flex flex-col gap-4">
                <TextField
                  label="Price"
                  inputMode="numeric"
                  value={form.price ? `$${withCommas(form.price)}` : ""}
                  onChange={(price) => update({ price: digitsOnly(price, 9) })}
                />
                {spec.body ? (
                  <SelectField
                    label="Body style"
                    value={form.body}
                    options={BODY_STYLES}
                    open={openName === "body"}
                    onOpenChange={(next) => setOpenName(next ? "body" : null)}
                    onChange={(body) => update({ body })}
                  />
                ) : null}
                {spec.exterior ? (
                  <SelectField
                    label="Exterior color"
                    value={form.exterior}
                    options={COLORS}
                    open={openName === "exterior"}
                    onOpenChange={(next) => setOpenName(next ? "exterior" : null)}
                    onChange={(exterior) => update({ exterior })}
                  />
                ) : null}
                {spec.interior ? (
                  <SelectField
                    label="Interior color"
                    value={form.interior}
                    options={COLORS}
                    open={openName === "interior"}
                    onOpenChange={(next) => setOpenName(next ? "interior" : null)}
                    onChange={(interior) => update({ interior })}
                  />
                ) : null}
                {spec.cleanTitle ? (
                  <label className="flex items-center gap-3 py-1 text-[15px] text-[#080809]">
                    <input
                      type="checkbox"
                      checked={form.cleanTitle}
                      onChange={(event) => update({ cleanTitle: event.target.checked })}
                      className="h-5 w-5 accent-[#0866ff]"
                    />
                    This vehicle has a clean title.
                  </label>
                ) : null}
                {spec.condition ? (
                  <SelectField
                    label="Vehicle condition"
                    value={form.condition}
                    options={CONDITIONS}
                    open={openName === "condition"}
                    onOpenChange={(next) => setOpenName(next ? "condition" : null)}
                    onChange={(condition) => update({ condition })}
                  />
                ) : null}
                {spec.fuel ? (
                  <SelectField
                    label="Fuel type"
                    value={form.fuel}
                    options={FUEL_TYPES}
                    open={openName === "fuel"}
                    onOpenChange={(next) => setOpenName(next ? "fuel" : null)}
                    onChange={(fuel) => update({ fuel })}
                  />
                ) : null}
                {spec.transmission ? (
                  <SelectField
                    label="Transmission"
                    value={form.transmission}
                    options={TRANSMISSIONS}
                    open={openName === "transmission"}
                    onOpenChange={(next) => setOpenName(next ? "transmission" : null)}
                    onChange={(transmission) => update({ transmission })}
                  />
                ) : null}
              </div>
            </section>

            <section className="mt-4 border-t border-[#d0d3d7] px-4 pt-4">
              <h2 className="text-[17px] leading-5 font-semibold text-[#080809]">Description</h2>
              <p className="mt-1 text-[15px] leading-5 text-[#65686c]">
                Tell buyers anything that you haven't had the chance to include yet about your vehicle.
              </p>
              <div className="mt-4">
                <TextAreaField
                  label="Description"
                  value={form.description}
                  onChange={(description) => update({ description })}
                />
              </div>
            </section>

            <p className="px-4 pt-4 pb-6 text-[13px] leading-5 text-[#1c1e21]">
              Marketplace items are public and can be seen by anyone on or off Facebook. Items like animals, drugs,
              weapons, counterfeits, and other items that infringe intellectual property aren't allowed on Marketplace.
              See our{" "}
              <a
                className="font-semibold text-[#0866ff]"
                href="https://www.facebook.com/policies_center/commerce"
                target="_blank"
                rel="noreferrer"
              >
                Commerce Policies
              </a>
              .
            </p>
          </div>

          <div className="shrink-0 bg-white px-4 pt-2 pb-4">
            <div className="mb-3 flex gap-1" role="img" aria-label={`Progress, currently on step ${step} of 2`}>
              <div className="h-1 flex-1 rounded-full bg-[#0866ff]" />
              <div className={`h-1 flex-1 rounded-full ${step === 2 ? "bg-[#0866ff]" : "bg-[#e4e6eb]"}`} />
            </div>
            <button
              type="submit"
              disabled={!canNext}
              className={`h-10 w-full rounded-lg text-[15px] font-semibold ${
                canNext
                  ? "bg-[#0866ff] text-white hover:bg-[#0056e0]"
                  : "cursor-not-allowed bg-[#e4e6eb] text-[#bcc0c4]"
              }`}
            >
              Next
            </button>
          </div>
        </form>

        <PreviewCard form={form} spec={spec} photoUrl={photos[0]?.url} />
      </div>
    </div>
  );
}

function MediaTile({ title, subtitle, icon, active, onClick, onDragOver, onDragLeave, onDrop, children }) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`overflow-hidden rounded-lg border bg-white ${
        active ? "border-[#0866ff]" : "border-[#ced0d4]"
      }`}
    >
      {children || (
        <button
          type="button"
          onClick={onClick}
          className="flex aspect-[5/4] w-full flex-col items-center justify-center px-2 text-center"
        >
          {icon}
          <span className="mt-2 text-[15px] leading-5 font-semibold text-[#080809]">{title}</span>
          <span className="text-[13px] leading-[16px] whitespace-pre-line text-[#65686c]">{subtitle}</span>
        </button>
      )}
    </div>
  );
}
