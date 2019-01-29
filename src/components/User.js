import React, { Component } from 'react';

class User extends Component {


  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
      }
    )
  }
  
  render() {
    return (
      <div>
        <button className="signInButton"onClick={ this.props.handleSignInClick } >Sign In</button>
        <button className="signInButton"onClick={ this.props.handleSignOutClick } >Sign Out</button>
      </div>
    )
  }
}

export default User;
