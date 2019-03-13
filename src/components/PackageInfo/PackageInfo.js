import React from 'react';
import './PackageInfo.css';



class PackageInfo extends React.Component { 

		constructor(props){
		super(props);
		this.loadPackage();
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
        
        this.props.loadUserPack(pack);
      } else {
      		console.log('Empty pack')
      }
    })
    
  }

componentDidMount(){
	const { loaded } = this.props;
	if(!loaded) {
		this.props.getStatsHistory();
		// this errors out every time => this.props.getTrainingHistory();
		this.props.historyLoaded(true);
	}
}

render() {
	
	const {completed, sessionsLeft, sessionCount, name, dateStarted} = this.props;

	return (
		<div>
		{(!completed ? 
			<article className="pa1 pa5-ns" data-name="slab-stat">
			  <h1>{name}</h1>
			  <dl className="dib mr5">
			   	<dd className="f6 f5-ns b ml0">Sessions Used</dd>
			    <dd className="f3 f2-ns b ml0">{sessionCount}</dd>
			  </dl>
			  <dl className="dib mr5">
			     <dd className="f6 f5-ns b ml0">Sessions Left</dd>
			     <dd className="f3 f2-ns b ml0">{sessionsLeft}</dd>
			  </dl>
			  <dl className="dib mr5">
			    <dd className="f6 f5-ns b ml0">Package Date</dd>
			    <dd className="f3 f2-ns b ml0">{dateStarted}</dd>
			  </dl>
			</article>
		: <article className="pa1 pa5-ns" data-name="slab-stat">
			<h1>You are out of sessions in your current package</h1>
		  </article>
		)}
		</div>
		);
		}
	}


export default PackageInfo;