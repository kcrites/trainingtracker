import React from 'react';

const TrainerInfo = ({trainer}) => { 
   
				return ( 
					
						<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
							<main className="pa4 black-80">
							  <div className="measure">
							    <fieldset id="help" className="ba b--transparent ph0 mh0">
							      <legend className="f2 fw6 ph0 mh0">{trainer}</legend>
							      <div className="mt3">
							        <label className="db fw6 lh-copy f6" htmlFor="trainer-name">Mobile</label>
							      </div>
							      <div className="mv3">
							        <label className="db fw6 lh-copy f6" htmlFor="link">Website</label>
							      </div>
                                  <div className="mv3">
							        <label className="db fw6 lh-copy f6" htmlFor="link">Email</label>
							      </div>
							    </fieldset>
							  </div>
							</main>
						</article>
					);
		}
	

export default TrainerInfo;