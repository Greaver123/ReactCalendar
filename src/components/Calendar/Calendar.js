import React, { Component } from 'react';
import { reservations } from '../../db/db_data';
import ReservationDialog from '../ReservationDialog/ReservationDialog.js';
import ControlsPanel from './ControlsPanel/ControlsPanel.js'
import Day from './Day/Day.js';
import './Calendar.css';

class Calendar extends Component {

    days = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
    months = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'];

    state = {
        current_day: new Date(),
        selected_appointmentId: -1,
        selected_appointment_date: '',
        reservation_dialog_visible: false,
        appointments: [],
    }

    fetchAppointments = () => {
        fetch("https://react-appointment-app-e7764.firebaseio.com/appointments.json")
            .then(response => response.json())
            .then(response => {
                // const appointments = Object.keys(response).map(key =>  )


            
                const keys = Object.keys(response);
                const values = Object.values(response);
                const appointments = keys.map((k, i) => {
                    return { id: k, ...values[i], date_from: new Date(values[i].date_from),date_to: new Date(values[i].date_to) };
                });

                console.log("FETCH APPOINTMNETS")
                console.log(appointments);
                this.setState({appointments: appointments});
            })
            .catch(error => {
                console.log(error);
            })
    }

    getAppointmentsForDate = (d) => {

        var reservations = this.state.appointments
            .filter(r => r.date_from.getDate() === d.getDate() && r.date_from.getMonth() === d.getMonth() && r.date_from.getFullYear() === d.getFullYear())

        return reservations.sort((date1, date2) => {
            if (date1.date_from > date2.date_from) return 1;
            if (date1.date_from < date2.date_from) return -1;
            return 0;
        });
    }

    getAppointmentDate = (id) => {
        let appointment = this.state.appointments.find(a => a.id == id);

        return appointment;

    }

    selectAppointmentWindow = (e) => {
        if (e.target.classList.contains("Reserved")) return;
        let appointmentId = e.target.getAttribute("data-appointment-id");
        this.setState({ selected_appointmentId: appointmentId });

        let appointment = this.getAppointmentDate(appointmentId);
        this.setState({ selected_appointment_date: appointment.date_from.toLocaleString() });

        this.setState({ reservation_dialog_visible: true });
    }

    resetSelectedAppointments = () => {
        this.setState({ selected_appointmentId: -1 });
        this.setState({ selected_appointment_date: '' });
    }

    nextWeek = () => {
        var nextDate = new Date(this.state.current_day);
        this.setState({ current_day: nextDate.setDate(nextDate.getDate() + 7) });
        this.resetSelectedAppointments();
        this.closeReservationDialogHandler();
    }

    previousWeek = () => {
        var nextDate = new Date(this.state.current_day);
        this.setState({ current_day: nextDate.setDate(nextDate.getDate() - 7) });
        this.resetSelectedAppointments();
        this.closeReservationDialogHandler();
    }

    closeReservationDialogHandler = () => {
        this.setState({ reservation_dialog_visible: false });
    }

    componentDidMount = () => {
        this.fetchAppointments();
    }

    

    renderCalendar = (startDate) => {
        let current_date = this.getMonday(startDate === undefined ? new Date() : startDate);
        let days = this.getSevenDaysFromDate(current_date);

        //TODO refactor this and move to separate class
        while (days.length < 7) {
            var callendar_day = new Date(current_date);
            days.push(callendar_day);
            current_date.setDate(current_date.getDate() + 1);
        }

        let calendar = (
            <div className="CalendarWrapper">

                <ControlsPanel previousWeek={this.previousWeek} nextWeek={this.nextWeek} currentMonth={this.months[current_date.getMonth()]} />

                <div className="Calendar">
                    {
                        days.map((d, index) => {
                            let appointments = this.getAppointmentsForDate(d);
                            let day = this.days[d.getDay()] + " " + d.getDate();
                            return (<Day
                                key={index}
                                header={day}
                                isToday={this.isToday(d)}
                                appointments={appointments}
                                selected_appointmentId={this.state.selected_appointmentId}
                                onSelected={this.selectAppointmentWindow}
                            />);
                        })
                    }
                </div>
                <ReservationDialog
                    date={this.state.selected_appointment_date}
                    appointmentId={this.state.selected_appointmentId}
                    isVisible={this.state.reservation_dialog_visible}
                    onClose={this.closeReservationDialogHandler}
                    onReservation={this.resetSelectedAppointments}
                />
            </div>
        )

        return calendar;
    }

    getSevenDaysFromDate(date) {
        let days = [];

        while (days.length < 7) {
            var callendar_day = new Date(date);
            days.push(callendar_day);
            date.setDate(date.getDate() + 1);
        }

        return days;
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