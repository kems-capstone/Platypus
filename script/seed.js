'use strict';

const db = require('../server/db');
const {User, Playlist, Room, Music, Playlist_music} = require('../server/db/models');
const songs = require('../songs');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const rooms = await Promise.all([
    //Previous room now closed
    Room.create({
      partyId: 1,
      host: 4,
      roomKey: 'AAAA',
      guests: 1,
      closed: true,
      userId: 1
    }),
    Room.create({
      partyId: 1,
      host: 4,
      roomKey: 'AAAA',
      guests: 4,
      closed: true
    }),
    //Open room 1
    Room.create({
      partyId: 2,
      host: 1,
      roomKey: 'BBBB',
      guests: 1,
      closed: false
    }),
    Room.create({
      partyId: 2,
      host: 1,
      roomKey: 'BBBB',
      guests: 2,
      closed: false
    }),
    //Open Room 2
    Room.create({
      partyId: 3,
      host: 3,
      roomKey: 'CCCC',
      guests: 3,
      closed: false
    }),
    Room.create({
      partyId: 3,
      host: 3,
      roomKey: 'CCCC',
      guests: 4,
      closed: false
    })
  ]);
  console.log(`seeded ${rooms.length} rooms`);
  console.log(`seeded successfully`);

  const users = await Promise.all([
    User.create({
      email: 'platy@email.com',
      password: '123',
      firstName: 'Patty',
      lastName: 'Platypusowitz',
      roomId: 1
    }),
    User.create({
      email: 'Okapi@canopyForest.com',
      password: '123',
      firstName: 'Cappy',
      lastName: 'OKapi'
    }),
    User.create({
      email: 'Bear@forest.com',
      password: '123',
      firstName: 'Bear',
      lastName: 'Bearsmith'
    }),
    User.create({
      email: 'Elephant@savanah.com',
      password: '123',
      firstName: 'Elle',
      lastName: 'Elephante'
    }),
    User.create({
      email: 'Panda@schina.com',
      password: '123',
      firstName: 'Paul',
      lastName: 'Panderson'
    })
  ]);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  let builtPlaylist = await Promise.all([
    Playlist.build({
      roomId: 1,
      playOrder: 1,
      userId: 1
    }),
    Playlist.build({roomId: 1, playOrder: 2, userId: 1}),
    Playlist.build({roomId: 1, playOrder: 3, userId: 1}),
    Playlist.build({roomId: 1, playOrder: 4, userId: 4}),
    Playlist.build({roomId: 2,  playOrder: 1, userId: 1}),
    Playlist.build({roomId: 2,  playOrder: 2, userId: 1}),
    Playlist.build({roomId: 2,  playOrder: 3, userId: 2}),
    Playlist.build({roomId: 3,  playOrder: 1, userId: 3}),
    Playlist.build({roomId: 3,  playOrder: 2, userId: 4}),
    Playlist.build({roomId: 2,  playOrder: 4, userId: 2}),
    Playlist.build({roomId: 2,  playOrder: 5, userId: 2}),
    Playlist.build({roomId: 3,  playOrder: 3, userId: 3})
  ]);
  for (let i = 0; i < builtPlaylist.length; i++) {
    await builtPlaylist[i].save();
  }

  let builtMusic;
  for (let i = 0; i < songs.length; i++) {
    let song = songs[i];

    try {
      builtMusic = await Music.build({
        name: song.name,
        audioUrl: song.audioUrl,
        artist: song.artist,
        album: song.album,
        genre: song.genre,
        artworkUrl: song.artworkUrl
      });
    } catch (error) {
      console.error(error.message);
    }


    // await builtMusic[1].setPlaylist(builtPlaylist[1])


    // await builtMusic.save();
    // for (let j = 0; j < builtMusic.length; j++) {
    //   await builtPlaylist[j].setMusic(builtMusic[j]);
    //   await builtMusic[j].setPlaylists(builtPlaylist[j]);
  }
  }
  // for (let i = 0; i < builtMusic.length; i++) {
    //   await builtPlaylist[i].addMusic(builtMusic);
    // }

  // let counter = 0
  // builtPlaylist.forEach(index => {
  //   counter++
  //   index.addMusic(builtMusic[counter])
  // }



async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
