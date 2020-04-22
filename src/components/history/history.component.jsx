
import React from 'react';
import { RenderRowTraining, RenderRowMeasurements, RenderColumn } from '../render-row/render-row.component';


const measurementColumnArray = [
    
        'Number', 'Date', 'Weight', 'Muscle Mass', 'Fat Level', 'BMI', 'Fat Level Organs', '%Body Water'
    ];

  const trainingColumnArray = 
    [
        'Number', 'Date', 'Package Date'
    ];


class History extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      history: [],
      viewSelectorInput: -1
    };
  }

componentWillMount(){
  this.setState({history: this.props.array});
}

handleSelectorChange = (event) => {
  const { array } = this.props;
  let valueInt = parseInt(event.target.value);
  this.setState({viewSelectorInput: event.target.value});
  if(event.target.value === '-1' || (valueInt > array.length-1)){
    this.setState({history: array});
    return 
  } else {
    let i = 0, tempArray = [];
    while(i <= valueInt-1){
      tempArray.push(array[i]);
      i++;
    }
    this.setState({history: tempArray});
  } 
}
//Add package number (example 2 of 11) on each row by running through in a function and adding to state

  render(){
    const {array, name, type} = this.props;
    const { history } = this.state;
   
    if(array.length === 0) {
      return("Your history is empty");
    } else{
        return (
          <div className="pa4">
          <p className="f3 fw7">{`${type} History for ${name}`}</p>
            <div className="overflow-auto center">
              <table className="f6 w-75 mw8 " cellSpacing="0">
                <thead>
                  <tr className="stripe-dark">
                    {(type === 'Measurements')
                    ? <RenderColumn array={measurementColumnArray} />
                    : <RenderColumn array={trainingColumnArray} />
                    }
                  
                  </tr>
                </thead>
                <tbody className="lh-copy">
                {(type === 'Measurements') ? 
                  <RenderRowMeasurements array={history} indicator={this.props.indicator} />
                :
                  <RenderRowTraining array={history} />
                } 
                </tbody>
              </table>
            </div>
            <br></br>
            Show: <select onChange={this.handleSelectorChange}>
                      <option value="-1">All</option>
                      <option value="5">5</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                  </select>
          </div>
          );
    }
  }
}

export default History;