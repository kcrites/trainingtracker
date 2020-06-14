import React from 'react';
import InfoCard from '../../components/info-card/info-card.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { withRouter } from 'react-router-dom';
import './info-page.styles.scss';

const InfoPage = (props) => (
    <div className='infopage-items'>
        <InfoCard title='Trainer Information' />
        <CustomButton inverted onClick={() => props.history.push('/home')}>Back</CustomButton>
    </div>
);

export default withRouter(InfoPage);