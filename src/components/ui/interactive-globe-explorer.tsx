"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods, GlobeProps } from "react-globe.gl";
import { Check, Copy, MapPin, ChevronRight, Mail, Phone } from "lucide-react";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div style={{ display: "flex", height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "48px", height: "48px" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(56, 224, 207, 0.25)", animation: "eimDotPulse 1.5s infinite" }} />
        <div style={{ position: "absolute", inset: "8px", borderRadius: "50%", background: "#38E0CF", opacity: 0.6 }} />
      </div>
    </div>
  ),
}) as React.ComponentType<
  GlobeProps & { ref?: React.MutableRefObject<GlobeMethods | undefined> }
>;

export type GlobeLocation = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  email: string;
  phone?: string;
  tag?: string;
  altitude?: number;
};

export const DEFAULT_LOCATIONS: GlobeLocation[] = [
  {
    id: "mumbai-hq",
    name: "Mumbai (HQ)",
    tag: "Corporate Headquarters",
    lat: 19.0178,
    lng: 72.8478,
    altitude: 1.8,
    address: "1A, 1st floor, Kohinoor Square, Dadar (W), Mumbai 400028",
    email: "powerup@energyinmotion.in",
    phone: "+91 22 6900 1200",
  },
  {
    id: "noida",
    name: "Noida",
    tag: "North India Hub",
    lat: 28.5020,
    lng: 77.4042,
    altitude: 1.8,
    address: "J M Baxi Corporate Tower, 12th Floor, Sector 136, Noida 201304",
    email: "powerup@energyinmotion.in",
    phone: "+91 120 400 1800",
  },
  {
    id: "pune",
    name: "Pune",
    tag: "Technology & Engineering Park",
    lat: 18.5590,
    lng: 73.7868,
    altitude: 1.8,
    address: "301, Prabhavee Tech Park, Baner Main Road, Baner, Pune 411045",
    email: "powerup@energyinmotion.in",
    phone: "+91 20 6700 4500",
  },
  {
    id: "nhava-sheva",
    name: "Nhava Sheva",
    tag: "Maritime Port Operations",
    lat: 18.9496,
    lng: 72.9515,
    altitude: 1.8,
    address: "C Wing, 211 & 212, NMSEZ Commercial Business Complex, Dronagiri 6, Sector 11, Navghar 400707",
    email: "powerup@energyinmotion.in",
    phone: "+91 22 2724 3300",
  },
  {
    id: "factory",
    name: "Factory (Talegaon)",
    tag: "Heavy EV Truck Assembly Plant",
    lat: 18.7355,
    lng: 73.6766,
    altitude: 1.8,
    address: "Gat No. 147 & 418 (Part), Opp. Talegaon MIDC Phase 5, Ambi, Pune 410507",
    email: "powerup@energyinmotion.in",
    phone: "+91 2114 660 100",
  },
];

export type InteractiveGlobeExplorerProps = {
  locations?: GlobeLocation[];
  initialLocationId?: string;
  globeTextureUrl?: string;
  className?: string;
};

function useElementSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = React.useState(560);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth || 560;
      const h = el.clientHeight || 560;
      const dimension = Math.min(w, h, 620);
      setSize(Math.max(320, dimension));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

export function InteractiveGlobeExplorer({
  locations = DEFAULT_LOCATIONS,
  initialLocationId,
  globeTextureUrl = "https://cdn.21st.dev/assets/localized/228deba2e4b600146bdcb6cfa359b8ead6aacc2b1c13550a29cd82824cfa1c01.jpg",
  className = "",
}: InteractiveGlobeExplorerProps) {
  const initialLocation =
    locations.find((loc) => loc.id === initialLocationId) ?? locations[0];

  const globeRef = React.useRef<GlobeMethods | undefined>(undefined);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const globeSize = useElementSize(containerRef);

  const [activeLocationId, setActiveLocationId] = React.useState(initialLocation.id);
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const activeLocation =
    locations.find((l) => l.id === activeLocationId) ?? initialLocation;

  const focusGlobe = React.useCallback((location: GlobeLocation, ms = 900) => {
    globeRef.current?.pointOfView(
      {
        lat: location.lat,
        lng: location.lng,
        altitude: location.altitude ?? 1.8,
      },
      ms,
    );
  }, []);

  const handleGlobeReady = React.useCallback(() => {
    // Center initially over India
    focusGlobe(initialLocation, 1200);
    const controls = globeRef.current?.controls();
    if (controls) {
      controls.enableZoom = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.35;
    }
  }, [focusGlobe, initialLocation]);

  const handleLocationClick = React.useCallback(
    (location: GlobeLocation) => {
      setActiveLocationId(location.id);
      focusGlobe(location, 900);
    },
    [focusGlobe],
  );

  const handlePointClick = React.useCallback(
    (point: object) => {
      const location = locations.find(
        (item) => item.id === (point as GlobeLocation).id,
      );
      if (!location) return;
      setActiveLocationId(location.id);
      focusGlobe(location, 800);
    },
    [focusGlobe, locations],
  );

  const copyToClipboard = React.useCallback((text: string, field: string) => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2000);
    });
  }, []);

  return (
    <div className={`eim-globe-wrapper ${className}`}>
      {/* Sidebar (Left): 5 Operational Hubs in India */}
      <div className="eim-globe-sidebar">
        <div className="eim-globe-badge">
          <MapPin size={16} color="#38E0CF" />
          <span>Operational Hubs ({locations.length} in India)</span>
        </div>

        <div className="eim-globe-list" role="tablist" aria-label="India Operational Hubs">
          {locations.map((location) => {
            const isActive = activeLocationId === location.id;

            return (
              <button
                key={location.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleLocationClick(location)}
                className={`eim-globe-btn ${isActive ? "is-active" : ""}`}
              >
                <div className="eim-globe-btn-header">
                  <span className="eim-globe-tag">{location.tag || "Hub"}</span>
                  {isActive && <span className="eim-globe-beacon" aria-hidden="true" />}
                </div>

                <div className="eim-globe-title-row">
                  <span className="eim-globe-name">{location.name}</span>
                  <span className="eim-globe-chevron">
                    <ChevronRight size={18} />
                  </span>
                </div>

                {/* Expanded details when active */}
                {isActive && (
                  <div className="eim-globe-card-body">
                    <p className="eim-globe-addr">{location.address}</p>

                    <div className="eim-globe-actions">
                      <button
                        type="button"
                        className="eim-globe-copy-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(location.address, `addr-${location.id}`);
                        }}
                      >
                        {copiedField === `addr-${location.id}` ? (
                          <>
                            <Check size={13} />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Address</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`mailto:${location.email}`}
                        className="eim-globe-email-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Earth Globe Stage (Right) */}
      <div ref={containerRef} className="eim-globe-stage">
        <div className="eim-globe-glow">
          <div className="eim-globe-glow-circle" />
        </div>

        <div className="eim-globe-canvas-holder">
          <Globe
            ref={globeRef}
            width={globeSize}
            height={globeSize}
            globeImageUrl={globeTextureUrl}
            backgroundColor="rgba(0,0,0,0)"
            pointsData={locations}
            pointLat="lat"
            pointLng="lng"
            pointColor={(d: any) => (d.id === activeLocationId ? "#38E0CF" : "#0284c7")}
            pointAltitude={(d: any) => (d.id === activeLocationId ? 0.05 : 0.015)}
            pointRadius={(d: any) => (d.id === activeLocationId ? 1.5 : 0.7)}
            pointLabel={(d: any) =>
              `<div style="background:#01262D;color:#38E0CF;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:600;border:1px solid #38E0CF;font-family:sans-serif;box-shadow:0 6px 18px rgba(0,0,0,0.7);">${d.name}</div>`
            }
            ringsData={activeLocation ? [activeLocation] : []}
            ringLat="lat"
            ringLng="lng"
            ringColor={() => (t: number) => `rgba(56, 224, 207, ${Math.max(0, 1 - t)})`}
            ringMaxRadius={9}
            ringPropagationSpeed={3.2}
            ringRepeatPeriod={700}
            onGlobeReady={handleGlobeReady}
            onPointClick={handlePointClick}
            enablePointerInteraction
            animateIn
          />
        </div>
      </div>
    </div>
  );
}

export default InteractiveGlobeExplorer;
