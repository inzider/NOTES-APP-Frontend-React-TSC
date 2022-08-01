import { Route, Switch, } from 'react-router-dom';
import NotesContextProvider from './store/notes.context';

import Nav from './components/UI/Nav';
import Home from './pages/Home';
import NoteDetails from './pages/NoteDetails';



function App() {

    return (
        <NotesContextProvider >
            <Nav />
            <Switch>
                
                <Route path='/:noteId' exact>
                    <NoteDetails />
                    {/* <Details /> */}
                </Route>

                <Route path='/'>
                    <Home />
                </Route>

            </Switch>
        </NotesContextProvider>
    );
}




export default App;