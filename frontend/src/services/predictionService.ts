import axios from "axios";

const API_URL = "http://127.0.0.1:8000/predict";

export const runPrediction = async (
  radarFile: File | null,
  thermalFile: File | null,
  acousticFile: File | null
) => {
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

  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};