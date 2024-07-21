import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes function.......
  const getNotes = async () => {
    // todo api call
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "appliaction/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzgwOTI0YTRmZTI0YTJhM2Y4ODQyIn0sImlhdCI6MTcyMTIwNDg4NX0.KR_JW_btqzK8RwpvFZm1PNBKFXj9QCdfhB-19Xv51xQ",
      },
    });
     const json = await response.json();
     console.log(json);
     setNotes(json);
    }



  //Add note function.....
  const addNote = async (title, description, tag) => {
    // todo api call
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "appliaction/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzgwOTI0YTRmZTI0YTJhM2Y4ODQyIn0sImlhdCI6MTcyMTIwNDg4NX0.KR_JW_btqzK8RwpvFZm1PNBKFXj9QCdfhB-19Xv51xQ",
      },
      body: JSON.stringify(title, description, tag),
    });
    const note =await response.json();
    setNotes(notes.concat(note))
    
  }
  
  //Edit note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "appliaction/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzgwOTI0YTRmZTI0YTJhM2Y4ODQyIn0sImlhdCI6MTcyMTIwNDg4NX0.KR_JW_btqzK8RwpvFZm1PNBKFXj9QCdfhB-19Xv51xQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes);
  };

  //Delete Note
  const deleteNote = async(id) => {
    //TODO:API call backend se v delete krna h
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "appliaction/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzgwOTI0YTRmZTI0YTJhM2Y4ODQyIn0sImlhdCI6MTcyMTIwNDg4NX0.KR_JW_btqzK8RwpvFZm1PNBKFXj9QCdfhB-19Xv51xQ",
      },
    });
    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;
