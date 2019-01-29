import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHover: false,
    }

    this.changeIcon = this.changeIcon.bind(this);
    this.handleHover = this.handleHover.bind(this);
    }

  handleHover() {
    this.setState({ isHover: !this.state.isHover });
  }

  changeIcon(className) {
    const isSameRoom = this.props.rooms[this.props.index] === this.props.room;
    if (this.state.isHover && isSameRoom) {
      return className;
    }
    return className + ' hide';
  }

  render() {
    return (
      <div
        onMouseEnter={ this.handleHover }
        onMouseLeave={ this.handleHover }
      >
        <p
          onClick={this.props.handleRoomClick}
          className="rooms-column"

        >
          { this.props.room.name }
        </p>
        <span className={this.changeIcon('pen')} >
          <FontAwesomeIcon
            icon='pen'
            onClick={this.props.editRoomName}
          />
        </span>
        <span className={this.changeIcon('trash')} >
          <FontAwesomeIcon
            icon='trash-alt'
            onClick={this.props.handleRoomDelete}
          />
        </span>
      </div>
    )
  }
}

export default Room;
