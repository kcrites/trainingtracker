import React from 'react';
import './PackageInfo.css';


const name = 'Ken';
const date = '07/07/1970';
const sessionsUsed = 7;
const sessionsTotal = 11;

const  PackageInfo = () => {
	return (
		<div>
			<div className='center f3'>
				<table style={{width: '500px'}} className='tableInfo'>
					<thead>
						<tr>
							<th className='tableInfo tableHeader'>{name}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className='tableInfo'>{'Current package started on ' + date}</td>
						</tr>
						<tr>
							<td className='tableInfo'>{`You have used ${sessionsUsed} of ${sessionsTotal} sessions so far.`}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		);
}

export default PackageInfo;