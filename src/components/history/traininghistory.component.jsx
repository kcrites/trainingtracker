import React from 'react';
import { trainingColumnArray, trainingByPackageColumnArray} from './history.utils';
import { RenderColumn, RenderRowTraining, RenderRowTrainingByPackage } from '../render-row/render-row.component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const TrainingHistory = (props) => {
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
                  <RenderRowTraining array={props.trainingList} action={props.handleTrainingDelete} />
                :
                  <RenderRowTrainingByPackage array={props.trainingListByPack} action={props.handleTrainingDelete} />
                } 
    </tbody>
    </table>
</div>)};

 const mapStateToProps = state => ({
    trainingList: state.training.trainingList,
    trainingListByPack: state.training.trainingListByPack
}); 

export default withRouter(connect(mapStateToProps)(TrainingHistory));