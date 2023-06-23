// eslint-disable-next-line
import react, {useState} from "react";
import NoteContext from "./NoteContext";
const NoteState = (props)=>{
    let data =[
      {
        createdAt: "2023-06-14T05:41:08.516Z",
        description: "worst anime i've ever watched",
        tag: "crap",
        title: "akame ga kill",
        user: "6486b29b3e096537850e5a21",
        __v: 0,
        _id: "648952f4956ec3e1b5add593"
      }
    ]
    const [notes, setNotes] = useState(data);

    const fetchData = async () => {
      
      try {
      

        const server = "https://i-backend.vercel.app"
        const response = await fetch(`${server}/notes/fetchallnotes`,{
          method: 'GET', // Set the HTTP method here
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header here
            
            'auth-token' : localStorage.getItem('token')

          }
          // body: JSON.stringify({ key: 'value' }), // Set the request body here
        }
        );
      
        if (!response.ok) {
          console.log('error');
        }
        const data1 = await response.json();
      // console.log(data1); //works fine
      setNotes(data1);

        // data=data1;
      } catch (error) {
        console.log('Error:');
      }
    };
   
    const addNote = async (title,description,tag) =>{
     
            try {
              const server = "https://i-backend.vercel.app"
        const response = await fetch(`${server}/notes/createnote`,{
          method: 'POST', // Set the HTTP method here
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header here
            
            'auth-token' : localStorage.getItem('token')

          },
          body: JSON.stringify(
            { 'title': title,
               'description': description,
               'tag': tag
         }), // Set the request body here
        }
        );
        fetchData();
        
      
        if (!response.ok) {
          console.log('error');
        }
            } catch (error) {
              console.log('error adding note'+error)
            }

    }
    //Arrow Function to delete a note
    const removeNote =async (id)=>{
      
      
            try {
              const server = "https://i-backend.vercel.app"
        const response = await fetch(`${server}/notes/deletenote/${id}`,{
          method: 'DELETE', // Set the HTTP method here
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header here
            
            'auth-token' : localStorage.getItem('token')

          }
          // body: JSON.stringify({ key: 'value' }), // Set the request body here
        }
        );
        fetchData();
        
      
        if (!response.ok) {
          console.log('error');
        }
              
            } catch (error) {
              console.log('error deleting note'+error)
            }

      };
      //Arrow function to edit a note
      const updateNote= async (id,title,description,tag)=>{
        
            //Whatever did above was only in front-end, database was not included

            if(title==="" && description==="" && tag ==="") return "can't update"
            try {
              const server = "https://i-backend.vercel.app"
              const response = await fetch(`${server}/notes/updatenote/${id}`,{
                method: 'PATCH', // Set the HTTP method here
                headers: {
                  'Content-Type': 'application/json', // Set the Content-Type header here
                  
                  'auth-token' : localStorage.getItem('token')

                },
                body: JSON.stringify(
                  { 'title': title,
                     'description': description,
                     'tag': tag
               }), // Set the request body here
              }
              );
              fetchData();
              if (!response.ok) {
                console.log('error');
                return "error"
              }
              else{

                return "update success"
              }
              
            } catch (error) {
              console.log('error updating note ' + error)
            }
          }

    return(
        <NoteContext.Provider value={{notes, setNotes, addNote,removeNote,updateNote,fetchData}}>
        {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;