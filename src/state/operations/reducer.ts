import produce from "immer";
import { OperationRowDTO } from "../../generated";
import { IAction } from "../types";
import {
  CREATE_OPERATIONROW_FAIL,
  CREATE_OPERATIONROW_LOADING,
  CREATE_OPERATIONROW_RESET,
  CREATE_OPERATIONROW_SUCCESS,
  DELETE_OPERATIONROW_FAIL,
  DELETE_OPERATIONROW_LOADING,
  DELETE_OPERATIONROW_RESET,
  DELETE_OPERATIONROW_SUCCESS,
  GET_OPERATIONROW_ADM_EMPTY,
  GET_OPERATIONROW_ADM_FAIL,
  GET_OPERATIONROW_ADM_LOADING,
  GET_OPERATIONROW_ADM_RESET,
  GET_OPERATIONROW_ADM_SUCCESS,
  GET_OPERATIONS_EMPTY,
  GET_OPERATIONS_FAIL,
  GET_OPERATIONS_LOADING,
  GET_OPERATIONS_RESET,
  GET_OPERATIONS_SUCCESS,
  UPDATE_OPERATIONROW_FAIL,
  UPDATE_OPERATIONROW_LOADING,
  UPDATE_OPERATIONROW_RESET,
  UPDATE_OPERATIONROW_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IOperationState } from "./types";

export default produce((draft: IOperationState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * GET_OPERATIONS
     */
    case GET_OPERATIONS_LOADING: {
      draft.operationList.status = "LOADING";
      break;
    }

    case GET_OPERATIONS_SUCCESS: {
      draft.operationList.status = "SUCCESS";
      draft.operationList.data = action.payload;
      delete draft.operationList.error;
      break;
    }

    case GET_OPERATIONS_EMPTY: {
      draft.operationList.status = "SUCCESS_EMPTY";
      draft.operationList.data = action.payload;
      delete draft.operationList.error;
      break;
    }

    case GET_OPERATIONS_FAIL: {
      draft.operationList.status = "FAIL";
      draft.operationList.error = action.error;
      break;
    }

    case GET_OPERATIONS_RESET: {
      draft.operationList.status = "IDLE";
      delete draft.operationList.data;
      delete draft.operationList.error;
      break;
    }

    /**
     * GET_OPERATIONROW_ADM
     */
    case GET_OPERATIONROW_ADM_LOADING: {
      draft.operationRowsByQdmt.status = "LOADING";
      break;
    }

    case GET_OPERATIONROW_ADM_SUCCESS: {
      draft.operationRowsByQdmt.status = "SUCCESS";
      draft.operationRowsByQdmt.data = action.payload;
      delete draft.operationRowsByQdmt.error;
      break;
    }

    case GET_OPERATIONROW_ADM_EMPTY: {
      draft.operationRowsByQdmt.status = "SUCCESS_EMPTY";
      draft.operationRowsByQdmt.data = action.payload;
      delete draft.operationRowsByQdmt.error;
      break;
    }

    case GET_OPERATIONROW_ADM_FAIL: {
      draft.operationRowsByQdmt.status = "FAIL";
      draft.operationRowsByQdmt.error = action.error;
      break;
    }

    case GET_OPERATIONROW_ADM_RESET: {
      draft.operationRowsByQdmt.status = "IDLE";
      delete draft.operationRowsByQdmt.data;
      delete draft.operationRowsByQdmt.error;
      break;
    }

    /**
     * CREATE_OPERATIONROW
     */
    case CREATE_OPERATIONROW_LOADING: {
      draft.createOperationRow.status = "LOADING";
      break;
    }

    case CREATE_OPERATIONROW_SUCCESS: {
      draft.createOperationRow.status = "SUCCESS";
      draft.createOperationRow.data = action.payload;
      draft.operationRowsByQdmt.data = [
        ...(draft.operationRowsByQdmt.data ?? []),
        action.payload,
      ];
      delete draft.createOperationRow.error;
      break;
    }

    case CREATE_OPERATIONROW_FAIL: {
      draft.createOperationRow.status = "FAIL";
      draft.createOperationRow.error = action.error;
      break;
    }

    case CREATE_OPERATIONROW_RESET: {
      draft.createOperationRow.status = "IDLE";
      delete draft.createOperationRow.error;
      break;
    }

    /**
     * UPDATE_OPERATIONROW
     */
    case UPDATE_OPERATIONROW_LOADING: {
      draft.updateOperationRow.status = "LOADING";
      break;
    }

    case UPDATE_OPERATIONROW_SUCCESS: {
      draft.updateOperationRow.status = "SUCCESS";
      draft.updateOperationRow.data = action.payload;
      draft.operationRowsByQdmt.data = draft.operationRowsByQdmt.data?.map(
        (e) => {
          return e.id === action.payload.id
            ? (action.payload as OperationRowDTO)
            : e;
        }
      );
      delete draft.updateOperationRow.error;
      break;
    }

    case UPDATE_OPERATIONROW_FAIL: {
      draft.updateOperationRow.status = "FAIL";
      draft.updateOperationRow.error = action.error;
      break;
    }

    case UPDATE_OPERATIONROW_RESET: {
      draft.updateOperationRow.status = "IDLE";
      delete draft.updateOperationRow.error;
      break;
    }

    /**
     * DELETE_OPERATIONROW
     */
    case DELETE_OPERATIONROW_LOADING: {
      draft.deleteOperationRow.status = "LOADING";
      break;
    }

    case DELETE_OPERATIONROW_SUCCESS: {
      draft.deleteOperationRow.status = "SUCCESS";
      draft.deleteOperationRow.data = action.payload;
      draft.operationRowsByQdmt.data = draft.operationRowsByQdmt.data?.filter(
        (e) => e.id !== action.payload?.id
      );
      delete draft.deleteOperationRow.error;
      break;
    }

    case DELETE_OPERATIONROW_FAIL: {
      draft.deleteOperationRow.status = "FAIL";
      draft.deleteOperationRow.error = action.error;
      break;
    }

    case DELETE_OPERATIONROW_RESET: {
      draft.deleteOperationRow.status = "IDLE";
      delete draft.deleteOperationRow.error;
      break;
    }
  }
}, initial);
