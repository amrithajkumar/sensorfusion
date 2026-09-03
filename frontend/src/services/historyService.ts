import { getHistory as fetchHistory, type HistoryItem } from "./api";

export const getHistory = async (): Promise<HistoryItem[]> => {
  return fetchHistory();
};