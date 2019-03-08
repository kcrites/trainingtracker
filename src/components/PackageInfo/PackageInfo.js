import React from 'react';
import './PackageInfo.css';



class PackageInfo extends React.Component { //= ({name, used, left, type, completed}) => {

		constructor(props){
		super(props);
		this.state = {
			email: this.props.email,
			name: this.props.name,
			datestarted: this.props.datestarted,
			packageId: this.props.packageid,
			completed:false,
			maxsessions:0,
			sessionsLeft:0,
			sessionCount: 0
			}
		}

loadPackage = () => {
    fetch('http://localhost:3001/getpackage', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email
      })
    })
    .then(response => response.json())
    .then(pack => {
      if(pack){
      	//console.log(pack);
        this.props.loadUserPack(pack);
        //this.props.onRouteChange('home');
        
      }
    })
    
  }



render() {
	const { name} = this.state;
	const {completed, sessionsLeft, sessionCount, packageId} = this.props;
	this.loadPackage();
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
			    <dd className="f6 f5-ns b ml0">Package Type</dd>
			    <dd className="f3 f2-ns b ml0">{packageId}</dd>
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