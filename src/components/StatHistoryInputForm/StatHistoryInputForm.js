import React from 'react';




const  StatHistoryInputForm = ({onStatInputChange, onStatButtonSubmit}) => {
	return (
		<div>
			<p className='f3'>
				{'Please input your measurments'}
			</p>
			<div className='center'>
				<div className='pa4 br2 shadow-5 form center'>
				    <input className='f4 pa2 w-70 center' name='date' type='date'onChange={onInputChange}/>
					<input className='f4 pa2 w-70 center' name='weight' type='number' step='.1' onChange={onInputChange}>Weight</input>
					<input className='f4 pa2 w-70 center' name='muscleMass' type='number' step='.1' onChange={onInputChange}>Muscle Mass</input>
					<input className='f4 pa2 w-70 center' name='fatLevel' type='number' step='.1' onChange={onInputChange}>Fat Level</input>
					<input className='f4 pa2 w-70 center' name='bmi' type='number' step='.1' onChange={onInputChange}>BMI</input>
					<input className='f4 pa2 w-70 center' name='vv' type='number' step='.1' onChange={onInputChange}>VV</input>
					<input className='f4 pa2 w-70 center' name='percentWater' type='number' step='.1' onChange={onInputChange}>% Bodu Water</input>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={onStatButtonSubmit}>Submit</button>
				</div>
			</div>
		</div>
		);
}

export default StatHistoryInputForm;