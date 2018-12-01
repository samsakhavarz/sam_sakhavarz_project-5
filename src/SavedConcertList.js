import React from 'react';

//this component's job is to iterate over the array of saved concerts and display them, showing date, venue and city

const SavedConcertList = props => {
    console.log(props)
    return (
        <div>
            {props.savedConcerts.map((concerts) => {
                return (
                    <div className="event-card">
                        <div className="event-card-wrapper">
                            <h2>{props.artistNameShown}</h2>
                            <p>Date: {concerts.datetime}</p>
                            <p>Venue: {concerts.venue.name}</p>
                            <p>City: {concerts.venue.city}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}          






export default SavedConcertList;