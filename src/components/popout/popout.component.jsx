import React from 'react';
import CustomerButton from '../custom-button/custom-button.component';
import FAQ from '../help/faq.component';
import Terms from '../help/terms.component';
import Tech from '../help/tech.component';
import Privacy from '../help/privacy.component';
import { withRouter } from 'react-router-dom';
import './popout.styles.scss';

const Popout =(props) => {

  let caller = '';
  let destination = '';

  switch(props.text){
    case 'faq':
      caller = <FAQ />;
      destination = '/help'
      break;
    case 'tech':
      caller = <Tech />;
      destination = '/help'
      break;
    case 'terms':
      caller = <Terms />;
      destination = '/help'
      break;
    case 'privacy':
      caller = <Privacy />
      destination = '/home'
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
          ? <button className='button-center' onClick={props.closePopup}>Close</button>
          :  <CustomerButton className='button-center'onClick={() => props.history.push(destination)} >Home</CustomerButton>
          }
          </div>
        </div>
      );
    }
  

export default withRouter(Popout);

