import React, { Component } from 'react';
import db_data from '../db/db_data.js';

class Calendar extends Component {

    days = ['Sun','Mon', 'Tue','Wen','Thu','Fri','Sat'];
    months = ['January','February','March','April','May','Jun','July','August','September','October','November','December'];

    state = {
        current_day: new Date(),        
    }

    getReservationsForDate = (d) => {
        var reservations = db_data
            .filter(r => r.date_from.getDate() === d.getDate() && r.date_from.getMonth() === d.getMonth() + 1 && r.date_from.getFullYear() === d.getFullYear())
            
        return reservations.sort((date1, date2) => {
            if (date1.date_from > date2.date_from) return 1;
            if (date1.date_from < date2.date_from) return -1;
            return 0;});
    }

    nextWeek = () => {
        var nextDate = new Date(this.state.current_day);
        console.log(nextDate);
        this.setState({ current_day: nextDate.setDate(nextDate.getDate() + 7) });
    }

    previousWeek = () => {
        var nextDate = new Date(this.state.current_day);
        this.setState({ current_day: nextDate.setDate(nextDate.getDate() - 7) });
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
                                <div className={`Day ${this.isToday(d) ? "CurrentDay" : "" }`}>
                                     {this.days[d.getDay()]} {d.getDate()}
                                    <div className="Reservations">
                                        {
                                            reservations.length !== 0 || reservations.length !== undefined ?
                                                reservations.map(r => {
                                                    return (
                                                    <div>
                                                        {r.date_from.getHours()}:{r.date_from.getMinutes() < 10 ? r.date_from.getMinutes().toString() + '0' :r.date_from.getMinutes() } 
                                                         - 
                                                        {r.date_to.getHours()}:{r.date_to.getMinutes() < 10 ? r.date_to.getMinutes().toString() + '0': r.date_to.getMinutes() } 
                                                    </div>)
                                                }) : ""
                                        }
                                    </div>
                                </div>);
                        })
                    }
                </div>
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