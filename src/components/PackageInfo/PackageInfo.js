import React from 'react';
import './PackageInfo.css';



const PackageInfo = ({name, used, left, type, completed}) => {
console.log({name, used, left, type});
	return (
		<div>
		{(!completed ? 
			<article className="pa1 pa5-ns" data-name="slab-stat">
			  <h1>{name}</h1>
			  <dl className="dib mr5">
			   	<dd className="f6 f5-ns b ml0">Sessions Used</dd>
			    <dd className="f3 f2-ns b ml0">{used}</dd>
			  </dl>
			  <dl className="dib mr5">
			     <dd className="f6 f5-ns b ml0">Sessions Left</dd>
			     <dd className="f3 f2-ns b ml0">{left}</dd>
			  </dl>
			  <dl className="dib mr5">
			    <dd className="f6 f5-ns b ml0">Package Type</dd>
			    <dd className="f3 f2-ns b ml0">{type}</dd>
			  </dl>
			</article>
		: <article className="pa1 pa5-ns" data-name="slab-stat">
			<h1>You are out of sessions in your current package</h1>
		  </article>
		)}
		</div>
		);
}

export default PackageInfo;