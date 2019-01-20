import {GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS} from '../reducers/usersReducer';
import {responseHandler, errorHandler} from '../helpers/responseHandlers';
import config from '../config';

const GET_ALL_USERS_API_CONTEXT = 'https://gorest.co.in/public-api/users?';
const qs = require('qs');

export function getUsers(payload) {
    payload = qs.stringify({...payload,...{'_format' : 'json', 'access-token':config.access_token}});

    const requestOptions = {
        method: 'GET',

    };

    return dispatch => {
        dispatch(request(GET_ALL_USERS_REQUEST));

        fetch(GET_ALL_USERS_API_CONTEXT + payload, requestOptions).then(responseHandler).then(users => {
            dispatch({
                type: GET_ALL_USERS_SUCCESS,
                payload: {
                    users: users['result'],
                    totalCount: users["_meta"].totalCount,
                    totalPages: users["_meta"].pageCount,
                    currentPage: users["_meta"].currentPage,
                },
            });
        }).catch(errorHandler);
    };
}


export const request = (type) => {
    return {
        type: type,
    };
};