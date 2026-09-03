import type { PredictionResponse } from "../services/api";

export interface ReportData {
  analysisId: string;
  timestamp: string;
  monitoringLocation: string;
  coordinates: { lat: number; lng: number };
  prediction: Partial<PredictionResponse>;
}

export function generateAnalysisReportHtml(data: ReportData): string {
  const p = data.prediction;
  const isDrone =
    p.detected ?? (p.prediction?.toLowerCase().includes("drone") && !p.prediction?.toLowerCase().includes("no"));
  const conf =
    p.confidence !== undefined
      ? p.confidence <= 1
        ? (p.confidence * 100).toFixed(1)
        : Number(p.confidence).toFixed(1)
      : "N/A";

  const qWeights = p.quantum?.weights ?? {};
  const cWeights = p.classical?.weights ?? {};

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>QUANTUM SENTINEL - Intelligence Report ${data.analysisId}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 32px;
      background: #090d16;
      color: #e2e8f0;
      line-height: 1.5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 12px;
      padding: 36px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid #334155;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .brand {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #38bdf8;
    }
    .subbrand {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #94a3b8;
    }
    .meta {
      text-align: right;
      font-size: 12px;
      color: #94a3b8;
    }
    .banner {
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: ${isDrone ? "rgba(239, 68, 68, 0.15)" : "rgba(34, 197, 94, 0.15)"};
      border: 1px solid ${isDrone ? "#ef4444" : "#22c55e"};
    }
    .banner h2 {
      margin: 0;
      font-size: 24px;
      color: ${isDrone ? "#fca5a5" : "#86efac"};
    }
    .badge {
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      background: ${isDrone ? "#dc2626" : "#16a34a"};
      color: #fff;
    }
    .section-title {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #38bdf8;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 6px;
      margin-top: 24px;
      margin-bottom: 14px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 13px;
    }
    th, td {
      padding: 10px 12px;
      text-align: left;
      border-bottom: 1px solid #1e293b;
    }
    th {
      color: #94a3b8;
      font-weight: 600;
    }
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 20px;
    }
    .stat-card {
      background: #1e293b;
      padding: 12px;
      border-radius: 6px;
    }
    .stat-label {
      font-size: 11px;
      color: #94a3b8;
      text-transform: uppercase;
    }
    .stat-value {
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      margin-top: 4px;
    }
    .footer {
      margin-top: 32px;
      border-top: 1px solid #334155;
      padding-top: 16px;
      font-size: 11px;
      color: #64748b;
      text-align: center;
    }
    @media print {
      body {
        background: #fff;
        color: #000;
        padding: 0;
      }
      .container {
        border: none;
        box-shadow: none;
        background: #fff;
        color: #000;
        max-width: 100%;
      }
      .stat-card {
        background: #f1f5f9;
      }
      .stat-value {
        color: #0f172a;
      }
      .section-title {
        color: #0284c7;
        border-color: #cbd5e1;
      }
      th, td {
        border-color: #e2e8f0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <div class="brand">QUANTUM SENTINEL</div>
        <div class="subbrand">Quantum-Optimized Multi-Sensor Intelligence</div>
      </div>
      <div class="meta">
        <div><strong>REPORT ID:</strong> ${data.analysisId}</div>
        <div><strong>DATE:</strong> ${data.timestamp}</div>
        <div><strong>STATION:</strong> ${data.monitoringLocation}</div>
        <div><strong>COORDINATES:</strong> ${data.coordinates.lat.toFixed(4)}° N, ${data.coordinates.lng.toFixed(4)}° E</div>
      </div>
    </div>

    <div class="banner">
      <div>
        <h2>${p.prediction || "UNKNOWN"}</h2>
        <div style="font-size: 13px; color: #cbd5e1; margin-top: 4px;">
          Mission Status: <strong>${p.mission_status || "ANALYZED"}</strong> &bull; Recommended Action: ${p.recommended_action || "Standard observation"}
        </div>
      </div>
      <div>
        <span class="badge">${p.threat_level || "NORMAL"} THREAT</span>
        <div style="font-size: 18px; font-weight: 800; text-align: right; margin-top: 6px; color: #fff;">
          ${conf}%
        </div>
      </div>
    </div>

    <div class="section-title">1. Multi-Sensor Evidence Breakdown</div>
    <table>
      <thead>
        <tr>
          <th>Sensor Modality</th>
          <th>Raw Probability</th>
          <th>Sensor Reliability</th>
          <th>Quantum Assigned Weight</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Radar FMCW (77GHz)</strong></td>
          <td>${((p.sensor_probabilities?.radar ?? 0) * 100).toFixed(1)}%</td>
          <td>${((p.sensor_reliability?.radar ?? 0) * 100).toFixed(1)}%</td>
          <td>${((qWeights.radar ?? 0) * 100).toFixed(1)}%</td>
        </tr>
        <tr>
          <td><strong>Thermal Infrared</strong></td>
          <td>${((p.sensor_probabilities?.thermal ?? 0) * 100).toFixed(1)}%</td>
          <td>${((p.sensor_reliability?.thermal ?? 0) * 100).toFixed(1)}%</td>
          <td>${((qWeights.thermal ?? 0) * 100).toFixed(1)}%</td>
        </tr>
        <tr>
          <td><strong>Acoustic Waveform</strong></td>
          <td>${((p.sensor_probabilities?.acoustic ?? 0) * 100).toFixed(1)}%</td>
          <td>${((p.sensor_reliability?.acoustic ?? 0) * 100).toFixed(1)}%</td>
          <td>${((qWeights.acoustic ?? 0) * 100).toFixed(1)}%</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">2. BQPhy Quantum Optimization Benchmark</div>
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">Fusion Score</div>
        <div class="stat-value">${(p.fusion_score ?? 0).toFixed(4)}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">BQPhy Optimization Gain</div>
        <div class="stat-value">+${(p.comparison?.quantum_improvement_percent ?? 0).toFixed(2)}%</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Quantum Solver Time</div>
        <div class="stat-value">${((p.quantum?.runtime_seconds ?? 0) * 1000).toFixed(1)} ms</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Optimization Engine</th>
          <th>Objective Score</th>
          <th>Execution Time</th>
          <th>Radar / Thermal / Acoustic Weights</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Classical Monte Carlo</strong></td>
          <td>${(p.classical?.score ?? 0).toFixed(4)}</td>
          <td>${((p.classical?.runtime_seconds ?? 0) * 1000).toFixed(1)} ms</td>
          <td>${((cWeights.radar ?? 0) * 100).toFixed(0)}% / ${((cWeights.thermal ?? 0) * 100).toFixed(0)}% / ${((cWeights.acoustic ?? 0) * 100).toFixed(0)}%</td>
        </tr>
        <tr>
          <td><strong>BosonQ BQPhy (QIEO)</strong></td>
          <td><strong>${(p.quantum?.score ?? 0).toFixed(4)}</strong></td>
          <td>${((p.quantum?.runtime_seconds ?? 0) * 1000).toFixed(1)} ms</td>
          <td><strong>${((qWeights.radar ?? 0) * 100).toFixed(0)}% / ${((qWeights.thermal ?? 0) * 100).toFixed(0)}% / ${((qWeights.acoustic ?? 0) * 100).toFixed(0)}%</strong></td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">3. Station Operational Notes</div>
    <p style="font-size: 12px; color: #94a3b8;">
      This intelligence report was generated automatically by the Quantum Sentinel multi-sensor fusion pipeline.
      Target classification was performed using independent Random Forest classifiers trained on FMCW radar, infrared thermal features, and audio acoustic spectral descriptors, optimized through BosonQ BQPhy Quantum-Inspired Evolutionary Optimization (QIEO). Coordinates represent the Sensor Monitoring Station.
    </p>

    <div class="footer">
      QUANTUM SENTINEL &bull; Enterprise AI Surveillance &bull; Generated: ${new Date().toUTCString()}
    </div>
  </div>
  <script>
    window.onload = function() {
      // Auto trigger print when loaded in a popup window
      if (window.opener) {
        // window.print();
      }
    };
  </script>
</body>
</html>`;
}

export function downloadAnalysisReport(data: ReportData) {
  const html = generateAnalysisReportHtml(data);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `quantum_sentinel_report_${data.analysisId}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function openPrintableReport(data: ReportData) {
  const html = generateAnalysisReportHtml(data);
  const win = window.open("", "_blank");
  if (win) {
    win.document.write(html);
    win.document.close();
  }
}
