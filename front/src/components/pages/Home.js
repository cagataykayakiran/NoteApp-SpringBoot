import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

export default function Home() {

    const [note, setNote] = useState([])
    const authHeader = () => {
        return { Authorization: "Bearer " + localStorage.getItem("tokenKey")};
    };

    const user = localStorage.getItem("currentUser")


    useEffect(() => {
        console.log(authHeader())
        axios.get("/notes/" + user , {headers : authHeader()}).then(res => setNote(res.data))
    }, [])


    const deleteNote = (id, index) => {

        axios
            .delete("/delete/" + id, {headers : authHeader()})
            .then(() => {
                const updatedNotes = [...note];
                updatedNotes.splice(index, 1);
                setNote(updatedNotes);
            })
            .catch((error) => {
                console.error("Error deleting note:", error);
            });
    };

    return (
        <div className={"container p-5"}>
            <div className={"row"}>
                {note.map((note, index) => (
                    <div className={"col-md-4"} key={index}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Note</h5>
                                <p className="card-text"><strong>Content:</strong> {note.content}</p>
                                <p className="card-text"><strong>Text:</strong> {note.text}</p>
                                <Link to={"/edit/" + note.id} className={"btn btn-outline-primary mx-2"}>Edit</Link>
                                <button className={"btn btn-danger mx-2"} onClick={() => deleteNote(note.id, index)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
