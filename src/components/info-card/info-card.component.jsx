import React from 'react';
import trainerImg from '../../components/Logo/desire.jpg';

const InfoCard = ({title, content, ...otherProps}) => {

    return(
        <article className=" mw5 mw6-ns br3 hidden ba b--black-10 mv1">
				<h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">{title}</h1>
				<div className="pa3 bt b--black-10">	
					<div className='pa1 br2 shadow-5 form center'>
						
					<div>
                                      <img alt='Trainer Profile' src={trainerImg}></img>
                                  </div>
							      <div className="mt3">
							        <label className="db fw6 lh-copy f6" htmlFor="trainer-name">Mobile: 06 4676 7399</label>
							      </div>
							      <div className="mv3">
							        <label className="db fw6 lh-copy f6" htmlFor="link">Website: <a href="http://dmpersonaltraining.com/">here</a></label>
							      </div>
                                  <div className="mv3">
							        <label className="db fw6 lh-copy f6" htmlFor="link">Email: desire@gmail.com</label>
							      </div>
                    </div>
					
				</div>
			</article>
    )
};

export default InfoCard;