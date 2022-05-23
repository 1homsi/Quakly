import {
    POST_REQUEST,
    POST_SUCCESS,
    POST_FAIL,
    POST_RESET
} from "../actions/postAction";

const initialState = {
    loading: false
};

const PostAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REQUEST:
            return { loading: true };
        case POST_SUCCESS:
            return { loading: false };
        case POST_FAIL:
            return { loading: false, error: action.payload };
        case POST_RESET:
            return { loading: false };
        default:
            return state;
    }
};

export default PostAddReducer;