import React from 'react';
import './TrainingInputForm.css';


const  TrainingInputForm = () => {
	return (
		<div>
			<p className='f3'>
				{'Please input your training sessions'}
			</p>
			<div className='center'>
				<div className='pa4 br2 shadow-5 form center'>
					<input className='f4 pa2 w-70 center' type='date'/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue'>Submit</button>
				</div>
			</div>
		</div>
		);
}

export default TrainingInputForm;