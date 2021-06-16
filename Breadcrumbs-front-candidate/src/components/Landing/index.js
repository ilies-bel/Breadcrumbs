import React from 'react';

const Landing = () => (
  <div />
);

const condition = (authUser) => !!authUser;

export default Landing;

/*
export default Landing
compose(
    withEmailVerification,
    withAuthorization(condition),
)(Landing);
*/
