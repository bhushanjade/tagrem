export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL';


const initialState = {
    isFetching: false,
    users: [],
    totalCount:0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USERS_REQUEST:
            return {
                ...state,
                isFetching: true,
                users:[]
            };
        case GET_ALL_USERS_SUCCESS :
            return {
                ...state,
                isFetching: false,
                ...action.payload
            }
        case GET_ALL_USERS_FAIL:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state;
    }
}