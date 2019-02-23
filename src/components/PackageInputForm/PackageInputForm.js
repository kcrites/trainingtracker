import React from 'react';


const  PackageInputForm = ({onPackageInputChange, onPackageButtonSubmit}) => {
	return (
		<div>
			<p className='f3'>
				{'Please input the new training package'}
			</p>
			<div className='center'>
				<div className='pa4 br2 shadow-5 center'>
				<table>
				<tr>
				<td><label>Date</label></td>
				 <td><input className='f4 pa2 w-80 center' name='date' type='date'onChange={onPackageInputChange}/></td>
				 </tr>
				 <tr><td>   <label>User Email</label></td>
				<td><input className='f4 pa2 w-50 center' name='email' type='text'  onChange={onPackageInputChange} /></td>
				</tr>
				<tr><td>   <label>Package ID</label></td>
				<td><input className='f4 pa2 w-50 center' name='packageID' type='text'  onChange={onPackageInputChange} /></td></tr>
				<tr><td>   <label>Paid</label></td>
				<td><input className='f4 pa2 w-50 center' name='paid' type='checkbox' value='true'  onChange={onPackageInputChange} /></td></tr>
				<tr>
				<td><button className='w-100 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={onPackageButtonSubmit}>Submit</button></td>
					</tr>
				</table>
				</div>
			</div>
		</div>
		);
}

export default PackageInputForm;
