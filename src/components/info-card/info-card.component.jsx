import React from 'react';
import trainerImg from '../../components/Logo/desire.jpg';
import TrainerDetails from '../TrainerInfo/trainer-details.component';
import './info-card.styles.scss';

const trainerObject = {
	name: 'Desire Melchiot',
	phone: '06 4676 7399',
	email: 'desire@gmail.com',
	web: 'http://dmpersonaltraining.com/'
};

const InfoCard = ({title, content, ...otherProps}) => {

    return(
        <article className=" article mw5 mw6-ns br3 hidden ba b--black-10 mv1">
				<h1 className="title f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">{title}</h1>
				<div className="pa3 bt b--black-10">	
					<div className='pa1 br2 shadow-5 form center'>
					<div>
                        <img alt='Trainer Profile' src={trainerImg}></img>
                    </div>
						<TrainerDetails trainerObject={trainerObject} />	
						
                    </div>
				</div>
			</article>
    )
};

export default InfoCard;