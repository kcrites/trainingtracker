import React from 'react';

var UpGreenImage = (props) => {
  const localPath = require("../Logo/upgreen.png");
  
    return (
      <img src={localPath} alt="Up" width="12px"/>
    );
  }

export default UpGreenImage;