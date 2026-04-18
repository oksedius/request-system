import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../storage/localStorage.js";

export const STATUSES = ["new", "in progress", "done"];

export function canUserEdit(request) {
  return request.status === "new";
}

export function nextStatus(status) {
  if (status === "new") return "in progress";
  if (status === "in progress") return "done";
  return "done";
}

const persisted = loadState();

const initialState = {
  role: "User",
  requests: [],
  ...(persisted && typeof persisted === "object" ? persisted : {}),
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    roleSet(state, action) {
      state.role = action.payload;
      saveState(state);
    },

    requestCreate(state, action) {
      state.requests.unshift(action.payload);
      saveState(state);
    },

    requestUpdate(state, action) {
      const { id, patch } = action.payload;
      const idx = state.requests.findIndex((r) => r.id === id);
      if (idx >= 0) {
        state.requests[idx] = { ...state.requests[idx], ...patch };
        saveState(state);
      }
    },

    requestDelete(state, action) {
      const id = action.payload;
      state.requests = state.requests.filter((r) => r.id !== id);
      saveState(state);
    },

    requestStatusAdvance(state, action) {
      const id = action.payload;
      const req = state.requests.find((r) => r.id === id);
      if (req) {
        req.status = nextStatus(req.status);
        saveState(state);
      }
    },
  },
});

export const {
  roleSet,
  requestCreate,
  requestUpdate,
  requestDelete,
  requestStatusAdvance,
} = requestsSlice.actions;

export default requestsSlice.reducer;
