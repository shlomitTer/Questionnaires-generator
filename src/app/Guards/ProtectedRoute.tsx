import { FunctionComponent, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { APP_ROUTING_PATHS } from '../constants';
import { useAppSelector } from '../store';

interface IProps {
    children: ReactElement;
}

// used to navigate away from auth routes if user already logged in.

export const ProtectedRoute: FunctionComponent<IProps> = ({ children }) => {
    const { isLoggedIn } = useAppSelector((store) => store.authReducer);
    return !isLoggedIn ? children : <Navigate to={APP_ROUTING_PATHS.HOME} />;
};
