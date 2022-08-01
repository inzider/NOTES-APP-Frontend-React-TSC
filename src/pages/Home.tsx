import { Component } from 'react';
import NewNote from '../components/Notes/NewNote';
import NotesList from '../components/Notes/NotesList';



export default class Home extends Component {
    render() {
        return(
            <>
                <NewNote />
                <NotesList />
            </>
        );
    }
}