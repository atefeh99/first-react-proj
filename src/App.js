import React,{useState, useEffect, useReducer} from 'react';
import FlightInfo from './FlightInfo';
import Search from './search';


const flights_info= [
  {
    id:1,
    source:'ایران',
    destination:'استانبول',
    ftime:'20:14'
  },
  {
    id:2,
    source:'عراق',
    destination:'افغانستان',
    ftime:'20:15'
  },
  {
    id:3,
    source:'کشمیر',
    destination:'پاکستان',
    ftime:'20:17'
  }
]

/* the logic in switch could be more complex and change the state type but here is just returning the payload*/
const flightsReducer = (state, action)=>{
  switch(action.type){
    case 'SET_FLIGHTS':
      return action.payload;
    case 'REMOVE_FLIGHTS':
      return state.filter(//return the values that should be remain
        flight => action.payload.id !== flight.id //return true for the item should be remain return false for which should be skipped
      )
    default:
    throw new Error();
  }
};



const App = () => {
  // const [flights,setFlights] = useState([]);

  const [flights, dispatchFlights] = useReducer(
    flightsReducer,
    []
  )

  const [searchText,setSearchText] = useState(
    localStorage.getItem('searchText') || '');//JS GET API

    /* by this state our user will be aware the delay is just because of loading data*/
  const [isLoading,setIsLoading] = useState(false);

  const handleSearchInputChange = event=>{
    setSearchText(event.target.value);
    // localStorage.setItem('searchText', event.target.value);//JS SET API
  }

  const handleRemoveFlight = flight =>{
    dispatchFlights({
      type: 'REMOVE_FLIGHTS',
      payload: flight
    });
  }

  /* we simulate a delay because data from the database always has a dely.so a promise should resolved after a timeout and assign an array to
  flights(here flights is the result of the promise not our state) */
  const getFlightsAsync = () =>
    new Promise(resolve =>
      setTimeout(
        ()=> resolve({flights: flights_info}),
        2000
      )
    );

/* we call a function everytime our website has been refreshed and wait for the result of the promise(by then). then set the state */
  useEffect(()=>{
    setIsLoading(true);//start loading data
    getFlightsAsync().then(result =>{
      // setFlights(result.flights) 

      dispatchFlights({
        type: 'SET_FLIGHTS',
        payload: result.flights 
      });
      setIsLoading(false)//data is not in progress
    })
  },[]);

  useEffect (()=>{/*in order not to update localStorage every place that I change the State.
    updating localStorage is a sideEffect for update the state so useEffect write once and executes many times*/
    localStorage.setItem('searchText',searchText);//first parameter could be anything you want but 2nd one is the state name.this like a(key,value)
  },[searchText])
  /*second paramether/s are dependent variable/s(it could be an array). if the array be empty means you want to execute this func
  one time and this func is for initializing something at the time app starts. . searchText is our State name*/


  const filteredFlights = flights.filter(flight =>{
      return flight.source.includes(searchText) || flight.destination.includes(searchText)
    });
  

  const handleSearchInputKeyPress = event =>{
    if (event.key === 'Enter'){
      console.log("enter key pressed! search value: " +event.target.value);
    }
  }

  function getAge(){
    return '21';
  }

  const greeting = 'سلام بچه ها';

  const info={
    fname:'محبوبه',
    lname:'شیری'
  };
  
  return (
    <div dir="rtl">
      <h1 >{greeting}</h1>
      <p >من {info.fname} {info.lname} هستم</p>
      <p >من {getAge()} سال دارم.</p>
      <Search value={searchText} onSearch={handleSearchInputChange} onKeyPress={handleSearchInputKeyPress}/>
      <p  >پرواز های من شامل شهر های زیر است:</p>
      <hr/>
      {isLoading ? (
        <p>لطفا کمی صبر کنید  ...</p>
      ):(
        <FlightInfo flights={filteredFlights} handleRemoveFlight={handleRemoveFlight} />
      )}
      
      <br /><hr />
      <FlightTimes flights={flights} />
    </div>
  );
}

const FlightTimes = ({flights}) =>{
  return flights.map(flight =>{
      return(
      <div dir="rtl" key={flight.id}>
          <span>زمان پرواز شماره {flight.id} : {flight.ftime}</span>
      </div>
      );
      
  })
}

export default App;
