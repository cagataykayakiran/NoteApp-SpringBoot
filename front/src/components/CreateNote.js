import React, {useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";


function CreateNote() {

    const [text, setText] = useState("");
    const [content, setContent] = useState("");
    const {id} = useParams()


    const navigate = useNavigate()
    const saveOrUpdateNote = async (event) => {
        if (id) {
            axios.put("/edit" + id).then(res => navigate("/notes"))
        } else {
            event.preventDefault()
            const body = {text, content}
            await axios.post("/save", body).then(res => navigate("/notes"))
        }

    }
    return (
        <div className={"container"}>
            <h1 className={"text-center"}>Create Note</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <input type="text" style={{width: "300px"}} onChange={event => setContent(event.target.value)}
                           className="form-control" id="content"
                           placeholder="Content"/>
                </div>
                <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <input type="text" style={{width: "500px"}} onChange={event => setText(event.target.value)}
                           className="form-control" id="text" placeholder="Text"/>
                </div>
                <button type="submit" onClick={saveOrUpdateNote} className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
}

export default CreateNote