import { createAction, createReducer } from '@reduxjs/toolkit';
import { IAppExampleApi } from '../../features/AppExamples/components/AppExample1/AppExample1.model';
import { apiService, createApiThunk } from '../api/axios';
import { APIRequestState, EAPIStatus, IAPIRequestState } from '../api/models';
import { i18LanguageCode } from '../i18/i18n.codes';
import { ApiDataStateType, createAPIReducerCases } from './utils';

export interface SharedStoreState extends ApiDataStateType {
    asyncData: IAPIRequestState<IAppExampleApi>;
    syncIsLoggedIn: boolean;
    languageCode: i18LanguageCode;
    apiState: EAPIStatus;
}

const initialSTate: SharedStoreState = {
    asyncData: APIRequestState.create(),
    syncIsLoggedIn: false,
    languageCode: 'en',
    apiState: EAPIStatus.IDLE,
};

export const getAsyncData = createApiThunk('sharedStore/getMetaData', () => apiService.get('./api.example.json'));

export const setSyncIsLoggedIn = createAction<boolean>('sharedStore/setIsLoggedIn');

export const setLanguageCode = createAction<i18LanguageCode>('sharedStore/setLanguage');

export const sharedStoreReducer = createReducer(initialSTate, (builder) => {
    createAPIReducerCases(getAsyncData, 'asyncData', builder, {
        onPending: (state) => (state.apiState = EAPIStatus.PENDING),
        onFulfilled: (state) => (state.apiState = EAPIStatus.FULFILLED),
        onRejected: (state) => (state.apiState = EAPIStatus.REJECTED),
    });
    builder.addCase(setSyncIsLoggedIn, (state, action) => {
        state.syncIsLoggedIn = action.payload;
    });
    builder.addCase(setLanguageCode, (state, action) => {
        state.languageCode = action.payload;
    });
});
