import { createReducer } from '@reduxjs/toolkit';
import { apiService, createApiThunk } from '../../shared/api/axios';
import { APIRequestState, EAPIStatus, IAPIRequestState, IApiResponseModel } from '../../shared/api/models';
import { ApiDataStateType, createAPIReducerCases } from '../../shared/store/utils';
import { API_ROUTES } from '../constants';
import { ILoginRequest, IUser } from './Auth.models';

export interface AuthState extends ApiDataStateType {
    user: IAPIRequestState<IApiResponseModel<IUser>>;
    isLoggedIn: boolean;
    status: EAPIStatus;
}

const initialState: AuthState = {
    user: APIRequestState.create(),
    isLoggedIn: false,
    status: EAPIStatus.IDLE,
};

export const loginUserAction = createApiThunk('auth/loginUser', (req?: ILoginRequest) =>
    apiService.post<IApiResponseModel<IUser>>(API_ROUTES.AUTH.LOGIN, req),
);

export const authReducer = createReducer(initialState, (builder) => {
    createAPIReducerCases(loginUserAction, 'user', builder, {
        onPending: (state) => {
            state.status = EAPIStatus.PENDING;
        },
        onFulfilled: (state) => {
            state.isLoggedIn = true;
            state.status = EAPIStatus.IDLE;
        },
    });
});
