import React from 'react';

const InfoCard = ({title, content, ...otherProps}) => {

    return(
        <article className=" mw5 mw6-ns br3 hidden ba b--black-10 mv1">
				<h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">{title}</h1>
				<div className="pa3 bt b--black-10">	
					<div className='pa1 br2 shadow-5 form center'>
						
                        <input className='f5 pa1 w-70 center' type='date'onChange={this.handleDateChange}/>
						<button name='session' className='w-30 grow f5 link ph3 pv2 dib white bg-light-blue' onClick={this.handleSubmitDate}>Submit</button>
					
                    </div>
					
				</div>
			</article>
    )
};

export default InfoCard;