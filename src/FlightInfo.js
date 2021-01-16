import React from 'react';


const FlightInfo = ({flights, handleRemoveFlight})=>{
    return flights.map(flight =>{
        return (
          <div dir="rtl" key={flight.id}>
          <span> مبدا :{flight.source} </span>
          <span> \ مقصد: {flight.destination} </span>
          <span>
            <button type="button" onClick={()=> handleRemoveFlight(flight)}>
            حذف کردن
            </button>

            <br /><br />
          </span>
          </div>
        )
      })
  
  }

export default FlightInfo;
