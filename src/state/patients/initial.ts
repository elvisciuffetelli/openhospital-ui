import { IPatientsState } from "./types";

export const initial: IPatientsState = {
  createPatient: { status: "IDLE" },
  searchResults: { status: "IDLE", data: [] },
  selectedPatient: { status: "IDLE", data: undefined },
  updatePatient: { status: "IDLE" },
  getCities: { status: "IDLE", data: [] },
  getPatients: { status: "IDLE" },
};
