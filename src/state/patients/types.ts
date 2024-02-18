import { PagePatientDTO, PatientDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IPatientsState = {
  createPatient: IApiResponse<PatientDTO>;
  searchResults: IApiResponse<Array<PatientDTO>>;
  selectedPatient: IApiResponse<PatientDTO>;
  updatePatient: IApiResponse<PatientDTO>;
  getCities: IApiResponse<Array<string>>;
  getPatients: IApiResponse<PagePatientDTO>;
};
