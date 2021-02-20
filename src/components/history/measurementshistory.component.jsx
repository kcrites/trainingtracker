import React from 'react';
import { measurementColumnArray} from './history.utils';
import { RenderColumn, RenderRowMeasurements } from '../render-row/render-row.component';


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
         <RenderRowMeasurements array={props.array} indicator={props.indicators} />
    </tbody>
    </table>
</div>)};


export default MeasurementsHistory;