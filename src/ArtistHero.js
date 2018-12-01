import React from 'react';

//create a hero image for the artist that was searched

const ArtistHero = props => {
    return (
        <div>
            <h2>{props.artistNameShown}</h2>
            <img src={props.artistPhoto} alt="" />
        </div>
        
    )
}

export default ArtistHero;