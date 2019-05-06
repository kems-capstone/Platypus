const router = require('express').Router();
const Music = require('../db/models/music');
const Playlist = require('../db/models/playlist');
const Room = require('../db/models/room');

router.get('/:id', async (req, res, next) => {
  const playlist = await Room.findAll({
    where: {
      playlistId: req.params.id
    },
    include: [{model: Playlist, include: {model: Music}}]
  });
  // let music = await playlist.getMusic();
  console.log(playlist);

  res.send(playlist);
});

router.post('/:id', async (req, res, next) => {
  try {
    const newSong = await Music.findOne({where: {id: req.body.id}});
    const newPL = await Playlist.create({
      musicId: newSong.id,
      playOrder: req.counter,
      userId: req.session.user.id,
      roomId: req.params.id
    });
    res.send(newPL);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
