import axios, { AxiosError } from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes for inference if needed
});

export interface SensorWeights {
  radar?: number;
  thermal?: number;
  acoustic?: number;
  [key: string]: number | undefined;
}

export interface OptimizationDetails {
  weights: SensorWeights;
  score: number;
  runtime_seconds: number;
}

export interface PredictionResponse {
  prediction: string;
  confidence: number;
  detected: boolean;
  sensor_probabilities: {
    radar: number;
    thermal: number;
    acoustic: number;
  };
  sensor_reliability: {
    radar: number;
    thermal: number;
    acoustic: number;
  };
  quantum: OptimizationDetails;
  classical: OptimizationDetails;
  comparison: {
    quantum_improvement_percent: number;
  };
  fusion_score: number;
  mission_status: string;
  threat_level: string;
  recommended_action: string;
  total_runtime_seconds: number;
}

export interface HistoryItem {
  id?: number;
  timestamp?: string;
  filename: string;
  sensor: string;
  prediction: string;
  confidence: number;
}

export interface HealthResponse {
  status: string;
}

export interface DatasetSummary {
  radar: number;
  thermal: number;
  acoustic: number;
}

export const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ detail?: string; message?: string }>;
    if (err.response) {
      if (err.response.data?.detail) {
        return err.response.data.detail;
      }
      if (err.response.data?.message) {
        return err.response.data.message;
      }
      return `Server error (${err.response.status}): ${err.response.statusText}`;
    }
    if (err.code === "ECONNABORTED") {
      return "Request timed out. The backend is taking longer than expected.";
    }
    if (err.message === "Network Error" || !err.response) {
      return `Backend server is unreachable at ${API_BASE_URL}. Please ensure the FastAPI server is running.`;
    }
    return err.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred during the operation.";
};

export const checkHealth = async (): Promise<HealthResponse> => {
  const response = await apiClient.get<HealthResponse>("/health");
  return response.data;
};

export const getHistory = async (): Promise<HistoryItem[]> => {
  const response = await apiClient.get<HistoryItem[]>("/history");
  return response.data;
};

export const getDatasetSummary = async (): Promise<DatasetSummary> => {
  const response = await apiClient.get<DatasetSummary>("/dataset");
  return response.data;
};

export const predictSensors = async (
  radarFile: File | null,
  thermalFile: File | null,
  acousticFile: File | null
): Promise<PredictionResponse> => {
  const formData = new FormData();

  if (radarFile) {
    formData.append("radar_file", radarFile);
  }
  if (thermalFile) {
    formData.append("thermal_file", thermalFile);
  }
  if (acousticFile) {
    formData.append("acoustic_file", acousticFile);
  }

  const response = await apiClient.post<PredictionResponse>(
    "/predict",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const fetchDemoSample = async (
  sensorType: "radar" | "thermal" | "acoustic"
): Promise<File> => {
  const response = await apiClient.get(`/demo-sample/${sensorType}`, {
    responseType: "blob",
  });

  const mimeTypes: Record<string, string> = {
    radar: "application/octet-stream",
    thermal: "image/jpeg",
    acoustic: "audio/wav",
  };

  const defaultNames: Record<string, string> = {
    radar: "demo_radar.npy",
    thermal: "demo_thermal.jpg",
    acoustic: "demo_acoustic.wav",
  };

  // Try to parse filename from Content-Disposition header if available
  let filename = defaultNames[sensorType];
  const disposition = response.headers["content-disposition"];
  if (disposition && disposition.includes("filename=")) {
    const match = disposition.match(/filename=["']?([^"';]+)["']?/);
    if (match && match[1]) {
      filename = match[1];
    }
  }

  return new File([response.data], filename, {
    type: mimeTypes[sensorType] || "application/octet-stream",
  });
};
