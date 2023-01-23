import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { habitActions } from "../index";
import { httpClient } from "../../../../services/httpClient";

interface IGetAllSummaryListResponse {
  amount?: number;
  date: Date;
  id: string;
  completed?: number;
}

export function* getAll() {
  try {
    const response: AxiosResponse<IGetAllSummaryListResponse[]>  = yield call(
      httpClient.get,
      'summary'
    );

    console.log('data', response.data);
    
    yield put(habitActions.getAllSuccess({
      list: response.data,
    }))
  } catch (err: any) {
    console.log('err', err);
    yield put(habitActions.getAllFailure());
  }
}