import React from 'react';




const  StatsInputForm = ({onStatsInputChange, onStatsButtonSubmit}) => {
	return (
		<div>
			<p className='f3'>
				{'Please input your measurments'}
			</p>
			<div className='center'>
				<div className='pa4 br2 shadow-5 center'>
				<table>
				<tr>
				<td><label>Date</label></td>
				 <td><input className='f4 pa2 w-80 center' name='date' type='date'onChange={onStatsInputChange}/></td>
				 </tr>
				 <tr><td>   <label>Weight</label></td>
				<td><input className='f4 pa2 w-50 center' name='weight' type='number' step='.1' onChange={onStatsInputChange} /></td>
				</tr>
				<tr><td>   <label>Muscle Mass</label></td>
				<td><input className='f4 pa2 w-50 center' name='muscleMass' type='number' step='.1' onChange={onStatsInputChange} /></td></tr>
				<tr><td>   <label>Fat Level</label></td>
				<td><input className='f4 pa2 w-50 center' name='fatLevel' type='number' step='.1' onChange={onStatsInputChange} /></td></tr>
				<tr><td>   <label>BMI</label></td>
				<td><input className='f4 pa2 w-50 center' name='bmi' type='number' step='.1' onChange={onStatsInputChange} /></td></tr>
				<tr><td>   <label>VV</label></td>
				<td><input className='f4 pa2 w-50 center' name='vv' type='number' step='.1' onChange={onStatsInputChange}/></td></tr>
				<tr><td>   <label>Percent Water</label></td>
				<td><input className='f4 pa2 w-50 center' name='percentWater'  type='number' step='.1' onChange={onStatsInputChange}/></td></tr>
				<tr>
				<td><button className='w-100 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={onStatsButtonSubmit}>Submit</button></td>
					</tr>
				</table>
				</div>
			</div>
		</div>
		);
}

export default StatsInputForm;
