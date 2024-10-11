import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { NoteFavorite } from './favoriteNote';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { ThemeContext, themes } from "./ThemeContext";
import { ToggleTheme } from './toggleTheme';

function App() {
  const theme = themes.dark;

  const [titles, setTitle] = useState<string[]>([]);
  const noteTitles = dummyNotesList.map(note => note.title);

 const addFavorite = (favNotes: string) =>{
    setTitle([...titles, favNotes]);
  };

  const removeFavorite = (favNotes: string) =>{
    const newTitles = titles.filter(titles => titles !== favNotes);
    setTitle(newTitles);
  };

const [notes, setNotes] = useState(dummyNotesList); 
const initialNote = {
   id: -1,
   title: "",
   content: "",
   label: Label.other,
 };
const [createNote, setCreateNote] = useState(initialNote);

const createNoteHandler = (event: React.FormEvent) => {
   event.preventDefault();
   console.log("title: ", createNote.title);
   console.log("content: ", createNote.content);
   createNote.id = notes.length + 1;
   setNotes([createNote, ...notes]);
   setCreateNote(initialNote);
 };

 const deleteNote = (removedNotes:any) => {
  const noteList = notes.filter(notes=> notes != removedNotes);
  setNotes(noteList);
 };

 const [selectedNote, setSelectedNote] = useState<Note>(initialNote);


 return (
  <ThemeContext.Provider value={theme}>
   <div className='app-container'>
    
    <form className="note-form">
       <div><input 
     placeholder="Note Title"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required>
        </input></div>

       <div><textarea onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required>
        </textarea></div>

       <div>
     	<select onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label})}
       	required>
        <option value={Label.other}>Other</option>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
     	</select>
   	</div>


       <div ><button type="submit" onClick={createNoteHandler}>Create</button></div>

</form>
     <div className="notes-grid">
       {notes.map((note) => (
         <div 
           key={note.id}
           className="note-item">
           <div className="notes-header">
            <NoteFavorite
            message = {note.title}
            addFav = {addFavorite}
            removeFav = {removeFavorite}
            />
             <button onClick={()=>deleteNote(note)}>x </button>
           </div>
           <h2> {note.title} </h2>
           <p > {note.content} </p>
           <p> {note.label} </p>
         </div>
       ))}
     </div>

     <div style={{ display: 'flex', flexDirection: 'column' }}>

      <h2 > List of favorites:</h2>
      {titles.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
          <ToggleTheme/>
   </div>
       
  </ThemeContext.Provider>
 );
}

export default App;
