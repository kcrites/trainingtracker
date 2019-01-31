import React from 'react';
import './PackageInfo.css';


const name = 'Ken';
const date = '07/07/1970';
const sessionsUsed = 7;
const sessionsTotal = 11;

const  PackageInfo = () => {
	return (
		<div>
<article class="pa3 pa5-ns" data-name="slab-stat">
  <h1>{name}</h1>
  <dl class="dib mr5">
    <dd class="f6 f5-ns b ml0">Closed Issues</dd>
    <dd class="f3 f2-ns b ml0">1,024</dd>
  </dl>
  <dl class="dib mr5">
    <dd class="f6 f5-ns b ml0">Open Issues</dd>
    <dd class="f3 f2-ns b ml0">993</dd>
  </dl>
  <dl class="dib mr5">
    <dd class="f6 f5-ns b ml0">Next Release</dd>
    <dd class="f3 f2-ns b ml0">10-22</dd>
  </dl>
  <dl class="dib mr5">
    <dd class="f6 f5-ns b ml0">Days Left</dd>
    <dd class="f3 f2-ns b ml0">4</dd>
  </dl>
  <dl class="dib mr5">
    <dd class="f6 f5-ns b ml0">Favorite Cat</dd>
    <dd class="f3 f2-ns b ml0">All of Them</dd>
  </dl>
  <dl class="dib">
    <dd class="f6 f5-ns b ml0">App Downloads</dd>
    <dd class="f3 f2-ns b ml0">1,200</dd>
  </dl>
</article>
<article class="pa3 pa5-ns" data-name="slab-stat-small">
  <h3 class="f6 ttu tracked">{date}</h3>
  <div class="cf">
    <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
      <dd class="f6 fw4 ml0">Sessions Used</dd>
      <dd class="f3 fw6 ml0">{sessionsUsed}</dd>
    </dl>
    <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
      <dd class="f6 fw4 ml0">Sessions Left</dd>
      <dd class="f3 fw6 ml0">{sessionsTotal-sessionsUsed}</dd>
    </dl>
    <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
      <dd class="f6 fw4 ml0">Next Release</dd>
      <dd class="f3 fw6 ml0">10-22</dd>
    </dl>
    <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
      <dd class="f6 fw4 ml0">Days Left</dd>
      <dd class="f3 fw6 ml0">4</dd>
    </dl>
    <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
      <dd class="f6 fw4 ml0">Favorite Cat</dd>
      <dd class="f3 fw6 ml0">All of Them</dd>
    </dl>
    <dl class="fl fn-l w-50 dib-l w-auto-l lh-title">
      <dd class="f6 fw4 ml0">App Downloads</dd>
      <dd class="f3 fw6 ml0">1,200</dd>
    </dl>
  </div>
</article>

		</div>
		);
}

export default PackageInfo;