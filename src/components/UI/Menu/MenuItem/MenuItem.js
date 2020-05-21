import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './MenuItem.module.css';

const menuItem = (props) => {
    return (
        <li>
            <NavLink exact to={props.to} className={classes.link} activeClassName={classes.active}>{props.text}</NavLink>
        </li>
    );
}


export default menuItem;