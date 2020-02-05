import React from 'react';

const formatExercises = (array) => {
    let tempArray = [];
    for(let i = 0; i < array.length; i++){
        //insert ', ' for viewing
        tempArray.push(array[i]);
        if(i < array.length-1) {
            tempArray.push(', ');
        }
    }
    return tempArray;
}

const renderGroups = (array) =>{
  return array.map((item, index)  => 
            
                <tr key={index} className="stripe-dark center w-250">
                    <td className="pa4 b">{item[0]} </td>
                    <td width='350px' className="pa4">{formatExercises(item[1])}</td> 
                </tr>
    );
}

const fixDate = (datetofix) => {
    
    let d = new Date(datetofix);
    return d.toLocaleDateString(('en-GB'));
}

let fixedDate;

class ShowWorkout extends React.Component {
    
      constructor(props){
        super(props);
        this.state = {
          history: [],
          
        };
      }
    
    componentWillMount(){
      fixedDate = fixDate(this.props.dateSelected);
     // console.log("array: " + this.props.workout[0][1]);
    }
    
    render() {
      const { workout, fName } = this.props;
      
      if(workout.length === 0) {
        return("Your Workout Plan is empty");
      } else{
    
        return (
    
          <div className="pa4"><p>Workout Plan for {fName}</p>
            <div className="overflow-auto center">      
              <table className="f6 w-100 mw8 " cellSpacing="0">
                <thead>
                <tr><td className="b h2">{fixedDate}</td></tr>
                  <tr className="stripe-dark">
                  </tr>
                </thead>
                <tbody className="lh-copy">
                  {renderGroups(workout)}  
                </tbody>
              </table>
            </div>
          </div>
          );
        }
    }
    }




export default ShowWorkout;