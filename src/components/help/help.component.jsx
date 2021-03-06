import React from 'react';
import Popout from '../popout/popout.component';
import termsPolicy from './terms.component';
import techHelp from './tech.component';
import faq from './faq.component';
import './help.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import { withRouter } from 'react-router-dom';


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
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center help-box">
				<main className="pa4 black-80">
					<div className="measure">
					<fieldset id="help" className="ba b--transparent ph0 mh0 help-main">
						<legend className="f2 fw6 ph0 mh0 help-title">Help</legend>
						<div className="help-main help-1">
							<CustomButton inverted onClick={() => this.props.history.push('/popout1')}>FAQ</CustomButton>
						</div>
						<div className="help-main help-2">
						<CustomButton inverted onClick={() => this.props.history.push('/popout2')}>Technical Help</CustomButton>
							</div>
						<div className="help-main help-2">
						<CustomButton inverted onClick={() => this.props.history.push('/popout3')}>App Terms Policy</CustomButton>
						</div>
						<div className='help-main help-2'>
						<CustomButton inverted onClick={() => this.props.history.push('/home')}>Back</CustomButton>
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
	
export default withRouter(Help);