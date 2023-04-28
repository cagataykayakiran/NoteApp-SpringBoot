import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";


function ListNote() {

    const [note, setNote] = useState([])
    useEffect(() => {
        axios.get("/notes").then(res => {
            setNote(res.data)
        })
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

    const editNote = (id) => {
        axios.put("/edit" + id + note).then(res => {
            console.log(res)
        })
    }

    return (
        <div className="container">
            <h1 className={"text-center"}>List Note</h1>
            <Link to="/save" className="btn btn-primary mb-2"> Add Note</Link>

            <table className="table table-bordered table-dark">
                <thead className={"text-center"}>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Content</th>
                    <th scope="col">Text</th>
                    <th scope="col">Edit</th>
                </tr>
                </thead>
                <tbody>
                {
                    note.map(
                        (note, index) =>
                            <tr key={note.id}>
                                <td>{note.id}</td>
                                <td>{note.content}</td>
                                <td>{note.text}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteNote(note.id, index)}
                                            style={{marginLeft: "10px"}}> Delete
                                    </button>
                                    <Link to="/edit" onClick={() => editNote(note.id)} className="btn btn-info mb-2"> Edit Note</Link>
                                </td>
                            </tr>
                    )
                }

                </tbody>
            </table>
        </div>


    );


}

export default ListNote