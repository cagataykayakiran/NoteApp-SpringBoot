import React, {useEffect, useState} from 'react'
import axios from "axios";
import {NavLink, useNavigate, useParams} from "react-router-dom";

export default function EditNote() {

    const [text, setText] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()
    const id = useParams()

    useEffect(() => {
        loadNote()
    },[])

    function onSubmit(e) {
        e.preventDefault()
        console.log(id)
        const body = { text, content }
        axios.put("/edit/" + id.id, body).then((res) => navigate("/"))

    }

    const loadNote = () => {
        const result = axios.get("/notes/" + id.id).then(res => {
            setText(res.data.text)
            setContent(res.data.content)
        })
    }

    return (
        <div className={"container"}>
            <div className="row">
                <div className={"col-md-6 mt-5 offset-md-3 border rounded p-4 mt-2 shadow"}>
                    <h1 className={"text-center"}>Edit Note</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Content</label>
                            <input type="text" className="form-control"
                                   onChange={(event) => setContent(event.target.value)}
                                   id="exampleInputEmail1"
                                    value={content}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Text</label>
                            <input type="text" className="form-control"
                                   onChange={(event) => setText(event.target.value)}
                                   id="exampleInputPassword1"
                                   value={text}/>
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
