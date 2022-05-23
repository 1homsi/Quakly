import { combineReducers } from "redux";
import PostAddReducer from "./reducers/postReducer";


const reducers = combineReducers({
    Post: PostAddReducer,

});

export default reducers;