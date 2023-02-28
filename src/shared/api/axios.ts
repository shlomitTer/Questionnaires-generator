import { createAsyncThunk, EnhancedStore } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { addAuthorizationHeaderInterceptor } from './interceptors';
import { IAPIError } from './models';

export const InternalError = {
    message: 'Internal error during request.',
    code: 500,
};

/**
 * Return the exception payload using the message and code returned from axios
 * @param ex The exception
 */
export const getExceptionPayload = (ex: unknown): IAPIError => {
    if (typeof ex !== 'object' || !ex) {
        return InternalError;
    }
    const typedException = ex as IAPIError;
    if (!!typedException?.message && !!typedException?.code) {
        return {
            message: typedException.message,
            code: typedException.code,
        };
    }
    return InternalError;
};

/**
 * The api thunk callback type (because we cannot import it from redux toolkit
 */
type ApiThunkCallback<TData, TArgs> = (args?: TArgs) => Promise<AxiosResponse<TData> | TData>;

/**
 * Create an api thunk, which will run the provided promise and await it
 * @param typePrefix The type prefix of the action
 * @param requestCallback A callback function which returns an api request using axios
 */
export const createApiThunk = <TData, TArgs = void>(
    typePrefix: string,
    requestCallback: ApiThunkCallback<TData, TArgs>,
) => {
    return createAsyncThunk<TData, TArgs, { rejectValue: IAPIError }>(typePrefix, async (args, { rejectWithValue }) => {
        try {
            const response = await requestCallback(args);
            return (response as AxiosResponse<TData>)?.data ?? (response as TData);
            // eslint-disable-next-line
        } catch (e: any) {
            return rejectWithValue({ message: e?.response?.data?.displayMessage, code: e?.response?.data?.statusCode });
        }
    });
};

/**
 * An axios instance using our base url, and later our token
 */
export const apiService = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

/**
 * Add authorization header based on localstorage.
 */
apiService.interceptors.request.use(addAuthorizationHeaderInterceptor);

/**
 * Injecting the store to be able to use it inside axios interceptors
 * https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
 */

// eslint-disable-next-line
let store: EnhancedStore | undefined;
export const injectStore = (_store: EnhancedStore) => {
    store = _store;
};
const FORBIDDEN = 403;
const UNAUTHORIZED = 401;
const SERVER_ERROR = 500;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;
apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        // we have acess to the ApiResponse
        //const {data} = error.response as IAPIRequestState<IApiResponseModel<any>>;
        // we can dispatch actions to set the error message and display errors to user
        // const {dispatch,} = store;
        switch (status) {
            case UNAUTHORIZED || FORBIDDEN:
                // refresh token here or clear local storage and reload app to logout
                break;
            case SERVER_ERROR || NOT_FOUND:
                // add dispatch to erro toaster / notification
                break;
            case BAD_REQUEST:
                // add dispatch to erro toaster / notification
                break;
            default:
                break;
        }

        return Promise.reject(error);
    },
);
