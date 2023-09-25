import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Auth() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleUsername(value) {
        setUsername(value);
    }

    function handlePassword(value) {
        setPassword(value)
    }

    const handleButton = (path) => {
        sendRequest(path)
        setPassword("")
        setUsername("")
    }


    function sendRequest(path) {
        const body = {username, password}
        axios.post("login/" + path, body)
            .then(response => {
                localStorage.setItem("tokenKey", response.data.token);
                localStorage.setItem("currentUser", response.data.id);
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className={"container"}>
            <div className={"col-md-6 mt-5 offset-md-3 border rounded p-4 mt-2 shadow"}>
                <form>
                    <h1 className={"text-center"}>Sign in</h1>
                    <div className={"mb-3"}>
                        <label htmlFor="username" className={"form-label"}>Username</label>
                        <input type={"text"} className={"form-control"}
                               onChange={(e) => {
                                   handleUsername(e.target.value)
                               }
                               } id={"username"}/>
                    </div>
                    <div className={"mb-3"}>
                        <label htmlFor="password" className={"form-label"}>Username</label>
                        <input type={"password"} className={"form-control"}
                               onChange={(e) => {
                                   handlePassword(e.target.value)
                               }
                               } id={"password"}/>
                    </div>
                    <div>
                        <button className={"btn btn-primary mt-3"}
                                onClick={() => handleButton("register")}
                                disabled={!(username && password)}
                        >Sign in
                        </button>
                    </div>
                    <h3>Are you already registered ?</h3>
                    <div>
                        <button className={"btn btn-info mt-3"}
                                onClick={() => handleButton("login")}
                                disabled={!(username && password)}
                        >Login
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}
