import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../../Api';
import {
    GET_SERVICE_FAIL,
    GET_SERVICE_REQUEST,
    GET_SERVICE_SUCCESS
} from "../actions/home";







function* handleHomeRequest(action) {
    try {
        const {data} = yield call(Api.getService, action.payload.lang);
        yield put({
            type: GET_SERVICE_SUCCESS,
            payload: {data},
        });
    } catch (e) {
        yield put({
            type: GET_SERVICE_FAIL,
            payload: {error: e.response},
        });
    }
}

export default function* watcher() {
    yield takeLatest(GET_SERVICE_REQUEST, handleHomeRequest);

}
