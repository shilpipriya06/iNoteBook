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
    const json =await response.json();
    console.log(json)

    console.log("adding a new note");
    const note = {
      _id: "6698b206362e54dc67962076fa8",
      user: "669780924a4fe24a2a3f8842",
      title: "title",
      description: "description",
      tag: "tag",
      date: "2024-07-18T06:11:18.077Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
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
    const json = await response.json();
    console.log(json);

    console.log("Deleting the note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

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
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
