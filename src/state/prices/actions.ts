import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { PriceListsApi } from "../../generated/apis/PriceListsApi";
import { PriceDTO } from "../../generated/models/PriceDTO";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_PRICELISTS_FAIL,
  GET_PRICELISTS_LOADING,
  GET_PRICELISTS_SUCCESS,
  GET_PRICE_FAIL,
  GET_PRICE_LOADING,
  GET_PRICE_SUCCESS,
} from "./consts";

const pricesApi = new PriceListsApi(customConfiguration());

export const getPrices =
  () =>
  (dispatch: Dispatch<IAction<PriceDTO[], {}>>): void => {
    dispatch({
      type: GET_PRICE_LOADING,
    });
    pricesApi.getPrices({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_PRICE_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_PRICE_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_PRICE_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const getPriceLists =
  () =>
  (dispatch: Dispatch<IAction<PriceDTO[], {}>>): void => {
    dispatch({
      type: GET_PRICELISTS_LOADING,
    });
    pricesApi.getPriceLists({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_PRICELISTS_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_PRICELISTS_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_PRICELISTS_FAIL,
          error: error?.response,
        });
      }
    );
  };
