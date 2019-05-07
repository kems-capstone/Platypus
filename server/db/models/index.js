//Central Export for models

const User = require('./user');
const Room = require('./room');
const Music = require('./music');
const User_Rooms = require('./user_rooms');
const Room_Music = require('./room_music');

Room.belongsToMany(User, {through: User_Rooms});
User.belongsToMany(Room, {through: User_Rooms});

Music.belongsToMany(Room, {through: Room_Music});
Room.belongsToMany(Music, {through: Room_Music});

module.exports = {
  User,
  Room,
  Music,
  User_Rooms,
  Room_Music
};
