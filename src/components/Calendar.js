import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Loading from './Loading';

export default function Calendar() {

    const [trainings, setTrainings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => fetchTrainings(), [])
    
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(res => res.json())
        .then(data => {
          setTrainings(data)
          setLoading(false)
        })
        .catch(err => console.error(err))
    }

    while (loading) {
      return <Loading />
    } 

    

    return (
        <>
         <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          events={trainings}
          eventContent={(params) =>  (
            <>
              <p>{params.event.timeText}</p>
              <p>{params.event._def.extendedProps.activity} with {params.event._def.extendedProps.customer.firstname} {params.event._def.extendedProps.customer.lastname}</p>
            </>
          )}
      />
        </>
    )
}