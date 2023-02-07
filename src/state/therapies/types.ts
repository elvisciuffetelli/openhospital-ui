import { TherapyRowDTO } from "../../generated";
import { IApiResponse } from "../types";

export type ITherapiesState = {
  createTherapy: IApiResponse<TherapyRowDTO>;
  updateTherapy: IApiResponse<TherapyRowDTO>;
  therapiesByPatientId: IApiResponse<Array<TherapyRowDTO>>;
  deleteTherapy: IApiResponse<TherapyRowDTO>;
};
