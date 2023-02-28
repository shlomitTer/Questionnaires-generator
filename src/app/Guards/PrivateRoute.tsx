import { FunctionComponent, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { APP_ROUTING_PATHS, tokenLocalStorageKey } from '../constants';
import { useAppSelector } from '../store';

interface IProps {
    children: ReactElement;
}

// used to protect routes that require uses to be authenticated and logged in.

export const PrivateRoute: FunctionComponent<IProps> = ({ children }) => {
    const { isLoggedIn } = useAppSelector((store) => store.authReducer);
    const token = localStorage.getItem(tokenLocalStorageKey);
    return isLoggedIn || token ? children : <Navigate to={APP_ROUTING_PATHS.LOGIN} />;
};
