
import React from 'react';


const user = {
	weight: 93.4,
	date: '07/07/1970',
	muscleMas: 16,
	fatLevel: 13,
	bmi: 30.1,
	vv: 14,
	percentWater: 30
}

const  Stats = (onRouteChange) => {
	return (

<div className="pa4">
  <div className="overflow-auto center">
    <table className="f6 w-100 mw8 " cellSpacing="0">
      <thead>
        <tr className="stripe-dark">
          <th className="fw6 tl pa3 bg-white">Date</th>
          <th className="fw6 tl pa3 bg-white">Weight</th>
          <th className="fw6 tl pa3 bg-white">Muscle Mass</th>
          <th className="fw6 tl pa3 bg-white">Fat Level</th>
          <th className="fw6 tl pa3 bg-white">BMI</th>
          <th className="fw6 tl pa3 bg-white">Fat Level Organs</th>
            <th className="fw6 tl pa3 bg-white">% Body Water</th>
        </tr>
      </thead>
      <tbody className="lh-copy">
        <tr className="stripe-dark">
          <td className="pa3">{user.date}</td>
          <td className="pa3">{user.weight}</td>
          <td className="pa3">{user.muscleMass}</td>
          <td className="pa3">{user.fatLevel}</td>
          <td className="pa3">{user.bmi}</td>
          <td className="pa3">{user.vv}</td>
          <td className="pa3">{user.percentWater}</td>
        </tr>
        <tr className="stripe-dark">
          <td className="pa3">{user.date}</td>
          <td className="pa3">{user.weight}</td>
          <td className="pa3">{user.muscleMass}</td>
          <td className="pa3">{user.fatLevel}</td>
          <td className="pa3">{user.bmi}</td>
          <td className="pa3">{user.vv}</td>
          <td className="pa3">{user.percentWater}</td>
        </tr>
        <tr className="stripe-dark">
           <td className="pa3">{user.date}</td>
          <td className="pa3">{user.weight}</td>
          <td className="pa3">{user.muscleMass}</td>
          <td className="pa3">{user.fatLevel}</td>
          <td className="pa3">{user.bmi}</td>
          <td className="pa3">{user.vv}</td>
          <td className="pa3">{user.percentWater}</td>
        </tr>
        <tr className="stripe-dark">
          <td className="pa3">{user.date}</td>
          <td className="pa3">{user.weight}</td>
          <td className="pa3">{user.muscleMass}</td>
          <td className="pa3">{user.fatLevel}</td>
          <td className="pa3">{user.bmi}</td>
          <td className="pa3">{user.vv}</td>
          <td className="pa3">{user.percentWater}</td>
        </tr>
        <tr className="stripe-dark">
          <td className="pa3">{user.date}</td>
          <td className="pa3">{user.weight}</td>
          <td className="pa3">{user.muscleMass}</td>
          <td className="pa3">{user.fatLevel}</td>
          <td className="pa3">{user.bmi}</td>
          <td className="pa3">{user.vv}</td>
          <td className="pa3">{user.percentWater}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
);
}

export default Stats;