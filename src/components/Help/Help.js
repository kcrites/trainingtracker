import React from 'react';
import Popout from '../Popout/Popout';
import termsPolicy from './terms';
import techHelp from './tech';
import faq from './faq';
import './Help.css';


class Help extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showTermsPopup: false,
			showFaqPopup: false,
			showTechPopup: false,
			}
}

toggleTermsPopup() {
	this.setState({
		showTermsPopup: !this.state.showTermsPopup
	});
	}
toggleFaqPopup() {
	this.setState({
		showFaqPopup: !this.state.showFaqPopup
	});
	}
toggleTechPopup() {
	this.setState({
		showTechPopup: !this.state.showTechPopup
	});
	}
	  render() {
		return ( 
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
					<fieldset id="help" className="ba b--transparent ph0 mh0">
						<legend className="f2 fw6 ph0 mh0">Help</legend>
						<div className="mt3">
						<button className="pop_button" onClick={this.toggleFaqPopup.bind(this)}>FAQ</button>
						</div>
						<div className="mv3">
						<button className="pop_button"  onClick={this.toggleTechPopup.bind(this)}>Technical Help</button>
							</div>
						<div className="mv3">
						<button className="pop_button"  onClick={this.toggleTermsPopup.bind(this)}>Read Terms Policy</button>
						</div>
						<div>
							{this.state.showTermsPopup ? 
							<Popout
							text={termsPolicy}
							closePopup={this.toggleTermsPopup.bind(this)}
							/>
							: null
							}
						</div>
							<div>
							{this.state.showFaqPopup ? 
							<Popout
							text={faq}
							closePopup={this.toggleFaqPopup.bind(this)}
							/>
							: null
							}
						</div>
							<div>
							{this.state.showTechPopup ? 
							<Popout
							text={techHelp}
							closePopup={this.toggleTechPopup.bind(this)}
							/>
							: null
							}
						</div>
					</fieldset>
					</div>
				</main>
			</article>
		);
	}
}
	
export default Help;