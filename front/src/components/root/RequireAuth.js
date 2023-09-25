import React from 'react';
import {Navigate, Outlet} from "react-router-dom";


function RequireAuth() {
    const user = localStorage.getItem("currentUser");

    return (
        user ? <Outlet/> : <Navigate to={"/login"}/>
    );
}

export default RequireAuth;