import React from 'react';

var UpImage = (props) => {
  const localPath = require("../Logo/up.png");
  
    return (
      <img src={localPath} alt="Up" width="12px"/>
    );
  }

export default UpImage;