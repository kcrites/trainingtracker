import React from 'react';

const ArrowImage = (props) => {
  const localPath = require("../Logo/" + props.arrow + ".png");
  
    return (
      <img src={localPath} alt="Down" width="12px"/>
    );
  }

export default ArrowImage;