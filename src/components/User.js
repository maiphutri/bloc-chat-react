import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
      }
    )
  }

  render() {
    return (
      <div>
        <button onClick={ this.props.handleSignInClick } >Sign In</button>
        <button onClick={ this.props.handleSignOutClick } >Sign Out</button>
      </div>
    )
  }
}

export default User;
