import React from 'react';
import {Navigate, Outlet} from "react-router-dom";


function RequireAuth() {
    const token = localStorage.getItem("tokenKey");

    return (
        token ? <Outlet/> : <Navigate to={"/login"}/>
    );
}

export default RequireAuth;