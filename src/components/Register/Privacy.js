import React from 'react';

class Privacy extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <p style={{fontSize : '.75em'}}>{this.props.text}</p>
          <button onClick={this.props.closePopup}>Close</button>
          </div>
        </div>
      );
    }
  }

export default Privacy;