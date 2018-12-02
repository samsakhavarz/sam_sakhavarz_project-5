import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Qs from 'qs';
import ConcertList from './ConcertList';
import savedConcertList from './SavedConcertList';
import ArtistHero from './ArtistHero';

//PSEUDOCODE
//get user's input from the search box and return search result, making a call to the bandsintown API
//let user select an event and save it to their personal collection



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
      myConcerts: {},
      date: '',
      venue: '',
      city: '',
    };
  }


componentDidMount() {
    console.log('mounted');

  //attach event listener to firebase
    dbRef.on('value', (snapshot) => {
      this.setState({
        myConcerts: snapshot.val()
      });
    });
  }


handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };



//handling the submit from the 'save my stub' submit input:  
handleSave = (e, id) => {
  e.preventDefault();
  console.log('handle save being called', e, id);

  //using id thats passed to handleSave, we are going to filter through this.state.allConcerts and grab the corresponding object in this array
  //once we identify the objetc, we are going to pull this info: artist name, venue and city
  //update state once we have this information

  const savedConcert = {
    artist: this.state.artistNameShown,
    // date: this.state.datetime,
    // venue: this.state.venue.name,
    // city: this.state.venue.city
  };
  console.log ('saved concert', savedConcert);

  dbRef.push(savedConcert);

  // this.setState({
  //   artist: '',
  //   date: '',
  //   venue: '',
  //   city: ''
  // });
};


//function to get concerts (2 x calls: one to get artist info, and one to get list of all their events):
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
        artistPhoto: res.data.image_url, //setting the state for the artist's photo
        artistNameShown: res.data.name, //setting the state for the name of the artist
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
          allConcerts: res.data, //setting the state for all events
          // date: res.data.datetime,
          // venue: res.data.venue.name,
          // city: res.data.venue.city
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
      <div className="wrapper">      
        <h1>Doors at 8.</h1>
        <h2>Keep track of concerts you've been to by your favourite artists</h2>
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
            <ConcertList allConcerts={this.state.allConcerts} handleSave={this.handleSave}/>
          </div>                     
        </section>
      </div>

        <footer>
          <p>Created by Sam Sakhavarz</p>
          <p>Concert info provided by <a href="https://www.bandsintown.com/">Bandsintown</a></p>

        </footer>
      </div>
    );
  }
}

export default App;
