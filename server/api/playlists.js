const router = require('express').Router();
const Music = require('../db/models/music');
const Playlist = require('../db/models/playlist');

router.get('/:id', async (req, res, next) => {
  const playlist = await Playlist.findOne({
    where: {
      roomId: req.params.id
    }
  });
  let music = await playlist.getMusic();
  console.log(playlist);

  res.send(music);
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
