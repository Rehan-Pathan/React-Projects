/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        /**
         * Redirects users based on their authentication status:
         * - If `authentication` is true and `authStatus` is false, redirect to login.
         * - If `authentication` is false and `authStatus` is true, redirect to home.
         */
        const handleRedirect = () => {
            if (authentication && !authStatus) {
                navigate("/login");
            } else if (!authentication && authStatus) {
                navigate("/");
            }
            setLoader(false);
        };

        handleRedirect();
    }, [authStatus, navigate, authentication]);

    return loader ? (
        <div className="flex items-center justify-center h-screen">
            <div className="loader" aria-label="Loading..."></div>
        </div>
    ) : (
        <>{children}</>
    );
}
