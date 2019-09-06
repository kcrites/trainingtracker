import React from 'react';

var DownRedImage = (props) => {
  const localPath = require("../Logo/downred.png");
  
    return (
      <img src={localPath} alt="Down" width="12px"/>
    );
  }

export default DownRedImage;