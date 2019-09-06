import React from 'react';

var DownImage = (props) => {
  const localPath = require("../Logo/down.png");
  
    return (
      <img src={localPath} alt="Up" width="12px"/>
    );
  }

export default DownImage;