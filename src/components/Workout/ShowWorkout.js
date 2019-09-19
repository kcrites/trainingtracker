import React from 'react';

const renderGroups = (array) =>{
   // fixDate(array);
    let i = array.length-1;
  return array.map((item, index)  => 
            <div>
                <tr key={index} className="stripe-dark center">
                    <td className="pa4 b">Group {item[0]} </td>
                    <td className="pa4">{item[1]}</td>  
                </tr>
            </div>
    );
}



class ShowWorkout extends React.Component {
    
      constructor(props){
        super(props);
        this.state = {
          history: []
        };
      }
    
    componentWillMount(){
      //const distinctGroups = this.props.distinctGroups;
    }
    
    render() {
      const {workout} = this.props;
      if(workout.length === 0) {
        return("Your Workout Plan is empty");
      } else{
    
        return (
    
          <div className="pa4"><p>Workout Plan for name</p>
            <div className="overflow-auto center">      
              <table className="f6 w-100 mw8 " cellSpacing="0">
                <thead>
                <tr><td className="b h2">Date of Plan</td></tr>
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