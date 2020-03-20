
export let availableAppointments= [
    {
        id:1,
        date_from: new Date(2020,3,19,8,0),
        date_to: new Date(2020,3,19,8,15),
        reservation_id: 1, 
    },
    {
        id:2,
        date_from: new Date(2020,3,19,8,15),
        date_to: new Date(2020,3,19,8,30),
        reservation_id: null, 
    },
    {
        id:3,
        date_from: new Date(2020,3,19,8,30),
        date_to: new Date(2020,3,19,8,45),
        reservation_id: null, 
    },
    {
        id:4,
        date_from: new Date(2020,3,19,8,45),
        date_to: new Date(2020,3,19,9,0),
        reservation_id: 2, 
    },
    {
        id:5,
        date_from: new Date(2020,3,19,10,0),
        date_to: new Date(2020,3,19,10,15),
        reservation_id: null, 
    }
]







export let reservations =
    [
        {
            // day: 19,
            // month: 3,
            // year: 2020,
            id: 1,
            date_from: new Date(2020,3,19,16,0),
            date_to: new Date(2020,3,19,16,15),
            // hour_from: "16:00",
            // hour_to: "16:15",
            name: "Paweł Kołodziejczyk",
            phone: "781531306",
            email: "p.kolodziej92@gmail.com"
        },
        {
            id:2,
            date_from: new Date(2020,3,19,12,0),
            date_to: new Date(2020,3,19,12,15),
            name: "Jan Kowalski",
            phone: "34324234",
            email: "kowalski@gmail.com"
        },
        {
            id:3,
            date_from: new Date(2020,3,20,16,30),
            date_to: new Date(2020,3,20,16,45),
            name: "John Doe",
            phone: "12312312",
            email: "john.doe@gmail.com"
        },
        {
            id:4,
            date_from: new Date(2020,3,20,8,30),
            date_to: new Date(2020,3,20,8,45),
            name: "John Doe",
            phone: "12312312",
            email: "john.doe@gmail.com"
        },
        {
            id:5,
            date_from: new Date(2020,3,16,18,30),
            date_to: new Date(2020,3,16,18,45),
            name: "John Doe",
            phone: "12312312",
            email: "john.doe@gmail.com"
        },
        {
            id:6,
            date_from: new Date(2020,3,13,16,30),
            date_to: new Date(2020,3,13,16,45),
            name: "John Doe",
            phone: "12312312",
            email: "john.doe@gmail.com"
        },
    ];

    export default availableAppointments;