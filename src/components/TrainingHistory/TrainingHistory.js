
import React from 'react';



const  TrainingHistory = ({history1, history2, history3}) => {

	return (

<div className="pa4">
  <div className="overflow-auto center">
    <table className="f6 w-75 mw8 " cellSpacing="0">
      <thead>
        <tr className="stripe-dark">
          <th className="fw6 tl pa3 bg-white">Date</th>
          <th className="fw6 tl pa3 bg-white">Package ID</th>
        </tr>
      </thead>
      <tbody className="lh-copy">
        <tr className="stripe-dark">
          <td className="pa3">{history1.sessionDate}</td>
          <td className="pa3">{history1.packageId}</td>

        </tr>
        <tr className="stripe-dark">
          <td className="pa3">{history2.sessionDate}</td>
          <td className="pa3">{history2.packageId}</td>

        </tr>
        <tr className="stripe-dark">
          <td className="pa3">{history3.sessionDate}</td>
          <td className="pa3">{history3.packageId}</td>

        </tr>
        <tr className="stripe-dark">
          <td className="pa3">{history3.sessionDate}</td>
          <td className="pa3">{history3.packageId}</td>

        </tr>
        <tr className="stripe-dark">
          <td className="pa3">date</td>
          <td className="pa3">packageId</td>

        </tr>
      </tbody>
    </table>
  </div>
</div>
);
}

export default TrainingHistory;