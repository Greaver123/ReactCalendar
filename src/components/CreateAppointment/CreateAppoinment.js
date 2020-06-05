import React, { Component } from 'react';
import classes from './CreateAppointment.module.css';
import { availableAppointments, reservations } from '../../db/db_data.js';

class CreateAppointment extends Component {

    state = {
        date: new Date(),
        availableSlots: [],
        dateInputFormat: null,
        selectedTime: -1,
        appointmentTimeSpan: 15,
    }


    getAvaiableSlotsForDate = (date) => {

        date.setMilliseconds(0);

        let timespan = 15; //appoinment minutes;
        let startDate = new Date(date);
        startDate.setHours(7, 0, 0);

        let endDate = new Date(date);
        endDate.setHours(22, 0, 0);

        let currentDate = new Date(startDate);

        const dropdownOptions = [<option value={-1} key={-1}>Select Time</option>];

        while (currentDate <= endDate) {

            let appointment = availableAppointments.find(a => {
                return currentDate.getTime() >= a.date_from.getTime() && currentDate.getTime() < a.date_to.getTime();
            });

            if (appointment === undefined) {
                const hours = (currentDate.getHours() < 10 ? "0" + currentDate.getHours() : currentDate.getHours());
                const minutes = (currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes());

                let option = <option value={currentDate.getTime()} key={currentDate.getTime()}>{hours + ":" + minutes}</option>
                dropdownOptions.push(option)
            }
            else {
                console.log("OCCUPIED");
            }

            currentDate.setMinutes(currentDate.getMinutes() + timespan);
        }

        return dropdownOptions;
    }


    getDateFormat = (date) => {

        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth();
        const year = date.getFullYear();

        const dateInputFormat = `${year}-${month}-${day}`;

        return dateInputFormat;
    }


    selectTimeHandler = (event) => {

        console.log("Value: ", event.target.value);

        const date = new Date();
        date.setTime(event.target.value);
        console.log(date);
        this.setState({ selectedTime: event.target.value });
    }

    createAppointment = (e) => {
        //TODO 
        e.preventDefault();

        const dateFrom = new Date();
        dateFrom.setTime(this.state.selectedTime);

        const dateTo = new Date(dateFrom);
        dateTo.setMinutes(dateTo.getMinutes() + this.state.appointmentTimeSpan);

        const appointment = {
            date_from: dateFrom.getTime(),
            date_to: dateTo.getTime(),
            reservation_id: null,
        };

        console.log("APPOINTMENT");
        console.log(appointment);

        fetch("https://react-appointment-app-e7764.firebaseio.com/appointments.json",
            {
                method: "POST",
                body: JSON.stringify(appointment),
                headers: {
                    'Content-Type': 'applicaton/json'
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    getLastAppointmentId = () => {
        availableAppointments.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            else if (a.id > b.id) {
                return 1;
            }
            else {
                return 0;
            }
        })

        return availableAppointments[availableAppointments.length - 1].id;

    }



    //Only create appointment for current and future dates,
    // check if there any appoinmtents defined already
    // show only available slots 
    render = () => {

        const dateInputFormat = this.getDateFormat(this.state.date);
        const options = this.getAvaiableSlotsForDate(new Date());

        return (
            <div className={classes.createAppointment}>
                <form>
                    <div>
                        <label htmlFor="date">Date: </label>
                        <input name="date" type="date" value={dateInputFormat} onChange={() => { }} min={dateInputFormat} />
                    </div>

                    <div>
                        <label htmlFor="hour">Hour</label>
                        <select name="hour" onChange={this.selectTimeHandler} >
                            {options}
                        </select>
                    </div>

                    <div>
                        <button type="submit" onClick={this.createAppointment}>Create</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateAppointment;