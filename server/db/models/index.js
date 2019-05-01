//Central Export for models

const User = require('./user');
const Playlist = require('./playlist');
const Room = require('./room');

User.hasOne(Room);
Room.hasMany(Playlist);

Room.hasOne(Playlist);
Playlist.belongsTo(Room);

module.exports = {
  User,
  Room,
  Playlist
};
