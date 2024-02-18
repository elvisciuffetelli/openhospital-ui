import produce from "immer";
import { IAction } from "../types";
import {
  CREATE_PATIENT_FAIL,
  CREATE_PATIENT_LOADING,
  CREATE_PATIENT_RESET,
  CREATE_PATIENT_SUCCESS,
  GET_PATIENT_FAIL,
  GET_PATIENT_LOADING,
  GET_PATIENT_SUCCESS,
  SEARCH_PATIENT_FAIL,
  SEARCH_PATIENT_LOADING,
  SEARCH_PATIENT_SUCCESS,
  UPDATE_PATIENT_LOADING,
  UPDATE_PATIENT_FAIL,
  UPDATE_PATIENT_RESET,
  UPDATE_PATIENT_SUCCESS,
  GET_PATIENT_RESET,
  SEARCH_PATIENT_RESET,
  GET_CITIES_LOADING,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAIL,
  GET_CITIES_RESET,
  GET_PATIENTS_FAIL,
  GET_PATIENTS_LOADING,
  GET_PATIENTS_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IPatientsState } from "./types";

export default produce((draft: IPatientsState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * CREATE_PATIENT
     */
    case CREATE_PATIENT_LOADING: {
      draft.createPatient.status = "LOADING";
      break;
    }

    case CREATE_PATIENT_SUCCESS: {
      draft.createPatient.status = "SUCCESS";
      draft.createPatient.data = action.payload;
      delete draft.createPatient.error;
      break;
    }

    case CREATE_PATIENT_FAIL: {
      draft.createPatient.status = "FAIL";
      draft.createPatient.error = action.error;
      break;
    }

    case CREATE_PATIENT_RESET: {
      draft.createPatient.status = "IDLE";
      delete draft.createPatient.error;
      delete draft.createPatient.data;
      break;
    }

    /**
     * SEARCH_PATIENT
     */
    case SEARCH_PATIENT_LOADING: {
      draft.searchResults.status = "LOADING";
      break;
    }

    case SEARCH_PATIENT_SUCCESS: {
      if (action.payload.length > 0) {
        draft.searchResults.status = "SUCCESS";
      } else {
        draft.searchResults.status = "SUCCESS_EMPTY";
      }
      draft.searchResults.data = action.payload;
      delete draft.searchResults.error;
      break;
    }

    case SEARCH_PATIENT_FAIL: {
      draft.searchResults.status = "FAIL";
      draft.searchResults.error = action.error;
      break;
    }

    case SEARCH_PATIENT_RESET: {
      draft.searchResults.status = "IDLE";
      draft.searchResults.data = [];
      delete draft.searchResults.error;
      break;
    }

    /**
     * GET_PATIENT
     */
    case GET_PATIENT_LOADING: {
      draft.selectedPatient.status = "LOADING";
      break;
    }

    case GET_PATIENT_SUCCESS: {
      draft.selectedPatient.status = "SUCCESS";
      draft.selectedPatient.data = action.payload;
      delete draft.selectedPatient.error;
      break;
    }

    case GET_PATIENT_FAIL: {
      draft.selectedPatient.status = "FAIL";
      draft.searchResults.error = action.error;
      delete draft.selectedPatient.data;
      break;
    }

    case GET_PATIENT_RESET: {
      draft.selectedPatient.status = "IDLE";
      delete draft.selectedPatient.error;
      delete draft.selectedPatient.data;
      break;
    }

    /**
     * UPDATE_PATIENT
     */
    case UPDATE_PATIENT_LOADING: {
      draft.updatePatient.status = "LOADING";
      break;
    }

    case UPDATE_PATIENT_SUCCESS: {
      draft.updatePatient.status = "SUCCESS";
      if (draft.selectedPatient.data?.code === action.payload?.code) {
        draft.selectedPatient.data = action.payload;
      }
      delete draft.updatePatient.error;
      break;
    }

    case UPDATE_PATIENT_FAIL: {
      draft.updatePatient.status = "FAIL";
      break;
    }

    case UPDATE_PATIENT_RESET: {
      draft.updatePatient.status = "IDLE";
      delete draft.updatePatient.error;
      delete draft.createPatient.data;
      break;
    }

    /**
     * GET CITIES
     */
    case GET_CITIES_LOADING: {
      draft.getCities.status = "LOADING";
      break;
    }

    case GET_CITIES_SUCCESS: {
      if (action.payload.length > 0) {
        draft.getCities.status = "SUCCESS";
      } else {
        draft.getCities.status = "SUCCESS_EMPTY";
      }
      draft.getCities.data = action.payload;
      delete draft.getCities.error;
      break;
    }

    case GET_CITIES_FAIL: {
      draft.getCities.status = "FAIL";
      draft.getCities.error = action.error;
      break;
    }

    case GET_CITIES_RESET: {
      draft.getCities.status = "IDLE";
      draft.getCities.data = [];
      delete draft.getCities.error;
      break;
    }

    /**
     * GET_PATIENTS
     */
    case GET_PATIENTS_LOADING: {
      draft.getPatients.status = "LOADING";
      break;
    }

    case GET_PATIENTS_SUCCESS: {
      draft.getPatients.status = "SUCCESS";
      draft.getPatients.data = action.payload;
      delete draft.getPatients.error;
      break;
    }
    case GET_PATIENTS_FAIL: {
      draft.getPatients.status = "FAIL";
      draft.getPatients.error = action.error;
      break;
    }
  }
}, initial);
