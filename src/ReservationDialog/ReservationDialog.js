import React, { Component } from 'react';
import { availableAppointments, reservations } from '../db/db_data.js';

class ReservationDialog extends Component {

    state = {
        name: "",
        email: "",
        phone: "",
    }

    makeReservation = (props) => {
        let index = reservations[reservations.length - 1].id + 1;

        reservations.push(
            {
                id: index,
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
            })

        availableAppointments.map(a => {
            if (a.id == this.props.appointmentId) {
                a.reservation_id = index;
            }

            return a;
        })

        this.closeDialogHandler();
        this.props.onReservation();
    };

    closeDialogHandler = () => {
        this.cleanFormInputs();
        this.props.onClose();
    }

    cleanFormInputs = () => {
        this.setState({
            name: "",
            email: "",
            phone: "",
        });
    }

    reservationInputChangeHandler = (e) => {
        let inputValue = e.target.value;
        let inputAttr = e.target.getAttribute("name");
        let inputUpdate = { ...this.state };
        inputUpdate[inputAttr] = inputValue;
        this.setState(inputUpdate);
    }

    createDialog = () => {
        let reservationForm = (
            <form className={`ReservationForm ${this.props.isVisible ? "" : "Hidden"}`} >
                <button className="ReservationFormClose" type="button" onClick={this.props.onClose}>X</button>
                <h3>Reservation</h3>

                <input hidden={true} name="appointment_id" value={this.props.appointmentId} readOnly ></input>

                <div>
                    <label>Date</label>
                    <div id="AppointmentDate">{this.props.date != undefined ? this.props.date : ""}</div>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input name="name" type="text" value={this.state.name} onChange={this.reservationInputChangeHandler}></input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="text" value={this.state.email} onChange={this.reservationInputChangeHandler}></input>
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input name="phone" type="text" value={this.state.phone} onChange={this.reservationInputChangeHandler}></input>
                </div>
                <button type="button" onClick={() => { this.makeReservation(this.state.input) }}>Make reservation</button>
            </form>
        );

        return reservationForm;
    }

    render = () => {

        return this.createDialog();
    }
}

export default ReservationDialog
