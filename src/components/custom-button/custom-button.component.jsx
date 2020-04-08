import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({children, isGoogleSignIn, isPrivacy, ...otherProps}) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} ${isPrivacy ? 'privacy-button' : ''} custom-button`} {...otherProps}>
        {children}
    </button>
)

export default CustomButton;