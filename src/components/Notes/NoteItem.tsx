import {Link} from 'react-router-dom';
import classes from '../../css/Notes.module.css';



const NoteItem: React.FC<{id: string, note:string, status:string}> = (props) => {
    return (
        <li className={classes.item}>
            <Link to={'/'+ props.id}>
                {props.note} - {props.status}
            </Link>
        </li>
    )
};




export default NoteItem;