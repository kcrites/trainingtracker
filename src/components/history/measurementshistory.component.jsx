import React from 'react';
import { measurementColumnArray} from './history.utils';
import { RenderColumn, RenderRowMeasurements } from '../render-row/render-row.component';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const MeasurementsHistory = (props) => {

return(
<div>
<table className="history-table" cellSpacing="0">
    <thead>
        <tr className="stripe-dark">
            <RenderColumn array={measurementColumnArray} />
        </tr>
    </thead>
    <tbody className="lh-copy">
         <RenderRowMeasurements array={props.stats} indicator={props.indicators} />
    </tbody>
    </table>
</div>)};

 const mapStateToProps = state => ({
    stats: state.measurements.stats
}); 

export default withRouter(connect(mapStateToProps)(MeasurementsHistory));