import React from 'react';

//this component's job is to iterate over the array of events for the selected artist and display a list of all their events, showing date, venue and city

const ConcertList = props => {
    console.log(props)
    return (       
        <div>
            {props.allConcerts.map((concerts) => {
                return (
                    <div className="event-card">  
                        <div className="event-card-wrapper">               
                            <p>Date: {concerts.datetime}</p>
                            <p>Venue: {concerts.venue.name}</p>
                            <p>City: {concerts.venue.city}</p>
                            
                            <form onSubmit={props.handleSubmit} action="">
                                <input className="button save-button" type="submit" value="SAVE MY STUB!"/>
                            </form>
                        </div> 
                    </div>                       
                )
            })}
        </div>
    )         
}                    


export default ConcertList;
