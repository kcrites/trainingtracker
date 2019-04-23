import React from 'react';
import './Sidebar.css';

const Sidebar = (props) => {
	const { date, weight, musclemass, fatlevel, bmi, vv, percentwater} = props.stats;
    return(
                    <div className="box sidebar"><p className="sidetitle">Stats</p>
                    <table style={{width:'100%'}}> 
                        <tbody >
                        <tr className='sidetable'>
                            <td className='tabletext'>Date</td>
                            <td className='tabletext'>{date}</td>
                        </tr>
                        <tr className='sidetable'>
                            <td className='tabletext'>Weight</td>
                            <td className='tabletext'>{weight}</td>
                        </tr>
                        <tr className='sidetable'>
                                <td className='tabletext'>Muscle Mass</td>
                                <td className='tabletext'>{musclemass}</td>
                        </tr>
                        <tr className='sidetable'>
                                <td className='tabletext'>Fat Level</td>
                                <td className='tabletext' >{fatlevel}</td>
                        </tr>
                        <tr className='sidetable'>
                                <td className='tabletext'>BMI</td>
                                <td className='tabletext'>{bmi}</td>
                        </tr>
                        <tr className='sidetable'>
                                <td className='tabletext'>VV</td>
                                <td className='tabletext'>{vv}</td>
                        </tr>
                        <tr className='sidetable'>
                                <td className='tabletext'>Water %</td>
                                <td className='tabletext'>{percentwater}</td>
                        </tr>
                        </tbody>
                    </table>
                   </div>
    )
}
export default Sidebar;