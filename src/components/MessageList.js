import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  componentWillUnmount() {
    this.messagesRef.off();
  }

  render() {
    return (
      <section className="colume right">
        <div className='room-title'>
          <p>{this.props.currentRoom.name}</p>
        </div>
        {
          this.state.messages.map((message, index) =>
            message.roomId === this.props.currentRoom.roomId && (
                <div key={message.roomId + index} className='message'>
                    <h4>{message.username}</h4>
                    <span className='message-time'>{message.sentAt}</span>
                    <p>{message.content}</p>
                </div>
              )
          )
        }
      </section>
    )
  }
}

export default MessageList;
