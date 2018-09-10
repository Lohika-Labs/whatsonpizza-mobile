import { postBase64 } from '../../src/common/api'; 

const REQUEST = 'REQUEST';
const RECEIVE = 'RECEIVE';
const ERROR = 'ERROR';

const initialState = {
  data: {},
  error: false,
  loading: false,
  message: 'Something went wrong, please try again later',
};

export default function ResultReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        data: {},
        error: false,
        loading: true,
      };
    
    case RECEIVE:
      return {
        ...state,
        data: action.payload,
        error: action.payload.status !== 'ok',
        loading: false,
        message: action.payload.status_message || initialState.message,
      };
    
    case ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: `${initialState.message} (Error: ${action.errorCode})`,
      };
    
    default:
      return state;
  }
}

export const request = base64 => dispatch => {
  dispatch({ type: REQUEST });

  postBase64('http://mxnet.labs.lohika.com/p', base64)
    .then(payload => {
      dispatch({
        type: RECEIVE,
        payload,
      });
    })
    .catch(error => {
      dispatch({ type: ERROR, errorCode: error.status });
    });
};
