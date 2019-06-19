import React from 'react';

class Privacy extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <div style={{fontSize : '.75em'}}>{this.props.text}</div>
          <button onClick={this.props.closePopup}>Close</button>
          </div>
        </div>
      );
    }
  }

export default Privacy;