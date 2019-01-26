import React, { Component } from 'react';
import Modal from 'react-modal';
import MessageList from './MessageList'

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRoom: {
        name: null,
        roomId: null,
      }
    }
  }

  handleRoomClick(room) {
    this.setState({ currentRoom: {
      name: room.name,
      roomId: room.key,
      },
    })
  }

  render() {
    // Modal Style
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '300px'
      }
    };

    return (
      <main className='room-list'>
        <div>
          <aside className='column left'>
            <h1>Bloc Chat</h1>
            <button onClick={ this.props.openModal }>New Room</button>
            <Modal
              isOpen={ this.props.showModal }
              onRequestClose={ this.props.closeModal }
              style={customStyles}
              contentLabel="Create new room"
            >
            <h2>Create new room</h2>
            <p>Enter a room name</p>
            <form id='form-new-room' onSubmit={(e) => this.props.handleSubmit(e) }>
              <input
                type="text"
                value={ this.props.newRoomName }
                onChange={(e) => this.props.handleChange(e)}
                id="new-room-input"
              />
              <input type='button' value='Cancle' onClick={ this.props.closeModal } />
              <input type='submit' value="Create" />
            </form>
            </Modal>
            {
              this.props.rooms.map( room => (
                <p
                  className='room-list'
                  onClick={() => this.handleRoomClick(room) }
                  key={`${ room.name }`}
                >
                  { room.name }
                </p>
                )
              )
            }
          </aside>
          <MessageList
            firebase={ this.props.firebase }
            currentRoom={ this.state.currentRoom }
            user={ this.props.user }
          />
        </div>
      </main>
    )
  }
}

export default RoomList;
