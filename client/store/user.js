import axios from 'axios';

const initialState = {};

const LOG_IN = 'LOG_IN';

const logIn = user => {
  return {
    type: LOG_IN,
    user
  };
};

// export const logInThunk = formData => async dispatch => {
//   console.log(formData);
//   try {
//     const user = await axios.put('/auth/login', formData);
//     dispatch(logIn(user));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const logInThunk = formData => {
  return async function(dispatch) {
    const user = await axios.put('/auth/login', formData);
    dispatch(logIn(user.data));
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return action.user;
    default:
      return state;
  }
}
