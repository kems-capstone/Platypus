const Sequelize = require('sequelize')
const db = require('../db')

const Playlist = db.define('playlist', {
  playOrder: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Playlist
