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

  const updateFavorite = (id: any) =>{
    const favTitle = notes[id].title;
    const notesIndex = titles.findIndex(titles=> titles === favTitle);
    titles[notesIndex] = notes[id].title;
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
  removeFavorite(removedNotes.title);
 };

 const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
 
 const updateNote = (newTitle:any,newContent:string,newLabel:any,
    id:any) => {
    selectedNote.title = newTitle;
    selectedNote.content = newContent;
    selectedNote.label = newLabel;
    selectedNote.id = id;
    const notesIndex = notes.findIndex(note => note.id === id );
    if(titles.includes(notes[notesIndex].title)){
      updateFavorite(id);
    };
    notes[notesIndex].title = selectedNote.title;
    console.log("index: ", notesIndex);
     console.log("title: ", newTitle);
  console.log("title: ", notes[notesIndex].title);
  };

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
           <h2 id = "title" contentEditable="true" 
           onInput={()=>updateNote(note.title,note.content,note.label,note.id)}> {note.title} </h2>
           <p contentEditable="true"> {note.content} </p>
           <p contentEditable="true">{note.label} </p>
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
