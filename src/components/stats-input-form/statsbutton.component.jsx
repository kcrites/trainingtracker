import React from 'react';
import './statsbutton.styles.scss';

const StatsButton = (props) => {
    return (	<article className=" mw5 mw6-ns br3 hidden ba b--black-10 mv1">
    <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Add  Measurements</h1>
    <div className="pa3 bt b--black-10">	
 
    <div className='pa1 br2 shadow-5 measure-form center'>
					<button name='measure' className=' grow f5 link ph3 pv2 dib white bg-light-blue' onClick={() => props.onRouteChange('statsInputForm')}>Add</button>
				</div>
                
            </div></article>
            );
}

export default StatsButton;