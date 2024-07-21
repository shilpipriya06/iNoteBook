import React ,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note,updateNote } = props;
  return (
  
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h5 className="card-title">{note.title}</h5>

          <p className="card-description">{note.description}</p>
          <button className='mx-2'><i className='fa-solid fa-trash' onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success");}}></i></button>
          <button><i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i></button>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
