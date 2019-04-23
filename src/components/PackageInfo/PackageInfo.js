import React from 'react';
import './PackageInfo.css';



class PackageInfo extends React.Component { 

		constructor(props){
		super(props);
		this.loadPackage();
		}

componentDidMount() {

}

loadPackage = () => {
    fetch('http://localhost:3001/getpackage', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.props.email
      })
    })
    .then(response => response.json())
    .then(pack => {
      if(pack.id){
        console.log('packid: ', pack.packageid)
        this.props.loadUserPack(pack);
        this.getHistory();
      } else {
					console.log('Empty pack');
					//need to load completed to true
					this.getHistory();
      }
    })
    
	}
	
	async getHistory(){
		const { loaded } = this.props;
		if(!loaded) {
			let [result1, result2] = await Promise.all([this.props.getStatsHistory(), this.props.getTrainingHistory()]);
			console.log('getHistory async' , result1, result2);
			this.props.historyLoaded(true);
		}
	}

render() {
	
	const {completed, sessionsLeft, sessionCount, dateStarted} = this.props.pack;

	return (
		<div>
		{(!completed ?  <div >
			<p className="sidetitle">Package Information</p>
					 <table width="50%">
						<tbody className='packtable'>
							<tr>
								<td >Sessions Used: </td><td>{sessionCount}</td>
							</tr>
							<tr>
								<td >Sessions left: </td><td>{sessionsLeft}</td>
							</tr>
							<tr>
								<td > Package Date: </td><td>{dateStarted}</td>
							</tr>
						</tbody>
					</table>
				</div>

		: <article className="pa1 pa5-ns" data-name="slab-stat">
			<h3>You are out of sessions in your current package</h3>
			<p>Contact your trainer to set up a new training package</p>
		  </article>
		)}
		</div>
		);
		}
	}


export default PackageInfo;