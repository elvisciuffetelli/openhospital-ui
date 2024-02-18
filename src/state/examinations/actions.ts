import { Dispatch } from "redux";
import { PatientExaminationDTO } from "../../generated";
import { ExaminationsApi } from "../../generated/apis/ExaminationsApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  CREATE_EXAMINATION_FAIL,
  CREATE_EXAMINATION_LOADING,
  CREATE_EXAMINATION_RESET,
  CREATE_EXAMINATION_SUCCESS,
  DELETE_EXAMINATION_FAIL,
  DELETE_EXAMINATION_RESET,
  GET_DEFAULT_EXAMINATION_FAIL,
  GET_DEFAULT_EXAMINATION_LOADING,
  GET_DEFAULT_EXAMINATION_SUCCESS,
  GET_LAST_EXAMINATION_FAIL,
  GET_LAST_EXAMINATION_LOADING,
  GET_LAST_EXAMINATION_SUCCESS,
  SEARCH_EXAMINATION_FAIL,
  SEARCH_EXAMINATION_LOADING,
  SEARCH_EXAMINATION_SUCCESS,
  SEARCH_EXAMINATION_SUCCESS_EMPTY,
  UPDATE_EXAMINATION_FAIL,
  UPDATE_EXAMINATION_LOADING,
  UPDATE_EXAMINATION_RESET,
  UPDATE_EXAMINATION_SUCCESS,
} from "./consts";

const examinationsApi = new ExaminationsApi(customConfiguration());

export const createExamination =
  (newPatientExamination: PatientExaminationDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_EXAMINATION_LOADING,
    });
    examinationsApi
      .newPatientExamination({ patientExaminationDTO: newPatientExamination })
      .subscribe(
        (payload) => {
          dispatch({
            type: CREATE_EXAMINATION_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: CREATE_EXAMINATION_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const createExaminationReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_EXAMINATION_RESET,
    });
  };
export const updateExamination =
  (id: number, dto: PatientExaminationDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_EXAMINATION_LOADING,
    });
    examinationsApi
      .updateExamination({ id, patientExaminationDTO: dto })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_EXAMINATION_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_EXAMINATION_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const updateExaminationReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_EXAMINATION_RESET,
    });
  };

export const deleteExaminationReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_EXAMINATION_RESET,
    });
  };

export const getDefaultPatientExamination =
  (patId: number) =>
  (dispatch: Dispatch<IAction<PatientExaminationDTO, {}>>): void => {
    dispatch({
      type: GET_DEFAULT_EXAMINATION_LOADING,
    });
    if (patId) {
      examinationsApi.getDefaultPatientExamination({ patId: patId }).subscribe(
        (payload) => {
          dispatch({
            type: GET_DEFAULT_EXAMINATION_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: GET_DEFAULT_EXAMINATION_FAIL,
            error,
          });
        }
      );
    } else
      dispatch({
        type: GET_DEFAULT_EXAMINATION_FAIL,
        error: "patient object should not be empty",
      });
  };

export const getLastByPatientId =
  (patId: number) =>
  (dispatch: Dispatch<IAction<PatientExaminationDTO, {}>>): void => {
    dispatch({
      type: GET_LAST_EXAMINATION_LOADING,
    });
    if (patId) {
      examinationsApi.getLastByPatientId({ patId: patId }).subscribe(
        (payload) => {
          dispatch({
            type: GET_LAST_EXAMINATION_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: GET_LAST_EXAMINATION_FAIL,
            error,
          });
        }
      );
    } else
      dispatch({
        type: GET_LAST_EXAMINATION_FAIL,
        error: "patient object should not be empty",
      });
  };

export const examinationsByPatientId =
  (patId: number | undefined) =>
  (dispatch: Dispatch<IAction<PatientExaminationDTO[], {}>>): void => {
    dispatch({
      type: SEARCH_EXAMINATION_LOADING,
    });
    if (patId) {
      examinationsApi.getByPatientId({ patId: patId }).subscribe(
        (payload) => {
          if (Array.isArray(payload) && payload.length > 0) {
            dispatch({
              type: SEARCH_EXAMINATION_SUCCESS,
              payload: payload,
            });
          } else {
            dispatch({
              type: SEARCH_EXAMINATION_SUCCESS_EMPTY,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: SEARCH_EXAMINATION_FAIL,
            error,
          });
        }
      );
    } else
      dispatch({
        type: SEARCH_EXAMINATION_FAIL,
        error: "patient object should not be empty",
      });
  };

export const deleteExamination =
  (code: number | undefined) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    /**
     * delete api not yet available
     */
    dispatch({
      type: DELETE_EXAMINATION_FAIL,
      error: "delete api not yet available !!!",
    });
  };
