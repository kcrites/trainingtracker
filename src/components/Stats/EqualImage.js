import React from 'react';

var EqualImage = (props) => {
  const localPath = require("../Logo/equal.png");
  
    return (
      <img src={localPath} alt="The Same" width="15px"/>
    );
  }

export default EqualImage;