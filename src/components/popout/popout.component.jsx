import React from 'react';
import CustomerButton from '../custom-button/custom-button.component';
import FAQ from '../Help/faq.component';
import Terms from '../Help/terms.component';
import Tech from '../Help/tech.component';
import Privacy from '../Help/privacy.component';
import './popout.styles.scss';

const Popout =(props) => {

  let caller = '';
  let destination = '';

  switch(props.text){
    case 'faq':
      caller = <FAQ />;
      destination = 'help'
      break;
    case 'tech':
      caller = <Tech />;
      destination = 'help'
      break;
    case 'terms':
      caller = <Terms />;
      destination = 'help'
      break;
    case 'privacy':
      caller = <Privacy />
      destination = 'home'
      break;
    default:
      caller = 'Error';
  }
      return (
        <div className='popup'>
          <div className='popup_inner'>
      {/*       {props.text === 'faq' ? 
            <FAQ />
            :
            (props.text === 'tech') ?
              <Tech />
              : <Terms />
          } */}
          {caller}
         
          {(props.text === 'privacy')
          ? <button onClick={props.closePopup}>Close</button>
          :  <CustomerButton className='button-center'onClick={() => props.onRouteChange(destination)} >Home</CustomerButton>
          }
          </div>
        </div>
      );
    }
  

export default Popout;

