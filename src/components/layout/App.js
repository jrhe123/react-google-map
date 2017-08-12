import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


// Components
import {Map, Places} from '../containers';


// Redux
import {connect} from 'react-redux';
import actions from '../../actions';


import superagent from 'superagent';


class App extends Component {

  constructor(){
    super()
    this.state = {
      venues: [],
      currentLocation: {
        lat: '43.6551783',
        lng: '-79.4149198'
      }
    }
  }

  componentDidMount(){
    
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;

        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        })
      })
    }

    const url = 'https://api.foursquare.com/v2/venues/search?v=20140806&ll='
              + this.state.currentLocation.lat
              +','+this.state.currentLocation.lng
              +'&client_id=VZZ1EUDOT0JYITGFDKVVMCLYHB3NURAYK3OHB5SK5N453NFD&client_secret=UAA15MIFIWVKZQRH22KPSYVWREIF2EMMH0GQ0ZKIQZC322NZ'

    superagent
    .get(url)
    .query(null)
    .set('Accept', 'text/json')
    .end((error, response) => {

      const venues = response.body.response.venues
      this.setState({
        venues: venues
      })
    })

  }

  render() {

    const location = {
      lat: 43.6551783,
      lng: -79.4149198
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Google Map Demo</h2>
        </div>


        <div className="row">
          <div className="col-md-3" style={{height:600}}>
            <Map center={location} markers={this.state.venues} />
          </div>
          <div className="col-md-9">
            <Places venues={this.state.venues} />
          </div>
        </div>
        
      </div>
    );
  }
}

// Connect with Props Methods
// Connect with Props Methods
const stateToProps = (state) => {

  return {
    // only one !!!
    // 
    // return as this.props.venue
    // contains all state in venue
    // venue: state.venue,
    // matched to store.js reducer name (state.xxx  <---)
    //

    venue: state.venue
  }
}
const dispatchToProps = (dispatch) => {

  // connected to actions
  return {
    //
    // Multiple methos:
    //
    // Test dispatch to action
    //searchTest: (test) => dispatch(actions.testReceived(test)),

    selectVenue: (venue) => dispatch(actions.selectVenue(venue))
  }
}

export default connect(stateToProps, dispatchToProps) (App);
