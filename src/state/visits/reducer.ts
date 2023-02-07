import produce from "immer";
import { VisitDTO } from "../../generated";
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
import { initial } from "./initial";
import { IVisitState } from "./types";

export default produce((draft: IVisitState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * CREATE_VISIT
     */
    case CREATE_VISIT_LOADING: {
      draft.createVisit.status = "LOADING";
      break;
    }

    case CREATE_VISIT_SUCCESS: {
      draft.createVisit.status = "SUCCESS";
      draft.createVisit.data = action.payload;
      draft.getVisits.data = [...(draft.getVisits.data ?? []), action.payload];
      delete draft.createVisit.error;
      break;
    }

    case CREATE_VISIT_FAIL: {
      draft.createVisit.status = "FAIL";
      draft.createVisit.error = action.error;
      break;
    }

    case CREATE_VISIT_RESET: {
      draft.createVisit.status = "IDLE";
      delete draft.createVisit.error;
      break;
    }
    case GET_VISIT_LOADING: {
      draft.getVisits.status = "LOADING";
      break;
    }

    case GET_VISIT_SUCCESS: {
      draft.getVisits.status = "SUCCESS";
      draft.getVisits.data = action.payload;
      delete draft.getVisits.error;
      break;
    }

    case GET_VISIT_FAIL: {
      draft.getVisits.status = "FAIL";
      draft.getVisits.error = action.error;
      break;
    }

    case GET_VISIT_SUCCESS_EMPTY: {
      draft.getVisits.status = "SUCCESS_EMPTY";
      draft.getVisits.data = [];
      delete draft.getVisits.error;
      break;
    }

    case UPDATE_VISIT_LOADING: {
      draft.updateVisit.status = "LOADING";
      delete draft.updateVisit.error;
      break;
    }

    case UPDATE_VISIT_SUCCESS: {
      draft.updateVisit.status = "SUCCESS";
      draft.updateVisit.data = action.payload;
      draft.getVisits.data = draft.getVisits.data?.map((e) => {
        return e.visitID === action.payload.visitID
          ? (action.payload as VisitDTO)
          : e;
      });
      delete draft.updateVisit.error;
      break;
    }

    case UPDATE_VISIT_FAIL: {
      draft.updateVisit.status = "FAIL";
      draft.updateVisit.error = action.error;
      break;
    }
    case UPDATE_VISIT_RESET: {
      draft.updateVisit.status = "IDLE";
      delete draft.updateVisit.error;
      break;
    }
  }
}, initial);
