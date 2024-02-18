import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { VisitDTO } from "../../generated";
import { VisitApi } from "../../generated/apis/VisitApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  CREATE_VISIT_FAIL,
  CREATE_VISIT_LOADING,
  CREATE_VISIT_RESET,
  CREATE_VISIT_SUCCESS,
  GET_VISIT_FAIL,
  GET_VISIT_LOADING,
  GET_VISIT_SUCCESS,
  GET_VISIT_SUCCESS_EMPTY,
  UPDATE_VISIT_FAIL,
  UPDATE_VISIT_LOADING,
  UPDATE_VISIT_RESET,
  UPDATE_VISIT_SUCCESS,
} from "./consts";

const visitsApi = new VisitApi(customConfiguration());

export const createVisit =
  (newVisit: VisitDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_VISIT_LOADING,
    });
    visitsApi.newVisit({ visitDTO: newVisit }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_VISIT_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_VISIT_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createVisitReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_VISIT_RESET,
    });
  };

export const updateVisitReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_VISIT_RESET,
    });
  };

export const getVisits =
  (code: number) =>
  (dispatch: Dispatch<IAction<VisitDTO[], {}>>): void => {
    dispatch({
      type: GET_VISIT_LOADING,
    });
    visitsApi
      .getVisit({
        patID: code,
      })
      .subscribe(
        (payload) => {
          if (typeof payload === "object" && !isEmpty(payload)) {
            dispatch({
              type: GET_VISIT_SUCCESS,
              payload: payload,
            });
          } else {
            dispatch({
              type: GET_VISIT_SUCCESS_EMPTY,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_VISIT_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const updateVisit =
  (visitID: number, updateVisit: VisitDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_VISIT_LOADING,
    });
    visitsApi.updateVisit({ visitID, visitDTO: updateVisit }).subscribe(
      (payload) => {
        dispatch({
          type: UPDATE_VISIT_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_VISIT_FAIL,
          error: error?.response,
        });
      }
    );
  };
