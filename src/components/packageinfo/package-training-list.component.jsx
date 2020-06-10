import React from 'react';
import DateFormat from '../date-format/date-format';


const PackageTrainingList = (props) => {
	let tempArray = [...props.array];
  return(  <ol className='pack-session-row'>
							{tempArray.reverse().map(item => {
								if(item.packageid === parseInt(props.packageid))
								 return <li key={item.id}>{DateFormat(item.sessiondate)}</li>
								 else return null;
							})}
        					</ol>)
};

export default PackageTrainingList;
