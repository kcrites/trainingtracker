import React from 'react';


// needs a for loop to only display rows when there is enough data. Should only show sessions for this package.

const renderRow= (array) =>{
  
  return array.map((item, index)  => 
            <tr className="stripe-dark">
            	<td className="pa3">{index+1}</td>
	            <td className="pa3">{item.user}</td>
	            <td className="pa3">{item.packageId}</td>
	            <td className="pa3">{item.sessionsUsed}</td>
	            <td className="pa3">{item.sessionsLeft}</td>
	            <td className="pa3">{item.action}</td>
            </tr>

    );
}

const  Admin = ({history}) => {

if(!history[0]) {
  return("Your User List is empty");
} else{

    return (

    <div className="pa4">
    <p>User Information</p>
      <div className="overflow-auto center">
        <table className="f6 w-75 mw8 " cellSpacing="0">
          <thead>
            <tr className="stripe-dark">
            	<th className="fw6 tl pa3 bg-white">Number</th>
             	<th className="fw6 tl pa3 bg-white">User</th>
             	<th className="fw6 tl pa3 bg-white ">Package ID</th>
            	<th className="fw6 tl pa3 bg-white">Sessions Used</th>
                <th className="fw6 tl pa3 bg-white">Sessions Left</th>
                <th className="fw6 tl pa3 bg-white">Action</th>
            </tr>
          </thead>
          <tbody className="lh-copy">
          {renderRow(history)}

          </tbody>
        </table>
      </div>
    </div>
    );
  }
}

export default Admin;