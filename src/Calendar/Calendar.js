import React, { Component } from 'react';
import { availableAppointments, reservations } from '../db/db_data.js';

class Calendar extends Component {

    days = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
    months = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'];

    state = {
        current_day: new Date(),
        selected_appointmentId: undefined,
        selected_appointment_date: undefined,
    }

    getReservationsForDate = (d) => {
        var reservations = availableAppointments
            .filter(r => r.date_from.getDate() === d.getDate() && r.date_from.getMonth() === d.getMonth() + 1 && r.date_from.getFullYear() === d.getFullYear())

        return reservations.sort((date1, date2) => {
            if (date1.date_from > date2.date_from) return 1;
            if (date1.date_from < date2.date_from) return -1;
            return 0;
        });
    }

    getAppointmentDate = (id) => {
        let appointment = availableAppointments.find(a => a.id == id);

        return appointment;

    }

    selectAppointmentWindow = (e) => {
        if(e.target.classList.contains("Reserved")) return;
        let appointmentId = e.target.getAttribute("data-appointment-id");
        this.setState({ selected_appointmentId: appointmentId });
       
        let appointment = this.getAppointmentDate(appointmentId);
        this.setState({ selected_appointment_date: appointment.date_from.toLocaleString() });
        // change element style to show that its reserved
    }

    restSelectedAppointments = () => {
        this.setState({selected_appointmentId: undefined});
        this.setState({selected_appointment_date: undefined});
    }

    nextWeek = () => {
        var nextDate = new Date(this.state.current_day);
        this.setState({ current_day: nextDate.setDate(nextDate.getDate() + 7) });
        this.restSelectedAppointments();
    }

    previousWeek = () => {
        var nextDate = new Date(this.state.current_day);
        this.setState({ current_day: nextDate.setDate(nextDate.getDate() - 7) });
        this.restSelectedAppointments();
    }



    renderCalendar = (startDate) => {
        let current_date = this.getMonday(startDate === undefined ? new Date() : startDate);
        let days = [];

        while (days.length < 7) {
            var callendar_day = new Date(current_date);
            days.push(callendar_day);
            current_date.setDate(current_date.getDate() + 1);
        }

        let calendar = (
            <div className="CalendarWrapper">
                <div className="CalendarControls">
                    <button id="btnPrevious" onClick={this.previousWeek}>Previous</button>
                    <button className="CurrentMonth">
                        {this.months[current_date.getMonth()]}
                    </button>
                    <button id="btnNext" onClick={this.nextWeek}>Next</button>
                </div>

                <div className="Calendar">
                    {
                        days.map(d => {
                            let reservations = this.getReservationsForDate(d);

                            return (
                                <div className={`Day ${this.isToday(d) ? "CurrentDay" : ""}`}>
                                    {this.days[d.getDay()]} {d.getDate()}
                                    <div className="Reservations">
                                        {
                                            reservations.length !== 0 || reservations.length !== undefined ?
                                                reservations.map(a => {
                                                    return (
                                                        <div className={`AppointmentSlot ${a.reservation_id != undefined ? "Reserved": ""} ${a.id == this.state.selected_appointmentId ? "Selected": ""}`} data-appointment-id={`${a.id}`} onClick={this.selectAppointmentWindow}>
                                                            {a.date_from.getHours()}:{a.date_from.getMinutes() < 10 ? a.date_from.getMinutes().toString() + '0' : a.date_from.getMinutes()}
                                                         -
                                                            {a.date_to.getHours()}:{a.date_to.getMinutes() < 10 ? a.date_to.getMinutes().toString() + '0' : a.date_to.getMinutes()}
                                                        </div>)
                                                }) : ""
                                        }
                                    </div>
                                </div>);
                        })
                    }
                </div>

                    
                    <form className={`ReservationForm ${this.state.selected_appointmentId == undefined ? "Hidden" : ""}`} >
                        <button className="ReservationFormClose" type="button" onClick={this.restSelectedAppointments}>X</button>
                        <h3>Reservation</h3>

                        <input hidden={true} name="appointment_id" value={this.state.selected_appointmentId}></input>

                        <div>
                            <label for="selectedDate">Date</label>
                            <div id="selectedAppointmentDate">{this.state.selected_appointment_date != undefined ? this.state.selected_appointment_date : ""}</div>
                        </div>
                        <div>
                            <label for="name">Name</label>
                            <input name="name" type="text"></input>
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input name="email" type="text"></input>
                        </div>
                        <div>
                            <label for="phone">Phone</label>
                            <input name="phone" type="text" ></input>
                        </div>
                        <button type="button">Make reservation</button>
                    </form>

            </div>
        )

        return calendar;
    }

    getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    }

    isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }

    render = () => {
        return (
            <div>
                {this.renderCalendar(this.state.current_day)}
            </div>
        );
    }
}

export default Calendar;