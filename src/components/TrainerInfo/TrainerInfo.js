import React from 'react';
import trainerImg from '../logo/desire.jpg';

const TrainerInfo = ({trainer}) => { 
   
				return ( 
						<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
							<main className="pa4 black-80">
							  <div className="measure">
							    <fieldset id="help" className="ba b--transparent ph0 mh0">
							      <legend className="f2 fw6 ph0 mh0">{trainer}</legend>
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
							    </fieldset>
							  </div>
							</main>
						</article>
					);
		}
	// Need to make image, URL dynamic for multiple trainers

export default TrainerInfo;