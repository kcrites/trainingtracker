import React from 'react';

var DownGreenImage = (props) => {
  const localPath = require("../Logo/downgreen.png");
  
    return (
      <img src={localPath} alt="Down" width="12px"/>
    );
  }

export default DownGreenImage;