import React from 'react';

const day = (props)=>{

    return (
        <div className={`Day ${props.isToday ? "CurrentDay" : ""}`}>
            {props.header}
            <div className="Appointments">
                {
                        props.appointments.map(a => {
                            return (
                                <div className={`Appointment ${a.reservation_id != undefined ? "Reserved" : ""} ${a.id == props.selected_appointmentId ? "Selected" : ""}`} key={a.id} data-appointment-id={`${a.id}`} onClick={props.onSelected}>
                                    {a.date_from.getHours()}:{a.date_from.getMinutes() < 10 ? a.date_from.getMinutes().toString() + '0' : a.date_from.getMinutes()}
                                 -
                                    {a.date_to.getHours()}:{a.date_to.getMinutes() < 10 ? a.date_to.getMinutes().toString() + '0' : a.date_to.getMinutes()}
                                </div>)
                        })
                }
            </div>
        </div>);
};

export default day;