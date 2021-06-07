import React from 'react';
import { trainingColumnArray, trainingByPackageColumnArray} from './history.utils';
import { RenderColumn, RenderRowTraining, RenderRowTrainingByPackage } from '../render-row/render-row.component';


const TrainingHistory = (props) => {
    console.log(props)
return(
<div>
<table className="history-table" cellSpacing="0">
    <thead>
        <tr className="stripe-dark">
            {(props.type) ?
            <RenderColumn array={trainingColumnArray} />
            :
            <RenderColumn array={trainingByPackageColumnArray} />
            }
            
        </tr>
    </thead>
    <tbody className="lh-copy">
        {(props.type) ? 
                  <RenderRowTraining array={props.array} action={props.action} />
                :
                  <RenderRowTrainingByPackage array={props.array} action={props.action} />
                } 
    </tbody>
    </table>
</div>)};


export default TrainingHistory;