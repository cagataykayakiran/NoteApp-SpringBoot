import React, {useState} from 'react'
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";

export default function AddUser() {

    const [text, setText] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()

     function onSubmit(e) {
        e.preventDefault()
        const body = { text, content }
         axios.post("/save", body).then((res) => navigate("/"))

    }

    return (
        <div className={"container"}>
            <div className="row">
                <div className={"col-md-6 mt-5 offset-md-3 border rounded p-4 mt-2 shadow"}>
                    <h1 className={"text-center"}>Create Note</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Content</label>
                            <input type="text" className="form-control"
                                   onChange={(event) => setText(event.target.value)}
                                   id="exampleInputEmail1"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Text</label>
                            <input type="text" className="form-control"
                                   onChange={(event) => setContent(event.target.value)}
                                   id="exampleInputPassword1"/>
                        </div>
                        <button type="submit"
                                className="btn btn-primary">Submit</button>
                        <NavLink to={"/"} className={"btn btn-outline-danger mx-4"}>Cancel</NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}
