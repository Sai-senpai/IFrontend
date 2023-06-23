import React, {useContext,useState, useEffect}from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EmptinessMessage from './EmptinessMessage';
export default function Notes() {
  
 const [searchTag, setSearchTag] = useState("");
 const [searchTitle, setSearchTitle] = useState("");


  let navigate = useNavigate();
  // eslint-disable-next-line
  const {notes, setNotes, fetchData, removeNote} = useContext(noteContext);
  const removeNoteItem = (id)=>{
    
    removeNote(id);
    notify();
  }
  useEffect(() => {
    if(localStorage.getItem('token'))
    {

      fetchData();
    }
    else{
      navigate("/login");
    }
  });

  const notify = () =>
  toast.success(" Note deleted Successfully!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  return (
    <>
    
      <ToastContainer
      position="top-center"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <div className="search d-flex flex-wrap justify-content-between" >
    <div className="searchBar search-tag">
    <TextField
          id="standard-multiline-flexible"
          label="Search notes by tag"
          multiline
          maxRows={4}
          variant="standard"
          value={searchTag}
          onChange={(e)=> setSearchTag(e.target.value.toLowerCase())}
        />
        <IconButton aria-label="delete" onClick={()=> setSearchTag("")}>
        <HighlightOffIcon  />
        </IconButton>
        
    </div>
    <div className="searchBar search-title">
    <TextField
    id="standard-multiline-flexible"
    label="Search notes by title"
    multiline
    maxRows={4}
    variant="standard"
    value={searchTitle}
    onChange={(e)=> setSearchTitle(e.target.value.toLowerCase())}
    />
    <IconButton aria-label="delete" onClick={()=> setSearchTitle("")}>
    <HighlightOffIcon  />
    </IconButton>
    
    </div>
    </div>
    
    <div className="row">
    {

      notes
      // eslint-disable-next-line
      .filter((item)=>{
        if(item.tag.startsWith(searchTag) && item.title.toLowerCase().startsWith(searchTitle))
        {
          return item;
        }
        
      }).length?
        notes
        .filter((item) => {
          if(item.tag.startsWith(searchTag) && item.title.toLowerCase().startsWith(searchTitle))
          {
            return item;
          } return null;
        })
        .map((note)=>{
          return(
            <Noteitem key={note._id} note={note} removeNoteItem={removeNoteItem} />
          )
        }): <EmptinessMessage/>
      }
      </div>
      </>
  )
}
