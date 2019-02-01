import React, { Component } from 'react';
import Modal from 'react-modal';
import MessageList from './MessageList';
import Room from './Room';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: "",
      showModal: false,
      currentRoom: {
        name: null,
        roomId: null,
      },
    }

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  handleRoomSubmit(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({ showModal: false });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ newRoomName: e.target.value});
  }

  handleRoomClick(room) {
    this.setState({ currentRoom: {
      name: room.name,
      roomId: room.key,
      }
    })
  }

  handleRoomDelete(room) {
    const roomName = room.name.charAt(0).toUpperCase() + room.name.slice(1);

    if (window.confirm("Delete " + roomName + " ?")) {
      this.roomsRef.child(room.key).remove();
      const updateRoom = this.state.rooms.filter( item => item !== room);
      this.setState({rooms: updateRoom});
    }

  }

  editRoomName(room, index) {
    const newName = window.prompt("Enter new room name:", room.name);
    if(newName != null) {
      this.roomsRef.child(room.key).set({
        name: newName
      })
      let newRoomArray = [...this.state.rooms];
      newRoomArray[index].name = newName;
      this.setState({ rooms: newRoomArray});
    }

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
            <button onClick={ this.openModal }>New Room</button>
            <Modal
              isOpen={ this.state.showModal }
              onRequestClose={ this.closeModal }
              style={customStyles}
              contentLabel="Create new room"
            >
            <h2>Create new room</h2>
            <p>Enter a room name</p>
            <form id='form-new-room' onSubmit={(e) => this.handleRoomSubmit(e) }>
              <input
                type="text"
                value={ this.state.newRoomName }
                onChange={(e) => this.handleChange(e)}
                id="new-room-input"
                maxLength="25"
              />
              <input type='button' value='Cancel' onClick={ this.closeModal } />
              <input type='submit' value="Create" />
            </form>
            </Modal>
            {
              this.state.rooms.map( (room, index) =>
                <Room
                  room={room}
                  index={index}
                  rooms={this.state.rooms}
                  key={`${ room.name }-${ index }`}
                  handleRoomClick={() => this.handleRoomClick(room)}
                  editRoomName={() => this.editRoomName(room, index)}
                  handleRoomDelete={() => this.handleRoomDelete(room)}
                />
              )
            }
          </aside>
          <MessageList
            firebase={ this.props.firebase }
            currentRoom={ this.state.currentRoom }
            user={ this.props.user }
            roomsRef={ this.roomsRef }
          />
        </div>
      </main>
    )
  }
}

Modal.setAppElement(document.getElementById('root'));

export default RoomList;
