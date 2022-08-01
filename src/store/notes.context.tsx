import { useState, createContext } from 'react';
import Note from '../models/Note.class';
import noteApi from '../store/notesApi.service';



type NotesCtxType = {
    items: Note[],
    getAllNotes: () => void, 
    addNote: (note:string, status:string) => void,
    getNote: (id:string) => any, 
    updateNote: (id: string, note: string, status:string) => {},
    removeNote: (id: string) => void
};

export const NotesContext = createContext<NotesCtxType>({
    items:[],
    getAllNotes: () => {}, 
    addNote : () => {},
    getNote: (id:string) => {}, 
    updateNote: (id: string, note: string, status:string) => Note,
    removeNote: (id: string) => {}
}); 



const NotesContextProvider: React.FC = (props) => {
    
    // Notes[] state
    const [notes, setNotes] = useState<Note[]>([]);


    // GET ALL NOTE 
    const getAllNotes = async ():Promise<void> => {

        // Call API
        const response = await noteApi.getAllNotes();

        // Safe check
        if(!response.success) {
            throw new Error('Could not get notes');
        }

        // Sort notes by dates
        const notesList = response.data.sort((a:any, b:any) => {
            const dateA = new Date(a.updatedAt).getTime();
            const dateB = new Date(b.updatedAt).getTime();
            return dateB - dateA;
        });

        // Set new note state
        setNotes(() => {
            return notesList;
        });
    };


    // ADD NOTE 
    const addNoteHandler = async (note:string, status:string):Promise<void> => {

        // Call API
        const response = await noteApi.createNote(note, status);

        // Safe check
        if(!response.success) {
            throw new Error('Could not create note');
        }

        // Build a new note instance from class model
        const newNote = new Note(response.data._id, response.data?.note, response.data?.status);

        // Set new state
        setNotes((prevNotes) => {

            // Add to start
            prevNotes.unshift(newNote);
            
            // Return a copy of previous state
            return [...prevNotes];
        });
    };


    // GET ONE
    const getNoteHandler = async (noteId:string) => {
        return notes.find( note => note._id === noteId);
    }


    // UPDATE ONE 
    const updateNoteHandler = async (noteId:string, note:string, status:string) => {

        // Call API
        const response = await noteApi.updateNote(noteId, note, status);

        // Safe check
        if(!response.success) {
            throw new Error('Could not update note');
        }
        
        // Set new state
        setNotes((prevNotes) => {
            
            // Find note index
            const index = prevNotes.indexOf(response.data._id);

            // Replace with new note
            return [...prevNotes.splice(index, 1, response.data)];
        });
    }


    // DELETE
    const removeNoteHandler = async (noteId:string) => {

        // Call API
        const response = await noteApi.deleteNote(noteId);

        // Safe check
        if(!response.success) {
            throw new Error('Could not delete note');
        }

        // Set new state 
        setNotes((prevNotes) => {
            // Remove note 
            return prevNotes.filter( note => note._id !== noteId);
        });
    };



    const contextValue: NotesCtxType = {
        items: notes,
        getAllNotes: getAllNotes, 
        addNote: addNoteHandler,
        getNote: getNoteHandler,
        updateNote: updateNoteHandler,
        removeNote: removeNoteHandler 
    };


    return (
        <NotesContext.Provider value={contextValue}>
            {props.children}
        </NotesContext.Provider> 
    )
};




export default NotesContextProvider;