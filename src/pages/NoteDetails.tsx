import { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from "react-router";
import  { useHistory } from 'react-router-dom'
import classes from '../css/Notes.module.css';
import style from '../css/NewNote.module.css';
import {NotesContext} from '../store/notes.context';
import Note from "../models/Note.class";



const NoteDetails:React.FC = () => {

    const params:any = useParams(); // url param
    const history = useHistory(); 

    const noteInputRef = useRef<HTMLInputElement>(null);
    const statusInputRef = useRef<HTMLInputElement>(null); 
    
    const [note, setNote] = useState<Note>();   
    const notesCtx = useContext(NotesContext);


    // Call at firt render to get new state / call api
    useEffect(() => {
        // Async wrapper
        (async() => {
            // Get the notes[]
            const response = await notesCtx.getNote(params.noteId);
            // Set new note state
            setNote(() => {
                return response;
            });
        })();
    // eslint-disable-next-line
    }, []);


    // Delete note
    const removeNoteHandler = (event:React.FormEvent) => {
        // Prevent browser reload
        event.preventDefault();
        
        // Remove HTML element from DOM 
        event.currentTarget.remove();

        // Call context/api to remove from state and backend 
        notesCtx.removeNote(params.noteId);

        // Set new note state to undefined
        setNote(() => {
            return undefined;
        });

        // Redirect user to home page
        return history.push('/') 
    };


    // Form submit
    const submitHandler = (event:React.FormEvent) => {

        // Prevent browser reload
        event.preventDefault();

        // Get ref from form at submit 
        const enteredNote = noteInputRef.current!.value;
        const enteredStatus = statusInputRef.current!.value;

        // Safe check
        if (enteredNote.trim().length === 0) {
            return;
        }

        if (enteredStatus.trim().length === 0 ) {
            return;
        }

        // Call context/api to update state and backend 
        notesCtx.updateNote(params.noteId, enteredNote, enteredStatus);
        
        // Set new state
        setNote(() => {
            return new Note(params.noteId, enteredNote, enteredStatus);
        });
    };
    

    return(
        <>
            <form onSubmit={submitHandler} className={style.form}>
                <h1>Modify Note</h1>
                <br />
                <label htmlFor='text'>Note</label> 
                <input id='text' type='text' ref={noteInputRef}/>
                <label htmlFor='status'>Status</label> 
                <input id='status' type='string' ref={statusInputRef}/>
                <button>Modify Note</button>
            </form>

            <ul className={classes.notes}>
                <li className={classes.item} onClick={removeNoteHandler}>
                    {note?.note} - {note?.status}
                    <button className={classes.itemButton}>Delete</button>
                </li>
            </ul>
        </>

    );
}




export default NoteDetails;