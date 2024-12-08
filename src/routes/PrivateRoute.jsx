import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/common/LoadingSpinner";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(authContext);

    const location = useLocation();

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to={"/login"} state={location.pathname} replace />

};

export default PrivateRoute;