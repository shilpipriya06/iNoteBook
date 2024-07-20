import  noteContext from './noteContext';
import {useState} from 'react';

const NoteState= (props)=>{
   const notesInitial=[
    {
      "_id": "6698b0a6949ad4ccf1f2ae80",
      "user": "669780924a4fe24a2a3f8842",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-07-18T06:05:26.364Z",
      "__v": 0
    },
    {
      "_id": "6698b20632e4dc6796206fa84",
      "user": "669780924a4fe24a2a3f8842",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-07-18T06:11:18.077Z",
      "__v": 0
    },
    {
      "_id": "6698b20632e4dc67963206fa8",
      "user": "669780924a4fe24a2a3f8842",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-07-18T06:11:18.077Z",
      "__v": 0
    },
    {
      "_id": "6698b20632e4dc67962076fa8",
      "user": "669780924a4fe24a2a3f8842",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-07-18T06:11:18.077Z",
      "__v": 0
    },
    {
      "_id": "6698b20632e54dc67962076fa8",
      "user": "669780924a4fe24a2a3f8842",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-07-18T06:11:18.077Z",
      "__v": 0
    }
  ]
  const [notes,setNotes]=useState(notesInitial)
    return(
        <noteContext.Provider value={{notes,setNotes}}>
           {props.children}
        </noteContext.Provider>   
    )
}
export default NoteState;
