import React from 'react';
import Modal from 'react-modal';
import MessageList from './MessageList'

function RoomList(props) {

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
      <aside className='column left'>
        <h1>Bloc Chat</h1>
        <button onClick={ props.openModal }>New Room</button>
        <Modal
          isOpen={ props.showModal }
          onRequestClose={ props.closeModal }
          style={customStyles}
          contentLabel="Create new room"
        >
        <h2>Create new room</h2>
        <p>Enter a room name</p>
        <form id='form-new-room' onSubmit={(e) => props.handleSubmit(e) }>
          <input
            type="text"
            value={ props.newRoomName }
            onChange={(e) => props.handleChange(e)}
            id="new-room-input"
          />
          <input type='button' value='Cancle' onClick={ props.closeModal } />
          <input type='submit' value="Create" />
        </form>
        </Modal>
        {
          props.rooms.map( room => (
            <p
              className='room-list'
              onClick={() => props.handleRoomClick(room) }
              key={`${ room.name }`}
            >
              { room.name }
            </p>
            )
          )
        }
      </aside>
      <MessageList
        firebase={ props.firebase }
        currentRoom={ props.currentRoom }
      />
    </main>
  )
}

export default RoomList;
