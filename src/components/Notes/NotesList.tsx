import { useContext, useEffect } from 'react';
import {NotesContext} from '../../store/notes.context';
import classes from '../../css/Notes.module.css';
import NoteItem from './NoteItem';
 


const NotesList: React.FC = () => {
    
    const notesCtx = useContext(NotesContext);

    // Get Notes[] from context
    useEffect(() => {
        notesCtx.getAllNotes();
        // eslint-disable-next-line
    }, []);

    
    return (
        <ul className={classes.notes}>
            {notesCtx.items.map(item => (
                <NoteItem 
                    key={item._id} 
                    id={item._id}
                    note={item.note} 
                    status={item.status}
                />
            ))}
        </ul>
    )
}




export default NotesList;