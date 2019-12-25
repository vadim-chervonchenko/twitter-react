import React from 'react';

const Logo = () => {
    return (
        <a className="navbar-brand" href="..">
            <img src="/assets/tweet-icon.svg" width="30" height="30"
                 className="d-inline-block align-top mr-2"
                 alt=""/>
            Tweeter react app
        </a>
    );
};

export default Logo;
