import React from 'react';
import './PackageInfo.css';


const user = {
	name: 'Ken',
	sessionsUsed: 7,
	sessionsTotal: 11,
};

const  PackageInfo = () => {
	return (
		<div>
			<article className="pa1 pa5-ns" data-name="slab-stat">
			  <h1>{user.name}</h1>
			  <dl className="dib mr5">
			   	<dd className="f6 f5-ns b ml0">Sessions Used</dd>
			    <dd className="f3 f2-ns b ml0">{user.sessionsUsed}</dd>
			  </dl>
			  <dl className="dib mr5">
			     <dd className="f6 f5-ns b ml0">Sessions Left</dd>
			     <dd className="f3 f2-ns b ml0">{user.sessionsTotal-user.sessionsUsed}</dd>
			  </dl>
			  <dl className="dib mr5">
			    <dd className="f6 f5-ns b ml0">Package Type</dd>
			    <dd className="f3 f2-ns b ml0">10-11-I</dd>
			  </dl>
			</article>
		</div>
		);
}

export default PackageInfo;