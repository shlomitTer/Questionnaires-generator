export const tokenLocalStorageKey = 'tokenLocalStorageKey';

export const APP_ROUTING_PATHS = {
    HOME: '/',
    REDIRECT: '/',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    EXAMPLES: '/examples',
    CREATE: '/create',
    ADD_QUESTION: '/add-question',
    ALL_QUIZZES: '/all',
    VOTE: '/vote',
    RESULTS: '/results'
};

export const API_ROUTES = {
    AUTH: {
        LOGIN: '',
        LOGOUT: '',
        REGISTER: '',
        FORGET_PASSWORD: '',
        RESET_PASSWORD: '',
    },
};

export const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER_URL : process.env.REACT_APP_SERVER_URL;
