import produce from "immer";
import { PatientExaminationDTO } from "../../generated";
import { IAction } from "../types";
import {
  CREATE_EXAMINATION_FAIL,
  CREATE_EXAMINATION_LOADING,
  CREATE_EXAMINATION_RESET,
  CREATE_EXAMINATION_SUCCESS,
  UPDATE_EXAMINATION_SUCCESS,
  UPDATE_EXAMINATION_RESET,
  UPDATE_EXAMINATION_LOADING,
  UPDATE_EXAMINATION_FAIL,
  DELETE_EXAMINATION_FAIL,
  DELETE_EXAMINATION_LOADING,
  DELETE_EXAMINATION_RESET,
  DELETE_EXAMINATION_SUCCESS,
  SEARCH_EXAMINATION_FAIL,
  SEARCH_EXAMINATION_LOADING,
  SEARCH_EXAMINATION_SUCCESS,
  SEARCH_EXAMINATION_SUCCESS_EMPTY,
} from "./consts";
import { initial } from "./initial";
import { IExaminationsState } from "./types";

export default produce(
  (draft: IExaminationsState, action: IAction<any, any>) => {
    switch (action.type) {
      /**
       * CREATE_EXAMINATION
       */
      case CREATE_EXAMINATION_LOADING: {
        draft.createExamination.status = "LOADING";
        break;
      }

      case CREATE_EXAMINATION_SUCCESS: {
        draft.createExamination.status = "SUCCESS";
        draft.createExamination.data = action.payload;
        draft.examinationsByPatientId.data = [
          ...(draft.examinationsByPatientId.data ?? []),
          action.payload,
        ];
        delete draft.createExamination.error;
        break;
      }

      case CREATE_EXAMINATION_FAIL: {
        draft.createExamination.status = "FAIL";
        draft.createExamination.error = action.error;
        break;
      }

      case CREATE_EXAMINATION_RESET: {
        draft.createExamination.status = "IDLE";
        delete draft.createExamination.error;
        break;
      }

      /**
       * UPDATE_EXAMINATION
       */
      case UPDATE_EXAMINATION_LOADING: {
        draft.updateExamination.status = "LOADING";
        break;
      }

      case UPDATE_EXAMINATION_SUCCESS: {
        draft.updateExamination.status = "SUCCESS";
        draft.updateExamination.data = action.payload;
        draft.examinationsByPatientId.data =
          draft.examinationsByPatientId.data?.map((e) => {
            return e.pex_ID === action.payload.pex_ID
              ? (action.payload as PatientExaminationDTO)
              : e;
          });
        delete draft.updateExamination.error;
        break;
      }

      case UPDATE_EXAMINATION_FAIL: {
        draft.updateExamination.status = "FAIL";
        draft.updateExamination.error = action.error;
        break;
      }

      case UPDATE_EXAMINATION_RESET: {
        draft.updateExamination.status = "IDLE";
        delete draft.updateExamination.error;
        break;
      }

      /**
       * SEARCH_EXAMINATION
       */
      case SEARCH_EXAMINATION_LOADING: {
        draft.examinationsByPatientId.status = "LOADING";
        break;
      }

      case SEARCH_EXAMINATION_SUCCESS: {
        draft.examinationsByPatientId.status = "SUCCESS";
        draft.examinationsByPatientId.data = action.payload;
        delete draft.examinationsByPatientId.error;
        break;
      }
      case SEARCH_EXAMINATION_SUCCESS_EMPTY: {
        draft.examinationsByPatientId.status = "SUCCESS_EMPTY";
        draft.examinationsByPatientId.data = [];
        delete draft.examinationsByPatientId.error;
        break;
      }
      case SEARCH_EXAMINATION_FAIL: {
        draft.examinationsByPatientId.status = "FAIL";
        draft.examinationsByPatientId.error = action.error;
        break;
      }

      /**
       * DELETE_EXAMINATION
       */
      case DELETE_EXAMINATION_LOADING: {
        draft.deleteExamination.status = "LOADING";
        break;
      }

      case DELETE_EXAMINATION_SUCCESS: {
        draft.deleteExamination.status = "SUCCESS";
        delete draft.deleteExamination.error;
        break;
      }

      case DELETE_EXAMINATION_FAIL: {
        draft.deleteExamination.status = "FAIL";
        draft.deleteExamination.error = action.error;
        break;
      }

      case DELETE_EXAMINATION_RESET: {
        draft.deleteExamination.status = "IDLE";
        delete draft.deleteExamination.error;
        break;
      }
    }
  },
  initial
);
