import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../storage/localStorage.js";

const persisted = loadState();

const initialState = {
  logs: persisted?.logs || [],
};

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    addLog: (state, action) => {
      const newLog = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        role: action.payload.role,
        action: action.payload.action,
        details: action.payload.details || "",
      };

      state.logs.unshift(newLog);
      saveState({ logs: state.logs });
    },

    clearLogs: (state) => {
      state.logs = [];
      saveState({ logs: [] });
    },
  },
});

export const { addLog, clearLogs } = logsSlice.actions;
export default logsSlice.reducer;
