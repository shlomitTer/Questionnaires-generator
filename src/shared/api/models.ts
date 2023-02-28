// msbit standard api response model
export interface IApiResponseModel<T> {
    isSuccessful: boolean;
    statusCode: number;
    innerCode: number;
    displayMessage: string;
    exception: string;
    data: T;
}

/**
 * The status of the running request can be either
 *
 * IDLE - Initialized, but not called yet
 *
 * PENDING - The call status is currently working
 *
 * FULFILLED - The call is finished with success
 *
 * Rejected - The call is finished with an error
 */
export enum EAPIStatus {
    IDLE = 'idle',
    PENDING = 'pending',
    REJECTED = 'rejected',
    FULFILLED = 'fulfilled',
}

/**
 * An API error, saving the code and message from axios
 */
export interface IAPIError {
    message: string;
    code: number;
}

/**
 * A generic API request
 */
// eslint-disable-next-line
export interface IAPIRequestState<T = any> {
    status: EAPIStatus;
    error?: IAPIError;
    data?: T;
}

export abstract class APIRequestState {
    static create<T>(): IAPIRequestState<T> {
        return { status: EAPIStatus.IDLE };
    }
}
