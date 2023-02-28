import { AxiosRequestConfig } from 'axios';
import { tokenLocalStorageKey } from '../../app/constants';

/**
 * Add auth header with token, depending on server convention you might not need to add the word 'Bearer'
 * @param config axios config
 */
export const addAuthorizationHeaderInterceptor = (config: AxiosRequestConfig) => {
    // get token from local-storage
    const token = JSON.parse(window.localStorage.getItem(tokenLocalStorageKey) as string);
    // if there is a token saved try to use it and set it in the headers in the request.
    if (token && config?.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
};
