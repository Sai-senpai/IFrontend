import React, {useContext} from 'react'
import noteContext from '../context/notes/NoteContext'

export default function Contact() {
  // eslint-disable-next-line
  const a = useContext(noteContext);

  return (
    <div>
      Contact 
    </div>
  )
}
