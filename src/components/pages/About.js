import React, {Fragment} from 'react';
import AppHeader from '../Header';

const About = () => {

    const user = localStorage.getItem('access_token');

    return (
        <Fragment>
            <AppHeader user={user}/>
            <div className="jumbotron">
                <h1 className="display-4">About us</h1>
                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra
                    attention to featured content or information.</p>
                <hr className="my-4"/>
                <p>It uses utility classes for typography and spacing to space content out within the larger
                    container.</p>
            </div>
        </Fragment>
    );
};

export default About;