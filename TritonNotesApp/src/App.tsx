import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { NoteFavorite } from './favoriteNote';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { ThemeContext, themes } from "./ThemeContext";

function App() {
  const [titles, setTitle] = useState<string[]>([]);
  const noteTitles = dummyNotesList.map(note => note.title);

  //adding favorite notes
 const addFavorite = (favNotes: string) =>{
    setTitle([...titles, favNotes]);
  };

  //removing favorite notes
  const removeFavorite = (favNotes: string) =>{
    const newTitles = titles.filter(titles => titles !== favNotes);
    setTitle(newTitles);
  };

  //tried updating favorite updated titles (doesn't work)
  /*const updateFavorite = (id: any) =>{
    const favTitle = notes[id].title;
    const notesIndex = titles.findIndex(titles=> titles === favTitle);
    titles[notesIndex] = notes[id].title;
  };*/

  //toggling themes
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };
  useEffect(() => {
    document.body.style.background = currentTheme.background;
    document.body.style.color = currentTheme.foreground;
  }, [currentTheme]);

  //setting up notes
const [notes, setNotes] = useState(dummyNotesList); 
const initialNote = {
   id: -1,
   title: "",
   content: "",
   label: Label.other,
 };

 //creating notes
const [createNote, setCreateNote] = useState(initialNote);

const createNoteHandler = (event: React.FormEvent) => {
   event.preventDefault();
   console.log("title: ", createNote.title);
   console.log("content: ", createNote.content);
   createNote.id = notes.length + 1;
   setNotes([createNote, ...notes]);
   setCreateNote(initialNote);
 };

 //deleting notes
 const deleteNote = (removedNotes:any) => {
  const noteList = notes.filter(notes=> notes != removedNotes);
  setNotes(noteList);
  removeFavorite(removedNotes.title);
 };

 //selects notes
 const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

 //tried updating notes (doesn't work)
 /*const updateNote = (newTitle:any,newContent:string,newLabel:any,
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
  };*/

 return (
  //provides theme context
  <ThemeContext.Provider value={currentTheme}>
    <div> 
      <button
      style={{
        background: currentTheme.background,
        color: currentTheme.foreground,
      }}
      onClick={toggleTheme}>
      Toggle Theme
    </button>
    </div>

        {/*style theme for toggling*/}
   <div style={{
        background: currentTheme.background,
        color: currentTheme.foreground,
      }} className='app-container'>
          {/*style theme for toggling*/}
    <form 
        style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
        }} className="note-form">

      {/*style theme for toggling*/}
       <div><input
        style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
        }} 
        placeholder="Note Title" onChange={(event) => 
          setCreateNote({ ...createNote, title: event.target.value })}
        	required>
      </input></div>

      {/*style theme for toggling*/}
      <div><textarea 
        style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
        }} onChange={(event) =>
            setCreateNote({ ...createNote, content: event.target.value })}
        	  required>
      </textarea></div>

      {/*style theme for toggling*/}
       <div><select 
        style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
        }} onChange={(event) =>
         	  setCreateNote({ ...createNote, label: event.target.value as Label})}
       	    required>
        <option value={Label.other}>Other</option>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
     	</select></div>
        
      {/*style theme for toggling*/}
       <div><button 
       style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
        }}
        type="submit" onClick={createNoteHandler}>
          Create
        </button></div>
        
{/*style theme for toggling*/}
</form>
     <div 
     style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
        }}
        className="notes-grid">
       {notes.map((note) => (
         <div style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
        }}
           key={note.id}
           className="note-item">
           <div className="notes-header">
             {/*stores new values*/}
            <button
              onClick={() => setSelectedNote(note)}
                style={{
                  background: currentTheme.background,
                  color: currentTheme.foreground,
                }}>
                  Edit
            </button>
            {/*favorite notes prop*/}
            <NoteFavorite
            message = {note.title}
            addFav = {addFavorite}
            removeFav = {removeFavorite}
            />

            {/*style theme for toggling*/}
          <button 
            style={{
              background: currentTheme.background,
              color: currentTheme.foreground,
            }} onClick={()=>deleteNote(note)}>x </button>
    </div>
    {/*style theme for toggling*/}
        <h2 style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
        }}  contentEditable={note === selectedNote}> {note.title} </h2>
        
        {/*style theme for toggling*/}
        <p style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
          }} contentEditable={note === selectedNote}> {note.content} </p>
        
        {/*style theme for toggling*/}
        <p style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
          }} contentEditable={note === selectedNote}>{note.label} </p>
    </div>
  ))}
</div>

{/*puts titles in a column*/}
<div style={{ display: 'flex', flexDirection: 'column' }}>
{/*style theme for toggling*/}
  <h2 style={{
    background: currentTheme.background,
    color: currentTheme.foreground,
  }}> List of favorites:
  </h2>
  {/*goes through the list of favorite notes*/}
  {titles.map((item, index) => (
    <div key={index}>{item}</div>
  ))}
  </div>
</div>   
  </ThemeContext.Provider>
 );
}

export default App;
