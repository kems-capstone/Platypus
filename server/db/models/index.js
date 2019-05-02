//Central Export for models

const User = require('./user');
const Playlist = require('./playlist');
const Room = require('./room');
const Music = require('./music');

User.hasOne(Room);
Room.hasMany(Playlist);

Music.belongsToMany(Playlist);
Playlist.belongsToMany(Music)

Room.hasOne(Playlist);
Playlist.belongsTo(Room);

module.exports = {
  User,
  Room,
  Playlist,
  Music
};
