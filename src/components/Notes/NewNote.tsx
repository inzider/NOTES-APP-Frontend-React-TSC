import { useRef, useContext } from "react";
import classes from '../../css/NewNote.module.css';
import { NotesContext } from "../../store/notes.context";


const NewNote:React.FC = () => {
    
    const noteInputRef = useRef<HTMLInputElement>(null);
    const statusInputRef = useRef<HTMLInputElement>(null); 
    const notesCtx = useContext(NotesContext);
    

    // Form submit
    const submitHandler = (event:React.FormEvent) => {
        
        // Prevent browset reload
        event.preventDefault();

        // Get value from form
        const enteredNote = noteInputRef.current!.value;
        const enteredStatus = statusInputRef.current!.value;

        // Safe check
        if (enteredNote.trim().length === 0) {
            return;
        }

        if (enteredStatus.trim().length === 0 ) {
            return;
        }
        // Add note to state
        notesCtx.addNote(enteredNote, enteredStatus);
    }; 


    return(<>
            <form onSubmit={submitHandler} className={classes.form}>
                <h1>Add Note</h1>
                <label htmlFor='text'>Note</label> 
                <input id='text' type='text' ref={noteInputRef}/>
                <label htmlFor='status'>Status</label> 
                <input id='status' type='string' ref={statusInputRef}/>
                <button>Add Note</button>
            </form>
    
        </>
    )
};


export default NewNote;