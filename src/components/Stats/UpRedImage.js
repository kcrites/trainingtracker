import React from 'react';

var UpRedImage = (props) => {
  const localPath = require("../Logo/upred.png");
  
    return (
      <img src={localPath} alt="Up" width="12px"/>
    );
  }

export default UpRedImage;