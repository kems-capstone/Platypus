import React, {Component} from 'react';

class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homepage">
        <h1>Welcome to Platypus!</h1>
        <p>
          Platypus is a crowd-sourcing playlist app, that lets everyone be the
          DJ.
        </p>
        <p>
          Create your own room or enter the secret room code to join one that is
          already playing.
        </p>
      </div>
    );
  }
}

export default Homepage;
