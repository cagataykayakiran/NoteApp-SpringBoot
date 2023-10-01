import React from 'react'
import {NavLink, useNavigate} from "react-router-dom";

export default function Navbar() {

    const user = localStorage.getItem("username");
    const navigate = useNavigate();
    console.log(user)

    function onClick() {
        localStorage.removeItem("currentUser")
        localStorage.removeItem("tokenKey")
        navigate("/")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container">
                    <div style={{ display: 'flex' }}>
                        <NavLink className={"btn btn-success text-truncate "} to={"/save"}>Add Note</NavLink>
                    </div>
                    <div className="container-fluid">
                        <a className="navbar-brand position-absolute top-50 start-50 translate-middle" href="#">Note List</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div>
                        {
                            user == null ?
                                <NavLink onClick={onClick} className={"btn btn-primary"} to={"/login"}>Login/Register</NavLink>
                        :
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span className="me-5 text-white text-truncate">Hoşgeldiniz, {user}!</span>
                                    <NavLink onClick={onClick} className={"btn btn-primary"} style={{ marginRight: '10px' }} to={"/profile"}>Profile</NavLink>
                                    <NavLink onClick={onClick} className={"btn btn-danger"} to={"/home"}>Logout</NavLink>
                                </div>
                        }
                    </div>
                </div>

            </nav>
        </div>
    );
}
