const Sequelize = require('sequelize');
const db = require('../db');

const Room = db.define('room', {
  partyId: {
    type: Sequelize.INTEGER
  },
  guests: {
    type: Sequelize.INTEGER
  },
  host: {
    type: Sequelize.INTEGER
  },
  roomKey: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: 4
    }
  },
  closed: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Room;
