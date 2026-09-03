import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import {
  Radio,
  Sliders,
  Check,
  ArrowRight,
  Crosshair,
  Layers,
  Eye,
  EyeOff,
  Thermometer,
  Mic,
} from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import type { PredictionResponse } from "../../services/api";

interface StationPreset {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radarRadiusKm: number;
  thermalRadiusKm: number;
  acousticRadiusKm: number;
  description: string;
}

const PRESET_STATIONS: StationPreset[] = [
  {
    id: "station-alpha",
    name: "Station Alpha (Perimeter Defense)",
    lat: 28.6139,
    lng: 77.209,
    radarRadiusKm: 5.0,
    thermalRadiusKm: 3.0,
    acousticRadiusKm: 1.8,
    description: "Multi-Sensor Ground Base, 77GHz FMCW Radar + Infrared Array",
  },
  {
    id: "station-bravo",
    name: "Station Bravo (Airfield Zone)",
    lat: 12.9716,
    lng: 77.5946,
    radarRadiusKm: 6.5,
    thermalRadiusKm: 3.5,
    acousticRadiusKm: 2.2,
    description: "Airport Approach Runway Monitoring Sector",
  },
  {
    id: "station-charlie",
    name: "Station Charlie (Maritime Coast)",
    lat: 19.076,
    lng: 72.8777,
    radarRadiusKm: 8.0,
    thermalRadiusKm: 4.0,
    acousticRadiusKm: 2.5,
    description: "Coastal Radar & Acoustic Sonar Ground Station",
  },
];

function DetectionMap() {
  const [selectedStation, setSelectedStation] = useState<StationPreset>(
    PRESET_STATIONS[0]
  );
  const [customLat, setCustomLat] = useState(PRESET_STATIONS[0].lat.toString());
  const [customLng, setCustomLng] = useState(PRESET_STATIONS[0].lng.toString());
  const [showConfig, setShowConfig] = useState(false);

  // Map layer settings
  const [mapType, setMapType] = useState<"dark" | "satellite">("dark");
  const [showRadarRange, setShowRadarRange] = useState(true);
  const [showThermalRange, setShowThermalRange] = useState(true);
  const [showAcousticRange, setShowAcousticRange] = useState(true);

  const [latestPrediction, setLatestPrediction] =
    useState<Partial<PredictionResponse> | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const coverageLayersRef = useRef<{
    radar?: L.Circle;
    thermal?: L.Circle;
    acoustic?: L.Circle;
    marker?: L.Marker;
  }>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem("latestPrediction");
      if (stored) {
        setLatestPrediction(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Determine tile layer URL:
  // Priority: 1. VITE_MAP_TILE_URL, 2. CARTO if key exists, 3. Defense-grade ArcGIS Dark Canvas (Default, zero watermark)
  const getTileConfig = (type: "dark" | "satellite") => {
    if (type === "satellite") {
      return {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      };
    }

    const customUrl = import.meta.env.VITE_MAP_TILE_URL;
    if (customUrl) {
      return {
        url: customUrl,
        attribution: "&copy; Custom Defense GIS Tile Layer",
      };
    }

    const cartoKey = import.meta.env.VITE_CARTO_API_KEY;
    if (cartoKey) {
      return {
        url: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?api_key=${cartoKey}`,
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      };
    }

    // Default: ArcGIS World Dark Gray Base (Clean, high-resolution dark tactical base, NO API KEY watermark!)
    return {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      attribution:
        "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, HERE, MapmyIndia",
    };
  };

  // Initialize or reconfigure map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [selectedStation.lat, selectedStation.lng],
        zoom: 12,
        zoomControl: false,
      });

      // Add zoom control at bottom right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    map.setView([selectedStation.lat, selectedStation.lng], 12);

    // Update tile layer
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const tileConf = getTileConfig(mapType);
    const tileLayer = L.tileLayer(tileConf.url, {
      attribution: tileConf.attribution,
      maxZoom: 19,
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    // Clear previous coverage rings & marker
    if (coverageLayersRef.current.radar) map.removeLayer(coverageLayersRef.current.radar);
    if (coverageLayersRef.current.thermal) map.removeLayer(coverageLayersRef.current.thermal);
    if (coverageLayersRef.current.acoustic) map.removeLayer(coverageLayersRef.current.acoustic);
    if (coverageLayersRef.current.marker) map.removeLayer(coverageLayersRef.current.marker);

    const isDrone = latestPrediction?.detected ?? false;

    // 1. Radar Coverage Perimeter (e.g. 5.0 km - Cyan)
    if (showRadarRange) {
      const radarCircle = L.circle([selectedStation.lat, selectedStation.lng], {
        radius: selectedStation.radarRadiusKm * 1000,
        color: "#06b6d4",
        weight: 1.5,
        dashArray: "6, 6",
        fillColor: "#06b6d4",
        fillOpacity: 0.08,
      }).addTo(map);
      coverageLayersRef.current.radar = radarCircle;
    }

    // 2. Thermal Coverage Perimeter (e.g. 3.0 km - Orange)
    if (showThermalRange) {
      const thermalCircle = L.circle([selectedStation.lat, selectedStation.lng], {
        radius: selectedStation.thermalRadiusKm * 1000,
        color: "#f97316",
        weight: 1.5,
        dashArray: "4, 4",
        fillColor: "#f97316",
        fillOpacity: 0.08,
      }).addTo(map);
      coverageLayersRef.current.thermal = thermalCircle;
    }

    // 3. Acoustic Coverage Perimeter (e.g. 1.8 km - Violet)
    if (showAcousticRange) {
      const acousticCircle = L.circle([selectedStation.lat, selectedStation.lng], {
        radius: selectedStation.acousticRadiusKm * 1000,
        color: "#8b5cf6",
        weight: 1.5,
        dashArray: "3, 3",
        fillColor: "#8b5cf6",
        fillOpacity: 0.08,
      }).addTo(map);
      coverageLayersRef.current.acoustic = acousticCircle;
    }

    // 4. Central Monitoring Station Marker
    const stationIcon = L.divIcon({
      className: "tactical-station-icon",
      html: `
        <div style="position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${
            isDrone ? "rgba(239, 68, 68, 0.35)" : "rgba(6, 182, 212, 0.3)"
          }; animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 24px; height: 24px; border-radius: 50%; background: ${
            isDrone ? "#ef4444" : "#06b6d4"
          }; border: 3px solid #0f172a; box-shadow: 0 0 20px ${
        isDrone ? "rgba(239, 68, 68, 0.9)" : "rgba(6, 182, 212, 0.9)"
      }; display: flex; align-items: center; justify-content: center;">
            <div style="width: 6px; height: 6px; border-radius: 50%; background: #ffffff;"></div>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const marker = L.marker([selectedStation.lat, selectedStation.lng], { icon: stationIcon })
      .addTo(map)
      .bindPopup(
        `<div style="font-family: sans-serif; font-size: 12px; color: #0f172a; padding: 6px; min-width: 200px;">
          <strong style="color: #0284c7; font-size: 13px;">${selectedStation.name}</strong><br/>
          <span style="font-size: 11px; color: #64748b;">Ground Monitoring Station</span>
          <hr style="margin: 6px 0; border: none; border-top: 1px solid #e2e8f0;"/>
          <div><strong>Radar Range:</strong> ${selectedStation.radarRadiusKm} km</div>
          <div><strong>Thermal Range:</strong> ${selectedStation.thermalRadiusKm} km</div>
          <div><strong>Acoustic Range:</strong> ${selectedStation.acousticRadiusKm} km</div>
          <div style="margin-top: 4px; font-weight: bold; color: ${isDrone ? "#dc2626" : "#16a34a"};">
            Status: ${isDrone ? "ALERT: Target Detected In Sector" : "Area Clear &bull; Active Scan"}
          </div>
        </div>`
      );
    coverageLayersRef.current.marker = marker;
  }, [
    selectedStation,
    latestPrediction,
    mapType,
    showRadarRange,
    showThermalRange,
    showAcousticRange,
  ]);

  const handleApplyCustomLocation = () => {
    const lat = parseFloat(customLat);
    const lng = parseFloat(customLng);
    if (!isNaN(lat) && !isNaN(lng)) {
      setSelectedStation({
        id: "custom",
        name: "Custom Monitoring Station",
        lat,
        lng,
        radarRadiusKm: 5.0,
        thermalRadiusKm: 3.0,
        acousticRadiusKm: 1.8,
        description: "User-configured ground monitoring station",
      });
      setShowConfig(false);
    }
  };

  const isDetected = latestPrediction?.detected ?? false;
  const confidence =
    latestPrediction?.confidence !== undefined
      ? latestPrediction.confidence <= 1
        ? (latestPrediction.confidence * 100).toFixed(1)
        : Number(latestPrediction.confidence).toFixed(1)
      : null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <SectionHeader
        title="Detection Map & Geospatial Intelligence"
        description="Tactical command-center map displaying the sensor monitoring station, configured coverage perimeters, and active sector alert status."
      />

      {/* Mandatory Station Location Notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-xs text-cyan-200">
        <Radio className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
        <div>
          <span className="font-bold text-cyan-300">
            STATION LOCATION NOTICE:
          </span>{" "}
          The marker on the map represents the <strong>MONITORING STATION LOCATION</strong> (ground sensor deployment site), not the exact drone GPS coordinates. Ground FMCW radar, thermal infrared, and acoustic arrays track targets relative to this base. Coverage circles indicate the <strong>Configured Monitoring Radius</strong>.
        </div>
      </div>

      {/* Command Center Layout: Map with Overlays */}
      <div className="relative rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        {/* Top-Left Floating Tactical Telemetry Overlay */}
        <div className="absolute top-4 left-4 z-20 max-w-sm rounded-2xl border border-slate-800/90 bg-slate-950/90 p-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Crosshair className="h-4 w-4 text-cyan-400" />
              <span className="font-bold text-xs uppercase tracking-wider text-white">
                Station Telemetry
              </span>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                isDetected
                  ? "bg-red-500/20 text-red-300 border border-red-500/30"
                  : "bg-green-500/20 text-green-300 border border-green-500/30"
              }`}
            >
              {latestPrediction?.prediction || "STANDBY"}
            </span>
          </div>

          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Monitoring Station:</span>
              <span className="font-semibold text-white truncate max-w-[160px]">
                {selectedStation.name}
              </span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Coordinates:</span>
              <span className="font-mono text-cyan-300">
                {selectedStation.lat.toFixed(4)}°N, {selectedStation.lng.toFixed(4)}°E
              </span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Fused Certainty:</span>
              <span className="font-bold text-white">
                {confidence ? `${confidence}%` : "Awaiting Scan"}
              </span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Threat Evaluation:</span>
              <span className={`font-bold ${isDetected ? "text-red-400" : "text-green-400"}`}>
                {latestPrediction?.threat_level || "NORMAL"}
              </span>
            </div>
          </div>

          {latestPrediction?.prediction && (
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex justify-between items-center text-[11px]">
              <Link
                to="/prediction"
                className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300"
              >
                <span>Inspect Result Details</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </div>

        {/* Top-Right Floating Map Controls Overlay */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {/* Base Layer Switcher */}
          <div className="flex rounded-xl border border-slate-800 bg-slate-950/90 p-1 shadow-lg backdrop-blur-md text-xs">
            <button
              type="button"
              onClick={() => setMapType("dark")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                mapType === "dark"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Tactical Dark</span>
            </button>
            <button
              type="button"
              onClick={() => setMapType("satellite")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                mapType === "satellite"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Satellite</span>
            </button>
          </div>

          {/* Coverage Ring Toggles */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-2.5 shadow-lg backdrop-blur-md space-y-1.5 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block px-1">
              Coverage Perimeters
            </span>

            <button
              type="button"
              onClick={() => setShowRadarRange(!showRadarRange)}
              className="w-full flex items-center justify-between gap-3 px-2 py-1 rounded-lg hover:bg-slate-900 transition"
            >
              <span className="flex items-center gap-1.5 text-cyan-300 font-medium text-[11px]">
                <Radio className="h-3.5 w-3.5 text-cyan-400" />
                Radar ({selectedStation.radarRadiusKm}km)
              </span>
              {showRadarRange ? (
                <Eye className="h-3.5 w-3.5 text-cyan-400" />
              ) : (
                <EyeOff className="h-3.5 w-3.5 text-slate-600" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowThermalRange(!showThermalRange)}
              className="w-full flex items-center justify-between gap-3 px-2 py-1 rounded-lg hover:bg-slate-900 transition"
            >
              <span className="flex items-center gap-1.5 text-orange-300 font-medium text-[11px]">
                <Thermometer className="h-3.5 w-3.5 text-orange-400" />
                Thermal ({selectedStation.thermalRadiusKm}km)
              </span>
              {showThermalRange ? (
                <Eye className="h-3.5 w-3.5 text-orange-400" />
              ) : (
                <EyeOff className="h-3.5 w-3.5 text-slate-600" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowAcousticRange(!showAcousticRange)}
              className="w-full flex items-center justify-between gap-3 px-2 py-1 rounded-lg hover:bg-slate-900 transition"
            >
              <span className="flex items-center gap-1.5 text-violet-300 font-medium text-[11px]">
                <Mic className="h-3.5 w-3.5 text-violet-400" />
                Acoustic ({selectedStation.acousticRadiusKm}km)
              </span>
              {showAcousticRange ? (
                <Eye className="h-3.5 w-3.5 text-violet-400" />
              ) : (
                <EyeOff className="h-3.5 w-3.5 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* The Interactive Leaflet Map Container */}
        <div
          ref={mapContainerRef}
          className="h-[620px] w-full bg-slate-950"
          style={{ zIndex: 1 }}
        />

        {/* Bottom Status Bar */}
        <div className="flex flex-wrap items-center justify-between border-t border-slate-800 px-6 py-3 bg-slate-950/90 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              Active Station: {selectedStation.name}
            </span>
            <span className="text-slate-500 font-mono">
              ArcGIS Tactical Base &bull; Clean Vector Layer &bull; Zero Watermarks
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Change Monitoring Station</span>
            </button>
          </div>
        </div>
      </div>

      {/* Station Preset Switcher & Custom Coordinates */}
      {showConfig && (
        <Card className="border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Configure Ground Monitoring Station
            </h3>
            <span className="text-xs text-slate-400">
              Select or customize ground sensor deployment coordinates
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {PRESET_STATIONS.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  setSelectedStation(st);
                  setCustomLat(st.lat.toString());
                  setCustomLng(st.lng.toString());
                }}
                className={`p-4 rounded-2xl border text-left transition ${
                  selectedStation.id === st.id
                    ? "border-cyan-500/40 bg-cyan-950/30 text-white"
                    : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{st.name}</span>
                  {selectedStation.id === st.id && (
                    <Check className="h-4 w-4 text-cyan-400" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Radar {st.radarRadiusKm}km &bull; Thermal {st.thermalRadiusKm}km &bull; Acoustic {st.acousticRadiusKm}km
                </p>
                <span className="text-[10px] font-mono text-cyan-300/80 mt-2 block">
                  {st.lat.toFixed(4)}°N, {st.lng.toFixed(4)}°E
                </span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Custom Lat:</span>
              <input
                type="number"
                step="0.0001"
                value={customLat}
                onChange={(e) => setCustomLat(e.target.value)}
                className="w-28 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-white focus:border-cyan-500 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Custom Lng:</span>
              <input
                type="number"
                step="0.0001"
                value={customLng}
                onChange={(e) => setCustomLng(e.target.value)}
                className="w-28 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-white focus:border-cyan-500 outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleApplyCustomLocation}
              className="rounded-lg bg-cyan-500 px-3 py-1 text-xs font-bold text-slate-950 hover:bg-cyan-400"
            >
              Set Station Coordinates
            </button>
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default DetectionMap;
