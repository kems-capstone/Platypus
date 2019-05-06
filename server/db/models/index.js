//Central Export for models

const User = require('./user');
const Playlist = require('./playlist');
const Room = require('./room');
const Music = require('./music');

Room.hasMany(User);
User.belongsTo(Room);

Music.belongsToMany(Playlist, {through: 'playlist_music'});
Playlist.belongsToMany(Music, {through: 'playlist_music'});

Playlist.hasOne(Room);
Room.belongsTo(Playlist);

module.exports = {
  User,
  Room,
  Playlist,
  Music
};
