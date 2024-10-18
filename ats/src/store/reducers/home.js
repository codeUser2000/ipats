import {GET_SERVICE_FAIL, GET_SERVICE_REQUEST, GET_SERVICE_SUCCESS, LANGUAGE_CHANGE} from "../actions/home";

const initialState = {
    homeStatus:'',
    home:[],
    serviceStatus:'',
    service:[],
    lang:1
};
// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_SERVICE_REQUEST: {
            return {
                ...state,
                serviceStatus: 'request',
            };
        }
        case GET_SERVICE_SUCCESS: {
            return {
                ...state,
                service: action.payload.data,
                serviceStatus: 'ok',
            };
        }
        case GET_SERVICE_FAIL: {
            return {
                ...state,
                serviceStatus: 'fail',
            };
        }
        case LANGUAGE_CHANGE: {
            return {
                ...state,
                lang: +action.payload.lang,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}
