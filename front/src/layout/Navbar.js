import React from 'react'
import {Link, NavLink} from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <NavLink className={"btn btn-primary "} to={"/save"}>Add Note</NavLink>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Note List</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>

            </nav>
        </div>
    );
}
