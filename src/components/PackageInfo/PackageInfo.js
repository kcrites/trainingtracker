import React from 'react';
import './PackageInfo.css';


const name = 'Ken';
const date = '07/07/1970';
const sessionsUsed = 7;
const sessionsTotal = 11;

const  PackageInfo = () => {
	return (
		<div>
<article className="pa1 pa5-ns" data-name="slab-stat">
  <h1>{name}</h1>
  <dl className="dib mr5">
   	<dd className="f6 f5-ns b ml0">Sessions Used</dd>
    <dd className="f3 f2-ns b ml0">{sessionsUsed}</dd>
  </dl>
  <dl className="dib mr5">
     <dd className="f6 f5-ns b ml0">Sessions Left</dd>
     <dd className="f3 f2-ns b ml0">{sessionsTotal-sessionsUsed}</dd>
  </dl>
  <dl className="dib mr5">
    <dd className="f6 f5-ns b ml0">Next Release</dd>
    <dd className="f3 f2-ns b ml0">10-22</dd>
  </dl>
  <dl className="dib mr5">
    <dd className="f6 f5-ns b ml0">Days Left</dd>
    <dd className="f3 f2-ns b ml0">4</dd>
  </dl>
  <dl className="dib mr5">
    <dd className="f6 f5-ns b ml0">Favorite Cat</dd>
    <dd className="f3 f2-ns b ml0">All of Them</dd>
  </dl>
  <dl className="dib">
    <dd className="f6 f5-ns b ml0">App Downloads</dd>
    <dd className="f3 f2-ns b ml0">1,200</dd>
  </dl>
</article>
<article className="pa1 pa5-ns" data-name="slab-stat-small">
  <h3 className="f6 ttu tracked">{date}</h3>
  <div className="cf">
    
     <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
      <dd className="f6 fw4 ml0">{date}</dd>
      <dd className="f3 fw6 ml0"></dd>
    </dl>
    <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
      <dd className="f6 fw4 ml0">Weight</dd>
      <dd className="f3 fw6 ml0">93</dd>
    </dl>
    <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
      <dd className="f6 fw4 ml0">Muscle Mass</dd>
      <dd className="f3 fw6 ml0">16</dd>
    </dl>
    <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
      <dd className="f6 fw4 ml0">Fat Level</dd>
      <dd className="f3 fw6 ml0">14</dd>
    </dl>
    <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
      <dd className="f6 fw4 ml0">BMI</dd>
      <dd className="f3 fw6 ml0">30.1</dd>
    </dl>
    <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
      <dd className="f6 fw4 ml0">Fat Level Organs</dd>
      <dd className="f3 fw6 ml0">13</dd>
    </dl>
    <dl className="fl fn-l w-50 dib-l w-auto-l lh-title">
      <dd className="f6 fw4 ml0">App Downloads</dd>
      <dd className="f3 fw6 ml0">1,200</dd>
    </dl>
  </div>
</article>

		</div>
		);
}

export default PackageInfo;