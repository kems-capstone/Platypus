import React from 'react';
import user from '../store/user';

const Dashboard = props => {
  return (
    <div>
      <h1>Welcome back user</h1>
      <div>
        <button type='button'>Create a room</button>
        <button type='button'>Join a room</button>
      </div>
    </div>
  );
};

export default Dashboard
