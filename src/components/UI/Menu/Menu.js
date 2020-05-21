import React from 'react';
import classes from './Menu.module.css';
import MenuItem from './MenuItem/MenuItem';

const menu = () => {
    return (
        <div className={classes.menu}>
            <ul>
                <MenuItem to="/home" text="Home" />
                <MenuItem to="/appointments" text="Appointments" />
                <MenuItem to="/appointments/create" text="Create appointment" />
                <MenuItem to="/contact" text="Contact" />
                <MenuItem to="/about" text="About" />
            </ul>
        </div>
    );
}

export default menu;