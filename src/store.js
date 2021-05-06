import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

const initialState = {
    todos: [],
    loading: false,
    error: null,
}

const reducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case 'fetchTodos_request':
            return {
                ...state,
                loading: true
            }
        case 'fetchTodos_success':
            return {
                ...state,
                todos: action.payload,
                loading: false
            }
        case 'fetchTodos_error':
            return {
                ...state,
                todos: [],
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const fetchTodos = () => async (dispatch, getState) => {
    dispatch({
            type: 'fetchTodos_request',
        });

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
    );
    const data = await response.json();

    if (!response.ok) {
        dispatch({
            type: 'fetchTodos_error',
            // payload: 'Something goes wrong'
            // payload: response.statusText
            payload: data
        })
        return;
    }

    dispatch({
            type: 'fetchTodos_success',
            payload: data,
        });
};

const logger = (store) => (next) => async (action) => {
    console.log('dispatching', action);
    const result = next(action);
    // console.log('next state', store.getState());

    return result;
}

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;