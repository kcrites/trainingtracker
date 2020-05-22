import React from 'react';
import { fixDate } from '../measurements/measurements.utils';
import './sidebar.styles.scss';
import { connect } from 'react-redux';


const Sidebar = (props) => {
      //  if() return <div className='error-text-sidebar'>No Measurements Info</div>
     
if(!props.stats[0]){
        return(<article className=" mw5 mw6-ns br3 hidden ba b--black-10 mv1">
        <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Measurements</h1>
        <div className="error-text-sidebar">No Measurements</div></article>);
} 
        const { statsdate, weight, musclemass, fatlevel, bmi, vv, percentwater} = props.stats[0];
        let fixed = fixDate(statsdate);
    return(
        <article className=" mw5 mw6-ns br3 hidden ba b--black-10 mv1">
        <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Measurements</h1>
        <div className="pa3 bt b--black-10">
                   
                    <table className='sidebar_table' > 
                        <tbody >
                        <tr className='sidetable'>
                            <td className='tabletext sb_title'>Date</td>
                            <td className='tabletext'>{fixed}</td>
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
                   </article>
    )
}

const mapStateToProps = state => ({
       
        stats: state.measurements.stats,
     
    });

export default connect(mapStateToProps)(Sidebar);