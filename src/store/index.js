import {reducer as formReducer} from "redux-form";
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer} from "./twitter/reducer";

export default createStore(
    combineReducers({
        mainState: reducer,
        form: formReducer
    }), applyMiddleware(
        thunkMiddleware
    ));