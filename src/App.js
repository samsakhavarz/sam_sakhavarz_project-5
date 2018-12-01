import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Qs from 'qs';
import ConcertList from './ConcertList';
import ArtistHero from './ArtistHero';

//PSEUDOCODE
//get user's input from the search box and return relevant search results from API
//clear the form
//let user select an event and save it to their personal collection
//let user input custom text information into their saved entries


//importing fully configured firebase object from module created:
import firebase from './firebase';
//reference to the root of the database:
const dbRef = firebase.database().ref();








class App extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      artistOrBand: '',
      allConcerts: [],
      artistNameShown: '',
      artistPhoto: '',
      savedConcerts: [],
    };
  }

  

handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };


// handleSubmit



getConcerts = () => {    
    axios({
      url: 'http://proxy.hackeryou.com',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        reqUrl: `https://rest.bandsintown.com/artists/${this.state.searchInput}`,       
        params: {         
          app_id: '210240c13b1d0a54d0bf088a54c5b4f6',
        },
        xmlToJSON: false
      }
    }).then((res) => {
      console.log(res.data, 'artist');


      this.setState({
        artistPhoto: res.data.image_url,
        artistNameShown: res.data.name,
      });

      axios({
        url: 'http://proxy.hackeryou.com',
        dataResponse: 'json',
        paramsSerializer: function (params) {
          return Qs.stringify(params, { arrayFormat: 'brackets' })
        },
        params: {
          reqUrl: `https://rest.bandsintown.com/artists/${this.state.searchInput}/events`,
          params: {
            app_id: '210240c13b1d0a54d0bf088a54c5b4f6',
            date: 'all'
          },
          xmlToJSON: false
        }
      }).then((res) => {
        this.setState({
          allConcerts: res.data //setting the state for all events
        });
        console.log(res.data, 'events');
      })     
    });
  }


handleSubmit = (e) => {
  e.preventDefault();
  const artistOrBand = this.state.searchInput;  
  this.setState({
    // searchInput: '',
    artistOrBand: artistOrBand
  });

  this.getConcerts()
};


render() {   
    return (
      <div className="App">
        <h1>Doors at 8.</h1>
        <h2>Keep track of the concerts you've been to of your favourite artists</h2>
        <h3>Find your favourite artist or band</h3>
          <form onSubmit={this.handleSubmit} action="">
            <label className="label-text"htmlFor="searchInput"></label>
            <input
              onChange={this.handleChange}
              value={this.state.searchInput}
              id="searchInput"
              type="text" 
              className="search-field"
              placeholder="Enter artist or band name"
              />
              
            <input 
              type="submit"
              value="FIND CONCERTS!"
              className="button"
            />
          </form> 

        <section>
          <div>
            <ArtistHero 
              artistNameShown={this.state.artistNameShown} 
              artistPhoto={this.state.artistPhoto} 
              />
            <ConcertList allConcerts={this.state.allConcerts}/>
          </div>                     
        </section>                    
      </div>
    );
  }
}

export default App;
