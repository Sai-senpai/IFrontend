import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import { Button, Modal } from "react-bootstrap";

import "react-toastify/dist/ReactToastify.css";
import {  toast } from "react-toastify";







export default function Noteitem(props) {
  const {  updateNote } = useContext(noteContext);
  const [bounce, setBounce] = useState("");

  const { note, removeNoteItem } = props;
  const handleDelete =  () => {
    setBounce("fa-flip");
    // console.log(note._id)
    setTimeout(() => {
      removeNoteItem(note._id);
    }, 1000);
  };
  
  //Modal
  const [showModal, setShowModal] = useState(false);
  const [editTitle, seteditTitle] = useState("");
  const [editDescription, seteditDescription] = useState("");
  const [editTag, seteditTag] = useState("");


  const updateSuccess = () =>
  toast.success(" Note updated Successfully!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const updateErrorToast = (error) =>
  toast.error(`Error Updating!${error}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });







  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target.name === "tag") {
      seteditTag(e.target.value);
    }
    if (e.target.name === "title") {
      seteditTitle(e.target.value);
    }
    if (e.target.name === "description") {
      seteditDescription(e.target.value);
    }
  };












  const handleSubmit = async () => {
    //Update the note
    if(editTitle.length<3)
    {
      updateErrorToast(`Title length must be atleast 3`);
    handleClose();

      return;
    }
    
    const update = await updateNote(note._id, editTitle, editDescription, editTag);
    seteditTitle("");
    seteditDescription("");
    seteditTag("");
    // console.log(update);
    // Close the modal
    handleClose();
    if(update === "can't update") {
      updateErrorToast("Make sure to fill the fields");
      
      return;
    }
    updateSuccess();
   

  };
  return (
    <>
    
    
  
<div className="col-sm-4 d-flex my-2">
<div className="card flex-grow-1" style={{ width: "18rem" }}>
  <div className="card-body">
    <h5 className="card-title" style={{ position: "sticky" }}>
      {note.title}
    </h5>
    <p
      className="card-text"
      style={{ maxHeight: "190px", overflow: "auto" }}
    >
      {note.description}
    </p>
    
    <div>
      <i
        className="fa-solid fa-pen-to-square my-2"
        onClick={handleClick}
      ></i>
      <i
        className={`fa-solid fa-trash-can ${bounce} mx-2 my-2`}
        style={{
          right: 0,
        }}
        onClick={handleDelete}
      ></i>
      
    </div>
    
  </div>
  
</div>

</div>

      {
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit the note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editTitle}
                  onChange={handleInputChange}
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Description</label>
                <input
                  type="text"
                  name="description"
                  value={editDescription}
                  onChange={handleInputChange}
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Description"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Tag</label>
                <input
                  name="tag"
                  type="text"
                  value={editTag}
                  onChange={handleInputChange}
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Tag"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </>
  );
}
