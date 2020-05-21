import React from 'react';
import classes from './Layout.module.css';
import Menu from '../../components/UI/Menu/Menu';
const layout = (props) => {
    return (
        <div>
            <Menu />

            <div className={classes.content}>{props.children}</div>

            <div className="Footer"></div>
        </div>
    )
}

export default layout;