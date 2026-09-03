import { predictSensors, type PredictionResponse } from "./api";

export const runPrediction = async (
  radarFile: File | null,
  thermalFile: File | null,
  acousticFile: File | null
): Promise<PredictionResponse> => {
  return predictSensors(radarFile, thermalFile, acousticFile);
};