import React from 'react';
import CustomerButton from '../custom-button/custom-button.component';
import FAQ from '../Help/faq.component';
import Terms from '../Help/terms.component';
import Tech from '../Help/tech.component';
import './Popout.css';

const Popout =(props) => {
   
      return (
        <div className='popup'>
          <div className='popup_inner'>
            {props.text === 'faq' ? 
            <FAQ />
            :
            (props.text === 'tech') ?
              <Tech />
              : <Terms />
          }
          <CustomerButton className='button-center'onClick={() => props.onRouteChange('home')} >Home</CustomerButton>
          </div>
        </div>
      );
    }
  

export default Popout;

