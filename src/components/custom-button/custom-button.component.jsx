import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({children, isGoogleSignIn, isPrivacy, inverted, ...otherProps}) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} ${isPrivacy ? 'privacy-button' : ''} ${inverted ? 'inverted' : ''} custom-button`} {...otherProps}>
        {children}
    </button>
)

export default CustomButton;