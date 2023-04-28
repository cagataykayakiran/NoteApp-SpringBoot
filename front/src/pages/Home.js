import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import Button from "bootstrap/js/src/button";

export default function Home() {

    const [note, setNote] = useState([])


    useEffect(  () => {
          axios.get("/notes").then(res => setNote(res.data))
    }, [])


    const deleteNote = (id, index) => {

        axios
            .delete("/delete/" + id)
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
        <div className={"container"}>
            <div className={"py-4"}>

                <table className="table border shadow">
                    <thead >
                    <tr>
                        <th scope={"col"}>#</th>
                        <th scope="col">Content</th>
                        <th scope="col">Text</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        note.map(
                            (note, index) =>
                                <tr>
                                    <td scope={"row"} key={index}>{index+1}</td>
                                    <td>{note.content}</td>
                                    <td>{note.text}</td>
                                    <td>
                                        <Link to={"/edit/" + note.id} className={"btn btn-outline-primary mx-2"}>Edit</Link>
                                        <button
                                            className={"btn btn-danger mx-2"} onClick={() => deleteNote(note.id, index)}
                                            >Delete</button>
                                    </td>

                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
