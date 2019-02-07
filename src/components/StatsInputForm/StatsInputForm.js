import React from 'react';




const  TrainingInputForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className='f3'>
				{'Please input your measurement stats'}
			</p>
			<div className='center'>
				<div className='pa4 br2 shadow-5 form center'>
				<article className="pa1 pa5-ns" data-name="slab-stat-small">
				  <h3 className="f6 ttu tracked">{date}</h3>
				  <div className="cf">
				    
				     <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
				      <dd className="f6 fw4 ml0">Date</dd>
				      <dd className="f3 fw6 ml0"><input type='date' name='date' /></dd>
				    </dl>
				    <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
				      <dd className="f6 fw4 ml0">Weight</dd>
				      <dd className="f3 fw6 ml0"><input type-'text' name='weight' /></dd>
				    </dl>
				    <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
				      <dd className="f6 fw4 ml0">Muscle Mass</dd>
				      <dd className="f3 fw6 ml0"><input type-'text' name='musclemass' /></dd>
				    </dl>
				    <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
				      <dd className="f6 fw4 ml0">Fat Level</dd>
				      <dd className="f3 fw6 ml0"><input type-'text' name='fatlevel' /></dd>
				    </dl>
				    <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
				      <dd className="f6 fw4 ml0">BMI</dd>
				      <dd className="f3 fw6 ml0"><input type-'text' name='bmi' /></dd>
				    </dl>
				    <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
				      <dd className="f6 fw4 ml0">Fat Level Organs</dd>
				      <dd className="f3 fw6 ml0"><input type-'text' name='fatlevelorgans' /></dd>
				    </dl>
				    <dl className="fl fn-l w-50 dib-l w-auto-l lh-title">
				      <dd className="f6 fw4 ml0">App Downloads</dd>
				      <dd className="f3 fw6 ml0">1,200</dd>
				    </dl>
				  </div>
				</article>
					 <input className='f4 pa2 w-70 center' type='date'onChange={onInputChange}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={onButtonSubmit}>Submit</button>
				</div>
			</div>
		</div>
		);
}

export default TrainingInputForm;

