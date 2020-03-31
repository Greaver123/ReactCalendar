import React from 'react';

const controlsPanel = (props) => {
    return (
        <div className="ControlsPanel">
            <button id="btnPrevious" onClick={props.previousWeek}>Previous</button>
            <button className="CurrentMonth">
                {props.currentMonth}
            </button>
            <button id="btnNext" onClick={props.nextWeek}>Next</button>
        </div>)
}

export default controlsPanel;