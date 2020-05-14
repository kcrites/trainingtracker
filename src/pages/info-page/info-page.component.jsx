import React from 'react';
import InfoCard from '../../components/info-card/info-card.component';
import CustomButton from '../../components/custom-button/custom-button.component';

const InfoPage = () => (
    <div>
        <InfoCard title='Trainer Information' />
        <CustomButton>Back</CustomButton>
    </div>
);

export default InfoPage;