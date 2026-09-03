import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Overview from "./pages/Overview/Overview";
import SensorAnalysis from "./pages/Analysis/SensorAnalysis";
import Prediction from "./pages/Prediction/Prediction";
import DetectionMap from "./pages/DetectionMap/DetectionMap";

import SensorFusion from "./pages/SensorFusion/SensorFusion";
import Quantum from "./pages/Quantum/Quantum";
import Comparison from "./pages/Comparison/Comparison";
import Analytics from "./pages/Analytics/Analytics";
import SensorFailureLab from "./pages/SensorFailureLab/SensorFailureLab";

import History from "./pages/History/History";

import Architecture from "./pages/Architecture/Architecture";
import Applications from "./pages/Applications/Applications";
import About from "./pages/About/About";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* OVERVIEW */}
        <Route path="/" element={<Overview />} />
        <Route path="/overview" element={<Navigate to="/" replace />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />

        {/* ANALYSIS */}
        <Route path="/analysis" element={<SensorAnalysis />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/map" element={<DetectionMap />} />

        {/* INTELLIGENCE */}
        <Route path="/fusion" element={<SensorFusion />} />
        <Route path="/quantum" element={<Quantum />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/failure-lab" element={<SensorFailureLab />} />

        {/* HISTORY */}
        <Route path="/history" element={<History />} />

        {/* SYSTEM */}
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/about" element={<About />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
