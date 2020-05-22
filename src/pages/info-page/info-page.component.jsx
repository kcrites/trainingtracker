import React from 'react';
import InfoCard from '../../components/info-card/info-card.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './info-page.styles.scss';

const InfoPage = (props) => (
    <div className='infopage-items'>
        <InfoCard title='Trainer Information' />
        <CustomButton inverted onClick={() => props.onRouteChange('home')}>Back</CustomButton>
    </div>
);

export default InfoPage;