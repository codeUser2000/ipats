export const GET_SERVICE_REQUEST = 'GET_SERVICE_REQUEST';
export const GET_SERVICE_SUCCESS = 'GET_SERVICE_SUCCESS';
export const GET_SERVICE_FAIL = 'GET_SERVICE_FAIL';

export function getServiceRequest(lang) {
    return {
        type: GET_SERVICE_REQUEST,
        payload: {lang},
    };
}
export const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE';

export function langChange(lang) {
    return {
        type: LANGUAGE_CHANGE,
        payload: {lang},
    };
}

