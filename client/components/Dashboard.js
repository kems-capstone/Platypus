import React from 'react';
import user from '../store/user';

export const Dashboard = props => {
  return (
    <div>
      <h1>Welcome back user</h1>
      <div>
        <button>Create a room</button>
        <button>Join a room</button>
      </div>
    </div>
  );
};
