import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';
import './App.css';
import User from './components/User';
import RoomList from './components/RoomList';
import Landing from './components/Landing';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBmO3NuTgHs552FlrTh-ccQEzqyoX0GBcw",
    authDomain: "bloc-chat-51197.firebaseapp.com",
    databaseURL: "https://bloc-chat-51197.firebaseio.com",
    projectId: "bloc-chat-51197",
    storageBucket: "bloc-chat-51197.appspot.com",
    messagingSenderId: "360214343826"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { displayName: "Guest" },
      loggedIn: false,
    }

    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  handleSignInClick() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup( provider );
  }

  handleSignOutClick() {
    firebase.auth().signOut();
    this.setState({
      user: { displayName: "Guest" } ,
      loggedIn: false })
  }

  setUser(user) {
    if(user !== null) {
      this.setState({
        user: user,
        loggedIn: true
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <Link className='link' to="/" >Landing</Link>
          <Link className='link' to="/room-list" >Room List</Link>
          <Link className='link' to='/user' >Sign In</Link>
          <span>{this.state.loggedIn ? this.state.user.displayName : "Guest"}</span>
        </header>
        <main>
          <Route exact path='/' component={ Landing } />
          <Route path='/room-list' render={() =>
              <RoomList
                firebase={ firebase }
                user={this.state.user}
              />
            }
          />
          <Route path='/user' render={() =>
              <User
                firebase={ firebase }
                setUser={(user) => this.setUser(user) }
                handleSignInClick={this.handleSignInClick}
                handleSignOutClick={this.handleSignOutClick}
              />
            }
          />
        </main>
      </div>
    );
  }
}

library.add( faTrashAlt, faPen );
export default App;
