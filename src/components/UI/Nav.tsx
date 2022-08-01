import { Component } from 'react';
import classes from '../../css/Nav.module.css';
import { NavLink } from 'react-router-dom';



export default class Nav extends Component {
    render() {
        return (
            <header className={classes.header}>
                <nav className={classes.nav}>
                    <ul>
                        <li><NavLink to='/' className={classes.active}>Home</NavLink></li>
                    </ul>
                </nav>
            </header>
        );
    }
 }
