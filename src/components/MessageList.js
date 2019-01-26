import React, { Component } from 'react';
import moment from 'moment';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [{username: "Guest"}],
      content: "",
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.orderByChild('sentAt').on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  componentWillUnmount() {
    this.messagesRef.off();
  }

  handleMessageSubmit(e) {
    e.preventDefault();
    const user = this.props.user;
    var time = moment().format('lll');
    this.messagesRef.push({
      username: user ? user.displayName : "Guest",
      sentAt: time,
      roomId: this.props.currentRoom.roomId,
      content: this.state.content
    })
  }

  handleMessageChange(e) {
    e.preventDefault();
    this.setState({ content: e.target.value })
  }

  render() {
    return (
      <section className="column right">
        <div className='room-title'>
          <p>{this.props.currentRoom.name}</p>
        </div>
        {
          this.state.messages.map((message, index) =>
            message.roomId === this.props.currentRoom.roomId && (
                <div
                  key={message.roomId + index}
                  className={message.username === this.props.user.displayName ?
                             "message user-message" : "message"
                  }
                >
                    <h6>{message.username}</h6>
                    <span className='message-time'>{message.sentAt}</span>
                    <p>{message.content}</p>
                </div>
              )
          )
        }
        <div className={this.props.currentRoom.name !== null  ? "type-box" : "type-box hide"} >
          <form id='form-message' onSubmit={(e) => this.handleMessageSubmit(e)} >
            <input
              id='write-message'
              type='text'
              value={ this.state.content}
              onChange={(e) => this.handleMessageChange(e)}
              placeholder='Type your message here...'
            />
            <input id='submit' type='submit' value='submit'/>
          </form>
        </div>
      </section>
    )
  }
}

export default MessageList;
