import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Notes from "./Notes";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const notifyAdd = () =>
    toast.success(" Note Added Successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyAddErrorTitle = () =>
    toast.error("Can't add note. The title length should be atleast 5", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const notifyAddErrorDesc = () =>
    toast.error("Can't add note. The description length should be atleast 5", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleClick = (e) => {
    e.preventDefault();
    if (title.length < 3) {
      notifyAddErrorTitle();
      return;
    }
    if (description.length < 5) {
      notifyAddErrorDesc();
      return;
    }
    if (!tag) {
      addNote(title, description, "general");
    } else {
      let tag1 = tag.toLowerCase();

      addNote(title, description, tag1);
    }
    console.log("clicked");
    setTitle("");
    setTag("");
    setDescription("");
    notifyAdd();
  };

  // eslint-disable-next-line
  const { notes, setNotes, addNote } = useContext(noteContext);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  const [description, setDescription] = useState("");
  const handleChange = (e) => {
    // console.log(e.target.value)

    if (e.target.name === "title") {
      // console.log('inside title');
      setTitle(e.target.value);
    }
    if (e.target.name === "description") {
      // console.log('inside description');
      setDescription(e.target.value);
    }
    if (e.target.name === "tag") {
      // console.log('inside description');
      setTag(e.target.value);
    }
  };
  return (
    <div>
      <div className="container my-3">
        <h1>Add a note</h1>
        <form>
          <div className="form-group my-2">
            <TextField
              fullWidth
              label="Title"
              id="fullWidth"
              required
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-2">
            
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={3}
              name="description"
              onChange={handleChange}
              value={description}
              required
            />
          </div>
          <div className="form-group my-2" >
           
            <TextField id="standard-basic" label="Tag" variant="standard"
            name="tag"
            onChange={handleChange}
            value={tag}
             />
          </div>
          <div className="form-check"></div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
      <div className="container">
        <h1>Your notes</h1>
        <Notes />
      </div>
    </div>
  );
}
