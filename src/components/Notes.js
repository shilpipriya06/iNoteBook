import React ,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes } = context;
  return (
    <div className="row my-3">
      <h2>Your Notes</h2>
        {notes.map((note)=>{
          return <Noteitem key={note._id} notes={note}/>

        })}
      </div>
    
  )
}

export default Notes
