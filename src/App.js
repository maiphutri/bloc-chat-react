import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import './App.css';
import User from './components/User';
import RoomList from './components/RoomList';
import Landing from './components/Landing';

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
      rooms: [],
      newRoomName: "",
      showModal: false,
      user: null,
      loggedIn: false,
      currentRoom: {
        name: "",
        roomId: "",
      }
    }

    this.roomsRef = firebase.database().ref('rooms');
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  componentWillUnmount() {
    this.roomsRef.off();
  }

  openModal() {
    this.setState({ showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({showModal: false});
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ newRoomName: e.target.value});
  }

  handleRoomClick(room) {
    this.setState({ currentRoom: {
      name: room.name,
      roomId: room.key
      }
    })
  }

  handleSignInClick() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup( provider );
  }

  handleSignOutClick() {
    firebase.auth().signOut();
    this.setState({ loggedIn: false })
  }

  setUser(user) {
    if(user != null) {
      this.setState({
        user: user,
        loggedIn: true
      });
    }
  }

  render() {
    console.log(this.state.loggedIn)
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
                handleRoomClick={(room) => this.handleRoomClick(room)}
                handleChange={(e) => this.handleChange(e)}
                handleSubmit={(e) => this.handleSubmit(e)}
                openModal={this.openModal}
                closeModal={this.closeModal}
                showModal={this.state.showModal}
                newRoomName={ this.state.newRoomName }
                rooms={this.state.rooms}
                currentRoom={this.state.currentRoom}
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

export default App;
